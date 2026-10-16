<template>
  <div style="padding:24px;max-width:900px;margin:0 auto">
    <el-button @click="$router.push('/notes')">←返回列表</el-button>
    <el-divider/>
    <h1>{{note.title}}</h1>
    <div style="margin:8px 0">
      <el-tag v-for="t in note.tags" :key="t.tag_id">{{t.name}}</el-tag>
    </div>
    <p style="color:#666">{{note.summary}}</p>
    <el-divider/>
    <div style="white-space:pre-wrap;min-height:120px">{{note.content}}</div>
    <div style="margin:16px 0;display:flex;gap:12px">
      <el-button :icon="isLiked?'StarFilled':'Star'" @click="toggleLike">
        {{note.like_count}}点赞
      </el-button>
      <el-button :icon="isFav?'Collection':'CollectionTag'" @click="toggleFav">
        {{note.favorite_count}}收藏
      </el-button>
    </div>
    <el-divider>评论区({{note.comment_count}})</el-divider>
    <el-input v-model="commentText" placeholder="写评论(最多500字)" maxlength="500"></el-input>
    <el-button style="margin:8px 0" type="primary" @click="submitComment">发表评论</el-button>

    <!-- 多级评论递归组件 -->
    <CommentTree
      :comment-list="commentList"
      :note="note"
      @submit-reply="submitReply"
      @delete-comment="delComment"
    />
  </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {getNoteDetail,getNoteComments,addComment,delComment,likeNote,cancelLike,collectNote,cancelCollect} from '@/api/note'
import {useUserStore} from '@/store/user'
import {ElMessage} from 'element-plus'
// 引入递归多级评论组件
import CommentTree from '@/components/CommentTree.vue'
const route = useRoute()
const noteId = route.params.id
const userStore = useUserStore()
const note = ref({})
const commentList = ref([])
const commentText = ref('')
const isLiked = ref(false)
const isFav = ref(false)

async function load(){
  const resNote = await getNoteDetail(noteId)
  note.value = resNote
  // 后端返回树形结构的评论（带children子评论）
  const resComment = await getNoteComments(noteId)
  commentList.value = resComment
  // 初始化点赞、收藏状态（后端返回当前用户状态）
  isLiked.value = !!resNote.is_liked
  isFav.value = !!resNote.is_favorite
}

async function toggleLike(){
  if(isLiked.value){
    await cancelLike(noteId)
  }else{
    await likeNote(noteId)
  }
  await load() //操作完成直接重新拉取全部真实数据，不再手动修改count
}

async function toggleFav(){
  if(isFav.value){
    await cancelCollect(noteId)
  }else{
    await collectNote(noteId)
  }
  await load()
}

// 提交根评论
async function submitComment(){
  if(!commentText.value.trim()) return
  await addComment(noteId,{content:commentText.value, parent_id: null})
  ElMessage.success('评论成功')
  commentText.value = ''
  load()
}
// 提交子回复（楼中楼）
async function submitReply(replyData){
  await addComment(noteId, replyData)
  ElMessage.success('回复成功')
  load()
}
async function delComment(id){
  await delComment(id)
  ElMessage.success('已删除评论')
  load()
}
onMounted(()=>load())
</script>
