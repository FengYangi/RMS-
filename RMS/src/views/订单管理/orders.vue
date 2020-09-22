<template>
  <div>
    <!-- 面宝屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <!-- 输入框 -->
      <div style="margin-top: 15px;width:600px" class="min-dis">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-row>
          <el-button type="primary">添加商品</el-button>
        </el-row>
      </div>
      <!-- 插入表格 -->
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column type="index" width="50" label="#"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="320"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="120"></el-table-column>
        <el-table-column prop="is_send" label="是否付款" width="120">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.is_send == '否'">未付款</el-tag>
            <el-tag type="success" v-if="scope.row.is_send == '是'">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.is_send == '否'">未发货</el-tag>
            <el-tag type="success" v-if="scope.row.is_send == '是'">已发货</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="xg"></el-button>
            <el-button
              type="success"
              icon="el-icon-location"
              size="mini"
              @click="kuaidixx(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 查看地址的对话框 -->
    <el-dialog title="物流信息" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
      <!-- 卡片内容 -->
      <div class="block">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(item, index) in chaxun_List"
            :key="index"
            :timestamp="item.context"
          >{{item.time}}</el-timeline-item>
        </el-timeline>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog title="修改信息" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
      <el-form
        :model="addruleForm"
        :rules="addrules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="省市区/县" prop="addres1">
          <el-cascader :options="cityData" v-model="addruleForm.addres1"></el-cascader>
        </el-form-item>
        <el-form-item label="详细信息" prop="addres2">
          <el-input v-model="addruleForm.addres2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">修 改</el-button>
      </span>
    </el-dialog>

    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange1"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import cityData from "./citydata";
import { dd, kuaidi_xx, t } from "../../api/api";
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 3,
      },
      tableData: [],
      currentRow: null,
      total: 0,
      dialogVisible1: false,
      dialogVisible2: false,
      chaxun_List: [],

      reverse: true,

      addruleForm: {
        addres1: [],
        addres2: "",
      },
      addrules: {
        addres1: [
          {
            required: true,
            message: "请选择地址",
            trigger: "blur",
          },
        ],
        addres2: [
          {
            required: true,
            message: "请输入详细信息",
            trigger: "blur",
          },
        ],
      },

      cityData,
    };
  },
  created() {
    console.log(this.cityData)
    // 获取订单数据
    this.getOrderList();
  },
  methods: {
    // this.$refs.singleTable.setCurrentRow(row);
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    //获取订单数据
    getOrderList() {
      dd(this.queryInfo).then((res) => {
        console.log(res);
        this.tableData = res.data.goods;
        this.total = res.data.total;
      });
    },

    //分页器上面的点击事件
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getOrderList();
    },

    //分页器上面的点击事件
    handleCurrentChange1(val) {
      this.queryInfo.pagenum = val;
      this.getOrderList();
    },

    // 查询快递信息
    kuaidixx(row) {
      this.dialogVisible1 = true;
      // console.log(row);
      kuaidi_xx().then((res) => {
        console.log(res);
        this.chaxun_List = res.data;
        // console.log(this.chaxun_List);
      });
    },

    // 修改
    xg() {
      this.dialogVisible2 = true;
    },

    // 关闭对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
.min-dis {
  display: flex;
  justify-content: left;
}
.el-card {
  margin-top: 15px;
}
.el-breadcrumb {
  font-size: 12px;
}
.el-input-group {
  line-height: normal;
  display: inline-table;
  width: 55%;
  padding: 0 10px;
  border-collapse: separate;
  border-spacing: 0;
}
</style>