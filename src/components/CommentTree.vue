<template>
<div>
  <div v-for="c in commentList" :key="c.comment_id" style="border-bottom:1px solid #eee;padding:10px 0">
    <div>{{c.nickname}}：{{c.content}}</div>
    <div style="margin:4px 0">
      <el-button size="small" text @click="openReply(c)">回复</el-button>
      <el-button v-if="canDel(c)" size="small" text type="danger" @click="$emit('delete-comment', c.comment_id)">删除</el-button>
    </div>
    <!-- 回复输入框 -->
    <div v-if="replyTargetId === c.comment_id" style="margin:8px 0">
      <el-input v-model="replyContent" placeholder="回复这条评论" maxlength="500" />
      <el-button size="small" type="primary" @click="sendReply(c)">发送</el-button>
      <el-button size="small" @click="replyTargetId=null">取消</el-button>
    </div>
    <!-- 递归渲染子评论，缩进 -->
    <div style="margin-left:30px;border-left:2px solid #eee;padding-left:10px">
      <CommentTree
        v-if="c.children && c.children.length>0"
        :comment-list="c.children"
        :note="note"
        @submit-reply="$emit('submit-reply', $event)"
        @delete-comment="$emit('delete-comment', $event)"
      />
    </div>
  </div>
</div>
</template>
<script setup>
import {ref, defineProps, defineEmits} from 'vue'
import {useUserStore} from '@/store/user'
const props = defineProps({
  commentList: {
    type: Array,
    default: () => []
  },
  note: {
    type: Object,
    default: ()=>({})
  }
})
const emit = defineEmits(['submit-reply','delete-comment'])
const userStore = useUserStore()
const replyTargetId = ref(null)
const replyContent = ref('')

// 改为普通函数，不要用computed包裹
const canDel = (c)=>{
  return userStore.userInfo?.user_id === c.user_id || userStore.userInfo?.user_id === props.note?.user_id
}

const openReply = (item) => {
  // 如果点击同一个，就关闭；否则切换到当前
  replyTargetId.value = replyTargetId.value === item.comment_id ? null : item.comment_id
}

const sendReply = (item) => {
  if(!replyContent.value.trim()) return
  emit('submit-reply', {
    content: replyContent.value,
    parent_id: item.comment_id
  })
  replyTargetId.value = null
  replyContent.value = ''
}
</script>
