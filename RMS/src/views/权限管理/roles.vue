<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="box">
        <el-card>
          <el-row>
            <el-col>
              <el-button type="primary" @click="tjjue">添加角色</el-button>
            </el-col>
          </el-row>

          <el-table :data="list" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-row
                  :class="['bdbottom',i1===0?'bdtop':'']"
                  v-for="(item1,i1) in scope.row.children"
                  :key="item1.id"
                >
                  <!--渲染一级 -->
                  <el-col :span="5">
                    <el-tag closable @close="remove(scope.row,item1.id)">{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--渲染二级 -->
                  <!--渲染三级 -->
                  <el-col :span="19">
                    <el-row
                      :class="[i2===0?'':'bdtop']"
                      v-for="(item2,i2) in item1.children"
                      :key="item2.id"
                    >
                      <el-col :span="6">
                        <el-tag
                          type="success"
                          closable
                          @close="remove(scope.row,item2.id)"
                        >{{item2.authName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="18">
                        <el-tag
                          type="warning"
                          v-for="(item3) in item2.children"
                          :key="item3.id"
                          closable
                          @close="remove(scope.row,item3.id)"
                        >{{item3.authName}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <!-- <pre>{{scope.row}}</pre> -->
              </template>
            </el-table-column>

            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" width="400">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="bianji(scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="re_but(scope.row)"
                >删除</el-button>
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="fpqx(scope.row)"
                >分配权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <span>
        <!--树形-->
        <el-tree
          :data="list1"
          show-checkbox
          :props="treen"
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="ks"
          ref="treeref"
        ></el-tree>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="分配角色" :visible.sync="feipei" width="50%">
      <div>
        <p>
          角色名称:
          <input type="text" v-model="jue" />
        </p>
        <p>
          角色描述:
          <input type="text" v-model="jue1" />
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="feipei = false">取 消</el-button>
        <el-button type="primary" @click="saveinfo">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改角色" :visible.sync="feipei1" width="50%">
      <div>
        <p>
          角色名称:
          <input type="text" v-model="jue" />
        </p>
        <p>
          角色描述:
          <input type="text" v-model="jue1" />
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="feipei1 = false">取 消</el-button>
        <el-button type="primary" @click="saveinfo1">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-button :plain="true" @click="open2">成功</el-button> -->
  </div>
</template>

<script>
import { js, qxrm, sz, sq, tjjue, xg, re } from "../../api/api";
export default {
  data() {
    return {
      jue: "",
      jue1: "",

      feipei: false,
      feipei1: false,

      dialogVisible: false,
      list: [],
      list1: [],
      //默认选中id值
      ks: [],
      treen: {
        label: "authName",
        children: "children",
      },
      ID: {},
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
    re_but(index) {
      re(index.id).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.open2()
          this.save();
        }
      });
    },
    saveinfo1() {
      xg(this.ID.id, {
        roleName: this.jue,
        roleDesc: this.jue1,
      }).then((res) => {
        console.log(res);
        this.feipei1 = false;
        if (res.meta.status == 200) {
          this.open2()
          this.save();
        }
      });
    },
    bianji(ID) {
      this.ID = ID;
      this.jue1 = ID.roleDesc;
      this.jue = ID.roleName;
      // console.log(ID, "真好");
      this.feipei1 = true;
    },
    saveinfo() {
      tjjue({
        roleName: this.jue,
        roleDesc: this.jue1,
      }).then((res) => {
        console.log(res);
        if (res.meta.status == 201) {
          this.open2()
          this.save();
        }
      });

      this.feipei = false;
    },
    tjjue() {
      this.feipei = true;
    },

    queding() {
      const keys = [
        ...this.$refs.treeref.getCheckedKeys(),
        ...this.$refs.treeref.getHalfCheckedKeys(),
      ];
      console.log(keys);
      const idstr = keys.join(",");
      sq(`roles/${this.id}/rights`, { rids: idstr }).then((res) => {
        console.log(res.meta.status);
        this.dialogVisible = false;
        if (res.meta.status == 200) {
          this.open2()
          this.save();
        }
      });
    },
    sanji(node, arr) {
      //如歌当前node节点不包含children属性，就是三级属性
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.sanji(item, arr);
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    fpqx(role) {
      this.id = role.id;
      console.log(this.id, "首页");

      //获取权限数据
      sz().then((res) => {
        console.log(res, "树状权限");
        this.list1 = res.data;
      });
      this.ks = [];

      this.sanji(role, this.ks);
      this.dialogVisible = true;
    },
    save() {
      js().then((res) => {
        console.log(res, "美术就？？");
        this.list = res.data;
      });
    },
    remove(item, id2) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          qxrm(`roles/${item.id}/rights/${id2}`).then((res) => {
            console.log(res);
            if (res.meta.status == 200) {
              this.open2()
              // this.save();
              item.children = res.data;
            } else {
              alert("未删除成功");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scopde lang='scss'>
.box {
  margin-top: 20px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
</style>