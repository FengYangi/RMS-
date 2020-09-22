<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="box">
      <el-card>
        <el-table :data="list" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
          <el-table-column label="权限等级" prop="level">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level=='0'">一级权限</el-tag>
              <el-tag type="success" v-else-if="scope.row.level=='1'">二级权限</el-tag>
              <el-tag type="warning" v-else>三级权限</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

    </div>
  </div>
</template>

<script>
import { qx } from "../../api/api";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.SAVE();
  },

  methods: {
    // 获取权限列表
    SAVE() {
      qx().then((res) => {
        console.log(res);
        this.list = res.data;
        this.total = res.data.length
        console.log(this.list, "权限列表");
      });
    },
  },
};
</script>

<style scopde>
.box {
  margin-top: 20px;
}
.el-card {
  margin-top: 15px;
}
.el-breadcrumb {
  font-size: 12px;
}
</style>