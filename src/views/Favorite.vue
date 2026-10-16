<template>
<div style="padding:20px">
  <h2>我的收藏笔记</h2>
  <el-divider/>
  <el-row :gutter="20">
    <el-col span="8" v-for="item in list" :key="item.note_id">
      <el-card shadow="hover">
        <h3 @click="$router.push('/note/'+item.note_id)" style="cursor:pointer">{{item.title}}</h3>
        <p v-if="item.summary" style="color:#666;font-size:13px">{{item.summary}}</p>
        <div style="margin-top:10px">
          <el-tag v-for="tg in item.tags" :key="tg.tag_id" size="small">{{tg.name}}</el-tag>
        </div>
        <div style="margin-top:10px">
          <el-button size="small" @click="$router.push('/note/'+item.note_id)">查看详情</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-empty v-if="list.length===0" description="暂无收藏"></el-empty>
</div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {getMyFavorite} from '@/api/note'

const list = ref([])

async function load(){
  list.value = await getMyFavorite()
}

onMounted(()=>load())
</script>
