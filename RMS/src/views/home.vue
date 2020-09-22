<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header height="100px">
        <img src="../assets/狼.png" class="img1" />
        <div class="div1">电商后台管理系统</div>
        <button class="tui" @click="tuichu">退出</button>
      </el-header>
      <!--  -->
      <el-container>
        <el-aside width>
          <el-radio-group v-model="isCollapse" style="width:100%;height:30px;background:#1c2442">
            <!-- <button v-if="isCollapse"> -->
            <img src="../assets/1 (1)_wps图片.png" alt @click="fan" class="img" v-show="isCollapse" />
            <!-- </button> -->
            <!-- <button  v-if="isCollapse"> -->
            <img src="../assets/三 (1)_wps图片.png" alt @click="fan" class="img" v-show="!isCollapse" />
            <!-- </button> -->
          </el-radio-group>
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            background-color="#1c2442"
            active-text-color="orange"
            text-color="white"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            :router="true"
            :unique-opened="true"
          >
            <el-submenu :index="String(index)" v-for="(item,index) in list" :key="index">
              <template slot="title">
                <i :class="element[index]"></i>
                <span slot="title">{{item.authName}}</span>
              </template>
              <el-menu-item-group v-for="(item0,index0) in list[index].children" :key="index0">
                <el-menu-item :index="'/'+item0.path">
                  <i class="el-icon-menu"></i>
                  {{item0.authName}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { z } from "../api/api";
export default {
  data() {
    return {
      // value,
      element: [
        "el-icon-user-solid",
        "el-icon-setting",
        "el-icon-shopping-bag-1",
        "el-icon-notebook-2",
        "el-icon-upload",
      ],

      isCollapse: false,
      list: [],
    };
  },
  created() {
    z().then((res) => {
      // console.log(res.data, "左侧");
      this.list = res.data;
    });
  },
  methods: {
    tuichu() {
      this.$store.dispatch("token", "");
      this.$router.push({
        path: "/",
      });
    },
    fan() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss" scoped>
.min-dis {
  display: flex;
  justify-content: left;
}
.div1 {
  font-size: 20px;
}
.img1 {
  width: 50px;
  height: 50px;
  padding: 0 10px;
  margin-top: 25px;
}
.main-div {
  width: 97%;
  height: 300px;
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
  height: 575px;
}
.tui {
  position: absolute;
  right: 50px;
  width: 100px;
  height: 40px;
  background: rgb(129, 135, 150);
  margin-top: 25px;
  border-radius: 10%;
  border: 1px solid white;
  color: white;
  font-size: 15px;
}
.icon {
  margin-left: 0px;
}
.el-header,
.el-footer {
  background-color: #1c2442;
  line-height: 100px;
  display: flex;
  justify-content: left;
  font-size: 40px;
  color: white;
}
.el-aside {
  color: #333;
  text-align: center;
  // line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: rgb(35, 35, 71);
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

.element.style {
  background-color: #1c2442;
}

.element.style {
  /* margin-bottom: 20px; */
  width: 100%;
  height: 30px;
  background: #1c2442;
}
</style>
