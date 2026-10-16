<template>
  <div style="padding:24px;max-width:900px;margin:0 auto">
    <h2>{{ isEdit ? '编辑笔记' : '新建笔记' }}</h2>
    <el-divider/>
    <el-form :model="form" label-width="100px">
      <el-form-item label="笔记标题">
        <el-input v-model="form.title" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="form.categoryId" clearable placeholder="未分类">
          <el-option v-for="c in categoryList" :key="c.category_id" :label="c.name" :value="c.category_id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.tagIdList" multiple placeholder="选择标签" style="width:100%">
          <el-option v-for="t in tagList" :key="t.tag_id" :label="t.name" :value="t.tag_id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="笔记正文">
        <el-input v-model="form.content" type="textarea" :rows="12" maxlength="20000"></el-input>
      </el-form-item>
      <!-- 新增摘要表单项 -->
      <el-form-item label="笔记摘要">
        <el-input v-model="form.summary" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="saveLoading" @click="handleSave">保存</el-button>
        <el-button :loading="aiLoading" @click="genSummary">AI生成摘要</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {createNote,getNoteDetail,updateNote,getCategoryList,getTagList} from '@/api/note'
import {aiSummarize} from '@/api/ai'
import {ElMessage} from 'element-plus'
const route = useRoute()
const router = useRouter()
const noteId = route.params.id
const isEdit = !!noteId
const saveLoading = ref(false)
const aiLoading = ref(false)
const categoryList = ref([])
const tagList = ref([])
// form增加summary字段
const form = ref({
  title:'',
  categoryId:null,
  tagIdList:[],
  content:'',
  summary: ''
})
async function loadCatTag(){
  categoryList.value = await getCategoryList()
  tagList.value = await getTagList()
}
async function loadNote(){
  const data = await getNoteDetail(noteId)
  form.value.title = data.title
  form.value.categoryId = data.category_id
  form.value.content = data.content
  form.value.tagIdList = data.tags.map(t=>t.tag_id)
  // 编辑时回显已有摘要
  form.value.summary = data.summary
}
async function handleSave(){
  saveLoading.value = true
  try{
    if(isEdit){
      await updateNote(noteId,form.value)
    }else{
      await createNote(form.value)
    }
    ElMessage.success('保存成功')
    router.push('/notes')
  }finally {
    saveLoading.value = false
  }
}
async function genSummary(){
  if (!form.value.content.trim()) {
    ElMessage.warning("请先填写笔记正文内容！")
    return
  }
  aiLoading.value = true
  try{
    const res = await aiSummarize({content:form.value.content})
    ElMessage.success('摘要已生成')
    // 将AI返回摘要赋值到表单
    form.value.summary = res.summary
  }finally {
    aiLoading.value = false
  }
}
onMounted(async ()=>{
  await loadCatTag()
  if(isEdit){
    await loadNote()
  }
})
</script>
