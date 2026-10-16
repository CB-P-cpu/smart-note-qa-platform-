<template>
<div style="padding:20px">
  <div style="display:flex;justify-content:space-between;margin-bottom:16px">
    <h2>我的学习笔记</h2>
    <el-button type="primary" @click="$router.push('/note/edit')">新建笔记</el-button>
  </div>

  <el-row :gutter="16">
    <el-col span="6">
      <el-input v-model="query.keyword" placeholder="搜索标题/正文"></el-input>
    </el-col>
    <el-col span="5">
      <el-select v-model="query.categoryId" placeholder="选择分类" clearable>
        <el-option label="全部分类" :value="null"></el-option>
        <el-option v-for="c in categoryList" :key="c.category_id" :label="c.name" :value="c.category_id"></el-option>
      </el-select>
    </el-col>
    <el-col span="5">
      <el-select v-model="query.tagId" placeholder="选择标签" clearable>
        <el-option label="全部标签" :value="null"></el-option>
        <el-option v-for="t in tagList" :key="t.tag_id" :label="t.name" :value="t.tag_id"></el-option>
      </el-select>
    </el-col>
    <el-col span="4">
      <el-button type="primary" @click="loadList">查询</el-button>
    </el-col>
  </el-row>

  <el-divider></el-divider>

  <el-row :gutter="20">
    <el-col span="8" v-for="item in noteList" :key="item.note_id">
      <el-card shadow="hover">
        <h3 @click="$router.push('/note/'+item.note_id)" style="cursor:pointer;margin:0 0 8px">{{item.title}}</h3>
        <p v-if="item.summary" style="color:#666;font-size:13px;margin:4px 0">{{item.summary}}</p>
        <div style="margin-top:10px">
          <el-tag v-for="tg in item.tags" :key="tg.tag_id" size="small">{{tg.name}}</el-tag>
        </div>
        <div style="margin-top:12px;font-size:12px;color:#999">
          点赞{{item.like_count}}｜收藏{{item.favorite_count}}｜评论{{item.comment_count}}
        </div>
        <div style="margin-top:8px">
          <el-button size="small" @click="$router.push('/note/edit/'+item.note_id)">编辑</el-button>
          <el-button size="small" type="danger" @click="delNote(item)">删除</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-pagination
    v-model:current-page="query.pageNum"
    v-model:page-size="query.pageSize"
    :total="total"
    @current-change="loadList"
    layout="total,prev,pager,next"
    style="margin-top:20px"
  ></el-pagination>
</div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {getNoteList,deleteNote,getCategoryList,getTagList} from '@/api/note'
import {ElMessage,ElMessageBox} from 'element-plus'

const noteList = ref([])
const categoryList = ref([])
const tagList = ref([])
const total = ref(0)

const query = ref({
  keyword:'',
  categoryId:null,
  tagId:null,
  pageNum:1,
  pageSize:9
})

async function loadList(){
  const res = await getNoteList(query.value)
  noteList.value = res.records
  total.value = res.total
}

async function loadCatTag(){
  categoryList.value = await getCategoryList()
  tagList.value = await getTagList()
}

async function delNote(row){
  await ElMessageBox.confirm('确认删除笔记？删除不可恢复')
  await deleteNote(row.note_id)
  ElMessage.success('已删除')
  loadList()
}

onMounted(()=>{
  loadCatTag()
  loadList()
})
</script>
