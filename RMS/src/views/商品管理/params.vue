<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--警告区域-->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
      <!--商品分类区域-->
      <el-row class="el_row">
        <el-col>
          <span>选择商品分类：</span>
          <!--选择器商品分类的级联选择框-->
          <el-cascader
            v-model="selectedCatekeys"
            expand-trigger="hover"
            :options="list"
            :props="catePros"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>

      <!--tab 页签区域-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--添加动态参数-->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" :disabled="is" @click="addis=true">添加参数</el-button>

          <el-table :data="manyTableData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag closable v-for="(item , i) in scope.row.attr_vals" :key="i">{{item}}</el-tag>

                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                ></el-input>


                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              
              </template>
            </el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="remove(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!--添加静态参数-->
        <el-tab-pane label="静态属性" name="only" :disabled="is">
          <el-button type="primary" size="mini" @click="addis=true">添加属性</el-button>
          <el-table :data="onlyTableData" border stripe>
            <el-table-column type="expand"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="remove(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--添加参数的对话框-->
    <el-dialog :title="is1" :visible.sync="addis" width="50%" @close="addDialogClosed">
      <!--添加参数对话框-->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="is1" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addis = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="ddis" width="50%" @close="ddDialogClosed">
      <!--添加参数对话框-->
      <el-form
        :model="ddForm"
        :rules="ddFormRules"
        ref="ddFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model="ddForm.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ddis = false">取 消</el-button>
        <el-button type="primary" @click="ddParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { s, s5, s6, s7, s8, s9 } from "../../api/api";
export default {
  data() {
    return {
      inputValue:'',
      //控制
      inputVisible:false,
      ddForm: {},
      //修改的表单数据对象
      ddFormRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
      },
      //控制修改对话框显示
      ddis: false,
      //添加表单的验证规则
      addFormRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
      },
      addForm: {},
      addis: false,
      //被激活页签名称
      activeName: "many",
      list: [],
      catePros: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      //级联双向绑定的数组
      selectedCatekeys: [],
      //动态
      manyTableData: [],
      //静态
      onlyTableData: [],
    };
  },
  created() {
    s().then((res) => {
      console.log(res.data);
      this.list = res.data;
    });
  },
  computed: {
    is1() {
      if (this.activeName === "many") {
        return "动态参数";
      } else {
        return "静态属性";
      }
    },
    is() {
      if (this.selectedCatekeys.length !== 3) {
        return true;
      }
      return false;
    },
    //当前选中的三级分类ID
    cateId() {
      if (this.selectedCatekeys.length == 3) {
        return this.selectedCatekeys[2];
      }
      return null;
    },
  },
  methods: {
    showInput(){
      this.inputVisible=true
    },
    //文本框失去焦点，按下都会触发
    handleInputConfirm(){
      this.inputVisible=false

    },
    open2() {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success",
      });
    },
    remove(id) {
      s9(`categories/${this.cateId}/attributes/${id}`).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.save();
          this.open2();
        }
      });
    },
    //点击编辑里面确定按钮
    ddParams() {
      s8(`categories/${this.cateId}/attributes/${this.ddForm.attr_id}`, {
        attr_name: this.ddForm.attr_name,
        attr_sel: this.activeName,
      }).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.save();
          this.ddis = false;
        }
      });
    },
    //重置修改表单
    ddDialogClosed() {
      this.$refs.ddFormRef.resetFields();
    },
    //点击编辑展开对话框
    showEditDialog(index) {
      s7(`categories/${this.cateId}/attributes/${index}`, {
        attr_sel: this.activeName,
      }).then((res) => {
        if (res.meta.status == 200) {
          this.save();
          this.ddForm = res.data;
        }
        console.log(res);
      });
      //  this.$refs.ddFormRef.resetFields();
      console.log(index);
      this.ddis = true;
    },
    //点击按钮
    addParams() {
      this.$refs.addFormRef.validate((value) => {
        if (!value) return;
        s6(`categories/${this.cateId}/attributes`, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName,
          // attr_vals: "",
        }).then((res) => {
          console.log(res);
          if (res.meta.status == 201) {
            this.save();
          }
        });
      });
      this.addis = false;
    },
    //添加对话矿的  关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    save() {
      s5(`categories/${this.cateId}/attributes`, {
        sel: this.activeName,
      }).then((res) => {
        console.log(res);
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
        });
        if (this.activeName === "many") {
          this.manyTableData = res.data;
        } else {
          this.onlyTableData = res.data;
        }
      });
    },
    //级联选中的数组
    handleChange() {
      this.save();
      console.log(this.selectedCatekeys);
    },
    //tab 页签激活点击按钮
    handleClick() {
      // this.activeName = "only";
      this.save();
    },
  },
};
</script>

<style>
.input-new-tag{
  width: 100px;
}
.el_row {
  margin-top: 30px;
}
.el-tag {
  margin: 10px;
}
.el-card {
  margin-top: 15px;
}
.el-breadcrumb {
    font-size: 12px;
} 
</style>