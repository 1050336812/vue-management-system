<template>
    <el-row>
        <el-col :span="8" style="padding-right:10px">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/2-3.jpg" alt="">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登入的时间：<span>2022-11-18</span></p>
                    <p>上次登入的地点：<span>福建</span></p>
                </div>
            </el-card>
            <el-card style="margin-top:20px;height:460px;">
                <el-table
                :data="tableData"
                style="width: 100%">
                    <!-- <el-table-column
                        prop="name"
                        label="课程">
                    </el-table-column>
                    <el-table-column
                        prop="todayBuy"
                        label="今日购买">
                    </el-table-column>
                    <el-table-column
                        prop="monthBuy"
                        label="本月购买">
                    </el-table-column>
                    <el-table-column
                        prop="totalBuy"
                        label="总购买">
                    </el-table-column> -->

                    <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left:10px">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
                    <i :class="`el-icon-${item.icon}`" class="icon" :style="{backgroundColor:item.color}"></i>
                    <div class="detail">
                        <p class="price">￥{{item.value}}</p>
                        <p class="desc">{{item.name}}</p>
                    </div>
                </el-card>
            </div>

            <el-card style="height:280px">
                <div ref="echarts1" style="height:280px"></div>
            </el-card>

            <div class="graph">
                <el-card style="height:260px">
                    <div ref="echarts2" style="height:260px"></div>
                </el-card>
                <el-card style="height:260px">
                    <div ref="echarts3" style="height:230px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import {getData} from '../api/index'
    import * as echarts from 'echarts'
    export default {
        name:'Home',
        data() {
            return {
                tableData: [],
                tableLabel:{
                    name:'课程',
                    todayBuy:'今日购买',
                    monthBuy:'本月购买',
                    totalBuy:'总购买'
                },
                countData: [
                    {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                    },
                    {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                    },
                    {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                    },
                    {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                    },
                    {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                    },
                    {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                    },
                ],
            }
        },
        mounted(){
            getData().then(
                response => {
                    this.tableData=response.data.data.tableData
                    
                    //折线图
                    // 基于准备好的dom，初始化echarts实例
                    const echarts1 = echarts.init(this.$refs.echarts1)
                    // 指定图表的配置项和数据
                    const echarts1Option = {
                    };
                    const xAxis = Object.keys(response.data.data.orderData.data[0])
                    echarts1Option.xAxis={
                        data:xAxis
                    }
                    echarts1Option.yAxis={}
                    echarts1Option.tooltip={}
                    echarts1Option.legend={
                        data: xAxis
                    }
                    echarts1Option.series=[]
                    xAxis.forEach(item => {
                        echarts1Option.series.push({
                            name:item,
                            data:response.data.data.orderData.data.map(items => items[item]),
                            type:'line'
                        })
                    })
                    // 使用刚指定的配置项和数据显示图表。
                    echarts1.setOption(echarts1Option);

                    //柱状图
                    // 基于准备好的dom，初始化echarts实例
                    const echarts2 = echarts.init(this.$refs.echarts2)
                    const echarts2Option = {
                        legend: {
                            // 图例文字颜色
                            textStyle: {
                            color: "#333",
                            },
                        },
                        grid: {
                            left: "20%",
                        },
                        // 提示框
                        tooltip: {
                            trigger: "axis",
                        },
                        xAxis: {
                            type: "category", // 类目轴
                            data: response.data.data.userData.map(item => item.date),
                            axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                            },
                            axisLabel: {
                            interval: 0,
                            color: "#333",
                            },
                        },
                        yAxis: [
                            {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                color: "#17b3a3",
                                },
                            },
                            },
                        ],
                        color: ["#2ec7c9", "#b6a2de"],
                        series: [
                            {
                                name:'新增用户',
                                data:response.data.data.userData.map(item => item.new),
                                type:'bar'
                            },
                            {
                                name:'活跃用户',
                                data:response.data.data.userData.map(item => item.active),
                                type:'bar'
                            }
                        ],
                    }
                    // 使用刚指定的配置项和数据显示图表。
                    echarts2.setOption(echarts2Option);


                    //饼状图
                    const echarts3 = echarts.init(this.$refs.echarts3)
                    const echarts3Option = {
                        tooltip: {
                            trigger: "item",
                        },
                        color: [
                            "#0f78f4",
                            "#dd536b",
                            "#9462e5",
                            "#a6a6a6",
                            "#e1bb22",
                            "#39c362",
                            "#3ed1cf",
                        ],
                        series: [
                            {
                                type:'pie',
                                data:response.data.data.videoData
                            }
                        ]
                    }
                    // 使用刚指定的配置项和数据显示图表。
                    echarts3.setOption(echarts3Option);
                }
            )
        }
    }
</script>

<style lang="less" scoped>
    .user{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom:20px;
        border-bottom:1px solid #ccc;
        img{
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
        .userinfo{
            .name{
                font-size: 32px;
                margin-bottom: 10px;
            }
            .access{
                color: #999;
            }
        }
        
    }
    .login-info{
        p{
            font-size: 14px;
            line-height: 28px;
            color: #999;
            span{
                color: #666;
                margin-left: 60px;
            }
        }
    }
    .num{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .icon{
            width: 80px;
            height: 80px;
            font-size: 30px;
            line-height: 80px;
            text-align: center;
            color: #fff;
        }
        .detail{
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 15px;
            .price{
                font-size: 30px;
                height: 30px;
                line-height: 30px;
                margin-bottom:10px;
            }
            .desc{
                font-size: 15px;
                color: #999;
                text-align: center;
            }
        }
        .el-card{
            width: 32%;
            margin-bottom:20px;
        }
    }
    .graph{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .el-card{
            width: 48%;
        }
    }
</style>