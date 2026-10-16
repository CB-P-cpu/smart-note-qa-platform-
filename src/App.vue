<template>
  <el-container v-if="$route.path !== '/login'">
    <el-header style="background:#304156;color:#fff;display:flex;align-items:center;height:60px">
      <div style="font-size:18px;margin-right:30px">智能学习笔记与问答平台</div>
      <el-menu mode="horizontal" :default-active="$route.path" background-color="#304156" text-color="#fff">
        <el-menu-item index="/notes">笔记列表</el-menu-item>
        <el-menu-item index="/note/edit">新建笔记</el-menu-item>
        <el-menu-item index="/ai-chat">AI问答</el-menu-item>
        <el-menu-item index="/favorites">我的收藏</el-menu-item>
        <el-menu-item index="/stats">学习统计</el-menu-item>
      </el-menu>
      <div style="margin-left:auto">
        <el-button text @click="logout" style="color:white">退出登录</el-button>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  <router-view v-else></router-view>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logoutApi } from '@/api/auth'
import { useUserStore } from '@/store/user'
const router = useRouter()
const userStore = useUserStore()

async function logout() {
  await logoutApi()
  userStore.logout()
  router.push('/login')
}
</script>
