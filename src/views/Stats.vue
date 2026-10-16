<template>
  <div style="padding:24px;max-width:1000px;margin:0 auto">
    <h2>学习数据统计</h2>
    <el-divider/>
    <el-row :gutter="30">
      <el-col span="12">
        <el-card>
          <h4>用户活跃度(最近30天)</h4>
          <div ref="activeChartRef" style="height:320px"></div>
        </el-card>
      </el-col>
      <el-col span="12">
        <el-card>
          <h4>笔记产出趋势(最近30天)</h4>
          <div ref="noteChartRef" style="height:320px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {ref,onMounted,nextTick,onUnmounted} from 'vue'
import * as echarts from 'echarts'
import {getActivityStats,getNoteTrend} from '@/api/stats'
const activeChartRef = ref(null)
const noteChartRef = ref(null)
// 保存echart实例
let activeChart = null
let noteChart = null

async function renderActiveChart(){
  const res = await getActivityStats({days:30})
  activeChart = echarts.init(activeChartRef.value)
  activeChart.setOption({
    tooltip:{},
    xAxis:{type:'category',data:res.dateList},
    yAxis:{type:'value'},
    series:[{type:'line',data:res.dataList}]
  })
}
async function renderNoteChart(){
  const res = await getNoteTrend({days:30})
  noteChart = echarts.init(noteChartRef.value)
  noteChart.setOption({
    tooltip:{},
    xAxis:{type:'category',data:res.dateList},
    yAxis:{type:'value'},
    series:[{type:'bar',data:res.dataList}]
  })
}
onMounted(async ()=>{
  await nextTick()
  renderActiveChart()
  renderNoteChart()
})
// 组件销毁，释放ECharts实例，防止内存泄漏
onUnmounted(()=>{
  if(activeChart){
    activeChart.dispose()
  }
  if(noteChart){
    noteChart.dispose()
  }
})
</script>
