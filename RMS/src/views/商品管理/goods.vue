<template>
  <div>
    <!-- 面宝屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--渲染列表-->
    <el-card>
      <div class="main-div" style="padding:10px">
        <!-- 搜索  添加 -->
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="infore.query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="chaxun"></el-button>
          </el-input>
          <el-button type="primary" @click="tj">添加商品</el-button>
        </div>

        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%;">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="goods_name" label="商品名称" width="600px"></el-table-column>
          <el-table-column property="goods_price" label="商品价格"></el-table-column>
          <el-table-column property="goods_weight" label="商品重量"></el-table-column>
          <el-table-column property="upd_time" label="创建时间">
            <template slot-scope="scope">{{scope.row.upd_time | dateFormat}}</template>
          </el-table-column>
          <el-table-column property label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button type="primary" icon="el-icon-edit" circle @click="tj1(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="rem(scope.row)"></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <!--分页器-->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange1"
            :current-page="infore.pagenum"
            :page-sizes="[1, 2, 4, 10]"
            :page-size="infore.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <el-dialog
        title="修改信息"
        :visible.sync="dialogVisible1"
        width="50%"
        :before-close="handleClose"
      >
        <span>
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="300"
            class="demo-dynamic"
          >
            <el-form-item label="商品名称">
              <el-input v-model="dynamicValidateForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="dynamicValidateForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="数量">
              <el-input v-model="dynamicValidateForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="重量">
              <el-input v-model="dynamicValidateForm.goods_weight"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1=false">取 消</el-button>
          <el-button type="primary" @click="que1">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { s1, id, s_r, s2 } from "../../api/api";
export default {
  data() {
    return {
      //默认弹窗里面有值
      dynamicValidateForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
      },
      //编辑弹窗的开关
      dialogVisible1: false,
      //s1 获取的商品列表数据 放到了这个数组里
      tableData: [],
      tableData1: [],
      //input  搜索框的v-model
      input2: "",
      //数据列表总条数
      total: 0,
      //分页器动态传参
      infore: {
        query: "",
        pagenum: 1,
        pagesize: 3,
      },
    };
  },
  created() {
    //商品列表展示
    this.save();
  },
  methods: {
    //点击弹窗里面 确定  按钮
    que1() {
      s2(this.dynamicValidateForm.goods_id, {
        goods_name: this.dynamicValidateForm.goods_name,
        goods_price: this.dynamicValidateForm.goods_price,
        goods_number: this.dynamicValidateForm.goods_number,
        goods_weight: this.dynamicValidateForm.goods_weight,
        goods_introduce: "",
        pics: "",
        attrs: "",
      }).then((res) => {
        console.log(res);
      });

      this.dialogVisible1 = false;
    },
    //是否点击X关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //成功弹框
    open22() {
      this.$message({
        message: "叮咚！删除成功。",
        type: "success",
      });
    },
    //成功弹框
    open2() {
      this.$message({
        message: "哎呀呀！好厉害呦，居然被你找到了，下回我要藏深点。",
        type: "success",
      });
    },
    //警告弹框
    open3() {
      this.$message({
        message: "未检测到ID，请重新输入！",
        type: "warning",
      });
    },
    //封装初始化数据，供以后使用
    save() {
      s1(this.infore).then((res) => {
        console.log(res.data);
        this.tableData = res.data.goods;
        this.tableData1 = res.data.goods;

        this.total = res.data.total;
      });
    },
    //分页器上面的点击事件
    handleSizeChange(val) {
      this.infore.pagesize = val;
      this.save();
    },

    //分页器上面的点击事件
    handleCurrentChange1(val) {
      this.infore.pagenum = val;
      this.save();
    },

    // 查询
    chaxun() {
      this.save();
    },

    //添加商品
    tj() {
      this.$router.push({
        path: "/goods/add",
      });
    },
    //每一行后面的编辑小图标，点击执行修改
    tj1(index) {
      this.dynamicValidateForm = index;
      console.log(index, "值值");

      this.dialogVisible1 = true;
    },
    //每一行后面的编辑小图标，点击执行删除
    rem(index) {
      s_r(index.goods_id).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.open22();
          this.save();
        }
      });
    },
  },
};
</script>

<style scopde lang='scss'>
.min-dis {
  display: flex;
  justify-content: left;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input-group {
  line-height: normal;
  display: inline-table;
  width: 55%;
  padding: 0 10px;
  border-collapse: separate;
  border-spacing: 0;
}
.el-card {
  margin-top: 15px;
}
.el-breadcrumb {
    font-size: 12px;
} 
</style>