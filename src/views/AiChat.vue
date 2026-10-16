<template>
<div style="padding:24px;max-width:900px;margin:0 auto">
  <h2>AI智能学习问答（基于我的笔记）</h2>
  <el-divider></el-divider>
  <div class="chat-box" style="height:450px;overflow-y:auto;border:1px solid #eee;padding:12px">
    <div v-for="item in historyList" :key="item.id" style="margin-bottom:14px">
      <el-alert title="我的提问" type="info">{{item.question}}</el-alert>
      <el-alert title="AI回答" type="success" style="margin:8px 0">
        {{item.answer}}
        <div v-if="item.cited_notes">引用笔记ID：{{item.cited_notes}}</div>
      </el-alert>
    </div>
  </div>
  <div style="margin-top:14px;display:flex;gap:10px">
    <el-input v-model="question" placeholder="输入你的问题（AI读取你的笔记作为上下文）"></el-input>
    <el-button type="primary" :loading="loading" @click="sendAsk">提问</el-button>
  </div>
</div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {aiAsk,getQaHistory} from '@/api/ai'

const question = ref('')
const loading = ref(false)
const historyList = ref([])

async function sendAsk(){
  if(!question.value.trim()) return
  loading.value = true
  try{
    await aiAsk({question:question.value})
    await loadHistory()
    question.value = ''
  }finally {
    loading.value = false
  }
}

async function loadHistory(){
  historyList.value = await getQaHistory()
}

onMounted(()=>loadHistory())
</script>
