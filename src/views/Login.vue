<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">智能学习笔记与问答平台</h2>
      <el-tabs v-model="activeTab" class="login-tabs">
        <el-tab-pane label="用户登录" name="login">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            label-width="80px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名(3‑20位)"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="请输入密码，最少6位"
                show-password
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="submit-btn"
                :loading="loginLoading"
                @click="handleLogin"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="用户注册" name="register">
          <el-form
            ref="regFormRef"
            :model="regForm"
            :rules="regRules"
            label-width="80px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="regForm.username"
                placeholder="用户名3‑20位，不可重复"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input
                v-model="regForm.nickname"
                placeholder="显示昵称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="regForm.password"
                placeholder="密码不少于6位"
                show-password
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form-item>
            <el-button
              type="primary"
              class="submit-btn"
              :loading="regLoading"
              @click="handleRegister"
            >
              注册
            </el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { login, register } from "@/api/auth";
import { useUserStore } from "@/store/user";
const router = useRouter();
const userStore = useUserStore();
const activeTab = ref("login");
const loginFormRef = ref(null);
const loginLoading = ref(false);
const loginForm = ref({
  username: "",
  password: "",
});
const loginRules = ref({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度3‑20位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
});
const regFormRef = ref(null);
const regLoading = ref(false);
const regForm = ref({
  username: "",
  nickname: "",
  password: "",
});
const regRules = ref({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度3‑20位", trigger: "blur" },
  ],
  nickname: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
});
async function handleLogin() {
  await loginFormRef.value.validate();
  loginLoading.value = true;
  try {
    const res = await login(loginForm.value);
    userStore.setToken(res.token, res.user);
    ElMessage.success("登录成功");
    router.push("/notes");
  } catch (err) {
    ElMessage.error(err) //新增错误提示
    console.error("登录失败", err);
  } finally {
    loginLoading.value = false;
  }
}
async function handleRegister() {
  await regFormRef.value.validate();
  regLoading.value = true;
  try {
    await register(regForm.value);
    ElMessage.success("注册成功，请登录");
    activeTab.value = "login";
    regForm.value = { username: "", nickname: "", password: "" };
  } catch (err) {
    ElMessage.error(err) //新增错误提示
    console.error("注册失败", err);
  } finally {
    regLoading.value = false;
  }
}
</script>


<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 440px;
  padding: 10px 20px 30px;
}
.title {
  text-align: center;
  margin: 10px 0 20px;
  color: #303133;
}
.submit-btn {
  width: 100%;
}
</style>
