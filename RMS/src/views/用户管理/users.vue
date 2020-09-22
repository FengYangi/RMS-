<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="main-div" style="padding:10px">
      <div style="margin-top: 15px;width:600px" class="min-dis">
        <el-input placeholder="请输入内容" v-model="input2" @input="sou(input2)">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-row>
          <el-button type="primary" @click="tj">添加用户</el-button>
        </el-row>
      </div>

      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%;"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="username" label="姓命" width="250"></el-table-column>
        <el-table-column property="email" label="邮箱" width="250"></el-table-column>
        <el-table-column property="mobile" label="电话"></el-table-column>
        <el-table-column property="role_name" label="角色"></el-table-column>
        <el-table-column property="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column property label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" icon="el-icon-edit" circle @click="tj1(scope.row)"></el-button>
              <el-button type="warning" icon="el-icon-star-off" circle @click="yongh(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="rem(scope.row)"></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

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

    <el-dialog title="修改用户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item label="用户名">
            <el-input v-model="dynamicValidateForm.yonghu" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item
            prop="email"
            label="邮箱"
            :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
          >
            <el-input v-model="dynamicValidateForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="dynamicValidateForm.tel"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="que">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加用户" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
      <span>
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item label="用户名">
            <el-input v-model="dynamicValidateForm.yonghu"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="dynamicValidateForm.passworde"></el-input>
          </el-form-item>

          <el-form-item
            prop="email"
            label="邮箱"
            :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
          >
            <el-input v-model="dynamicValidateForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="dynamicValidateForm.tel"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1=false">取 消</el-button>
        <el-button type="primary" @click="que1">确 定</el-button>
      </span>
    </el-dialog>

    <div></div>
    <el-dialog title="分配角色" :visible.sync="feipei" width="50%">
      <div>
        <p>当前用户：{{user.username}}</p>
        <p>当前角色：{{user.role_name}}</p>
        <p>
          分配新角色
          <el-select v-model="selete" placeholder="请选择">
            <el-option
              v-for="item in roleslist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="feipei = false">取 消</el-button>
        <el-button type="primary" @click="saveinfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
import { lt, t, x, d, js, fpjs } from "../../api/api";

export default {
  data() {
    return {
      //被选中的角色值
      selete: "",
      //控制用户分配
      feipei: false,
      infore: {
        query: "",
        pagenum: 1,
        pagesize: 3,
      },
      total: 0,
      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
        ],
        email: "",
        yonghu: "",
        tel: "",
        passworde: "",
      },
      // value,
      dialogVisible: false,
      dialogVisible1: false,

      element: [
        "el-icon-user-solid",
        "el-icon-setting",
        "el-icon-shopping-bag-1",
        "el-icon-notebook-2",
        "el-icon-upload",
      ],

      isCollapse: true,
      input: "",
      tableData: [],
      tableData1: [],
      input2: "",
      currentPage1: 1,
      xg: {},
      ye: 1,
      tiao: 2,
      //需要被分配角色的用户信息
      user: {},
      //所有角色的数据
      roleslist: [],
    };
  },
  created() {
    this.save();
  },
  methods: {
    open2() {
      this.$message({
        message: "恭喜你成功了,元丹境更近了！",
        type: "success",
      });
    },
    saveinfo() {
      // if(!this.selete){
      //   return
      // }
      console.log(this.user.id, "ID");
      fpjs(`users/${this.user.id}/role`, { rid: this.selete }).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.open2();
          this.save();
        }
      });

      this.feipei = false;
    },
    //用户分配
    yongh(item) {
      this.user = item;
      js().then((res) => {
        this.roleslist = res.data;
      });

      this.feipei = true;
    },
    //删除列表用户
    rem(item) {
      d(item.id).then((res) => {
        if (res.meta.status == 200) {
          this.open2();
          this.save();
        }
      });
    },
    //封装列表用户api
    save() {
      lt(this.infore).then((res) => {
        console.log(res.data);
        this.tableData = res.data.users;
        this.total = res.data.total;
        // console.log(total)
      });
    },
    //编辑列表用户
    que() {
      x({
        id: this.xg.id,
        email: this.dynamicValidateForm.email,
        mobile: this.dynamicValidateForm.tel,
      }).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.open2();
          this.save();
        }
      });

      this.dialogVisible = false;
    },
    tj() {
      this.dialogVisible1 = true;
    },
    que1() {
      // alert("1")
      t({
        password: this.dynamicValidateForm.passworde,
        email: this.dynamicValidateForm.email,
        mobile: this.dynamicValidateForm.tel,
        username: this.dynamicValidateForm.yonghu,
      }).then((res) => {
        console.log(res);
        this.dialogVisible1 = false;
        if (res.meta.status == 201) {
          this.open2();
          this.save();
        }
      });
    },
    //设置模态框里面的数据
    tj1(value) {
      console.log(value, "数据");
      this.xg = value;
      this.dynamicValidateForm.yonghu = value.username;
      this.dynamicValidateForm.email = value.email;
      this.dynamicValidateForm.tel = value.mobile;
      this.dialogVisible = true;
    },
    //模糊搜索功能
    sou(value) {
      this.tableData = [];
      this.tableData1.map((res) => {
        if (
          res.username.includes(value) ||
          res.email.includes(value) ||
          res.mobile.includes(value) ||
          res.role_name.includes(value)
        ) {
          this.tableData.push(res);
        }
      });
    },
    //ui 里面弹出框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // btn(index) {
    //   console.log(index);
    // },
    handleSizeChange(val) {
      this.infore.pagesize = val;
      // this.tiao = val;
      this.save();
    },
    handleCurrentChange1(val) {
      this.infore.pagenum = val;

      // this.ye = val;
      this.save();
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.min-dis {
  display: flex;
  justify-content: left;
}
.main-div {
  width: 97%;
  //   height: 300px;
  background: white;
  // border: 1px solid gray;
  box-shadow: 0 0 5px 1px gray;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 20px;
}
.img {
  height: 100%;
  background: 100% 100%;
  font-size: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.tui {
  position: absolute;
  right: 50px;
  width: 100px;
  height: 50px;
  background: gray;
  margin-top: 25px;
  border-radius: 10%;
  border: 1px solid white;
  color: white;
  font-size: 20px;
}
.icon {
  margin-left: 0px;
}
.el-header,
.el-footer {
  background-color: #000000;
  line-height: 100px;
  display: flex;
  justify-content: left;
  font-size: 40px;
  color: white;
}
.el-aside {
  background-color: black;
  color: #333;
  text-align: center;
  // line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
