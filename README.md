# smart-note-qa-platform
# 智能学习笔记与问答平台
> 毕业设计项目：基于SpringBoot + Vue3的前后端分离学习笔记系统

## 📖 项目简介
本平台是面向学习者的在线笔记管理与智能问答系统。用户可以注册登录，在线编写、保存、管理学习笔记，收藏笔记，查看笔记统计；内置AI问答模块，能够针对学习内容提问，辅助学习。

## ✨ 主要功能
1. 用户模块：用户注册、登录
2. 笔记模块：新建笔记、编辑笔记、查看笔记详情、笔记列表展示、收藏笔记
3. 数据统计：查看笔记数量等统计信息
4. AI智能问答：输入问题，获取AI回答

## 🛠️ 技术栈
### 前端
- Vue3
- Vue Router 路由
- Pinia 状态管理
- Axios 请求封装

### 后端
- Java SpringBoot
- MySQL数据库
- MyBatis
- JDBC

## 📁 项目目录说明
├── src/
│   ├── api/          # 接口请求
│   ├── components/   # 公共组件
│   ├── views/        # 页面视图
│   ├── router/       # 路由配置
│   ├── store/        # 全局状态
│   ├── utils/        # 工具类
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json      # 前端依赖
