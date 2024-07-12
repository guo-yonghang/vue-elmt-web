<template>
  <div class="flxc full">
    <div class="login-content">
      <el-form ref="formContext" :model="formData" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="账号">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" placeholder="密码" type="password">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button :icon="UserFilled" :loading="loading" type="primary" size="default" @click="onLogin">登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore, useTabStore } from '@/store/index'

const router = useRouter()
const userStore = useUserStore()
const tabStore = useTabStore()
const formContext = ref()
const loading = ref(false)

const formData = reactive({
  username: '',
  password: '',
})

const onLogin = () => {
  formContext.value.validate((valid) => {
    if (valid) {
      userStore.token = 'xxxxxx'
      router.push({ path: tabStore.homePath })
    }
  })
}

const rules = {
  username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
}
</script>

<style scoped lang="scss">
.login-content {
  width: 300px;
}

.el-button {
  width: 100%;
}
</style>
