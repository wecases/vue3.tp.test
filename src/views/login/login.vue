<script setup lang="ts">
/**
 * @File:   login.vue
 * @Time:   2022/11/18 09:16:25
 * @Author: Hao1617
 * @Desc:
 */
interface LoginData {
  username: string
  password: string
}

const ruleForm: LoginData = reactive({
  username: '',
  password: '',
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
})

const login = () => {
  console.log('login')
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="username" prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input v-model="ruleForm.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
