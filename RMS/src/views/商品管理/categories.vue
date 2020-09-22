<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-button type="primary" @click="but">添加分类</el-button>
      </el-row>

      <tree-table
        :data="list"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!--是否有效-->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-circle-check"
            v-if="scope.row.cat_deleted===false"
            style="color:lightgreen"
          ></i>
          <i class="el-icon-circle-close" v-else style="color:red"></i>
        </template>
        <!--排序-->
        <template slot="order" slot-scope="scope">
          <el-tag type="mini" v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <!--操作-->
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-search" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-search" size="mini" @click="remove(scope.row)">删除</el-button>
        </template>
      </tree-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="info.pagenum"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="info.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <el-dialog title="添加分类" :visible.sync="feipei" width="50%" @close="addCate">
        <el-form
          :model="add1"
          :rules="add1Rules"
          ref="add1Ref"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="add1.cat_name"></el-input>
          </el-form-item>

          <el-form-item label="父级分类">
            <el-cascader
              v-model="selec"
              expand-trigger="hover"
              :options="list1"
              :props="cascaderChange"
              @change="handleChange"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="feipei = false">取 消</el-button>
          <el-button type="primary" @click="saveinfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { s, s3, s4 } from "../../api/api";
export default {
  data() {
    return {
      selec: [],
      cascaderChange: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      list1: [],
      // get:{},
      add1Rules: {
        cat_name: [
          { required: true, message: "请输入分类的名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      add1: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0,
      },
      feipei: false,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
      info: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      list: [],
      total: this.total,
      add: {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0,
      },
    };
  },
  created() {
    this.save();
  },
  methods: {
    remove(index) {
      s4(index.cat_id).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.open2();
          this.save();
        }
      });
    },
    open2() {
      this.$message({
        showClose: true,
        message: "哎呦，哎呦，成功了啊",
        type: "success",
      });
    },
    addCate() {
      this.$refs.add1Ref.resetFields();
      this.add1.cat_level = 0;
      this.add1.cat_pid = 0;
      this.selec = [];
    },
    //选择项发生变化触发
    handleChange() {
      if (this.selec.length > 0) {
        this.add1.cat_pid = this.selec[this.selec.length - 1];
        this.add1.cat_level = this.selec.length;
        return;
      } else {
        this.add1.cat_pid = 0;
        this.add1.cat_level = 0;
      }
    },
    saveinfo() {
      s3(this.add1).then((res) => {
        console.log(res);
        if (res.meta.status == 201) {
          this.open2();
          this.save();
        } else {
          alert("错了错了");
        }
      });

      console.log(this.selec);
      console.log(this.add1);

      this.feipei = false;
    },
    save() {
      s(this.info).then((res) => {
        console.log(res);
        this.list = res.data.result;
        this.total = res.data.total;
      });
    },
    but() {
      s({
        type: 2,
      }).then((res) => {
        console.log(res.data);
        this.list1 = res.data;
      });
      this.feipei = true;
    },
    handleSizeChange(val) {
      this.info.pagesize = val;
      this.save();
    },
    handleCurrentChange(val) {
      this.info.pagenum = val;
      this.save();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 15px;
}
.el-breadcrumb {
    font-size: 12px;
} 
</style>