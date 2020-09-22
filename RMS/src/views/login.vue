<template>
  <div class="box">
    <div class="login-div">
      <img src="../assets/logo.png" alt />
    </div>
    <div class="login-div2">
      <div class="login-div3 login-div4">
        <el-input v-model="name" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
      </div>
      <div class="login-div3">
        <el-input
          v-model="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          :show-password="true"
        ></el-input>
      </div>
      <div class="button">
        <button @click="btn" class="btn">登录</button>
        <button @click="btn1" class="btn1">重置</button>
      </div>
    </div>
  </div>
</template>

<script>
import { lg } from "../api/api";
export default {
  data() {
    return {
      name: "",
      password: "",
    };
  },
  created() {},
  methods: {
    btn() {
      lg({
        username: this.name,
        password: this.password,
      }).then((res) => {
        console.log(res.data);
        if (res.data != null) {
          this.$router.push({
            path: "/home",
          });
          this.$store.dispatch("token", res.data.token);
        }
      });
    },
    btn1() {
      this.name = "";
      this.password = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  //   margin: 0 auto;
  //   background: blue;
  margin-top: 50px;
  margin-left: 558px;
  .btn {
    background: green;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
  }
  .btn1 {
    background: gray;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;

    margin-left: 20px;
  }

  //   font-size: 60px;
}
.login-div4 {
  padding-top: 150px;
}
.login-div3 {
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
  // padding-top: 40px;
}
.box {
  background: rgb(97, 102, 114);
  width: 100%;
  height: 1065px;
}
.login-div {
  width: 150px;
  height: 150px;
  // border: 1px solid red;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px gray;
  margin: 0 auto;
  z-index: 999;
  background: white;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgb(233, 231, 231);
  }
}
.login-div2 {
  width: 800px;
  height: 500px;
  // border: 1px solid black;
  margin: 0 auto;
  margin-top: -100px;
  background: white;
}
</style>
