<template>
  <div>
    <!-- 面宝屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计图</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <!--2. 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import { getreports } from "../../api/api";
import echarts from "echarts";
export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    //3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));


    // 5.展示数据
    getreports().then((res) => {
      console.log(res);
      // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(res.data);
    });
    
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 15px;
}
</style>