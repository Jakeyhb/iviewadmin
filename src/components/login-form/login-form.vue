<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="code">
      <Input class="jakebyinput" v-model="form.code" placeholder="请输入验证码">
        <span slot="prepend">
          <Icon :size="14" type="md-image"></Icon>
        </span>
        <span class="jakeby_code" slot="append" v-html="svg" @click="_getCode()">验证码</span>
      </Input>
    </FormItem>

    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import axios from '@/libs/request'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '账号不能为空', trigger: 'blur' }]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  data() {
    return {
      svg: '',
      form: {
        userName: '',
        password: '',
        code: '',
        sid: ''
      }
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  mounted() {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    this._getCode()
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.form.userName,
            password: this.form.password,
            sid: this.form.sid,
            code: this.form.code
          })
        }
      })
    },
    _getCode() {
      this.form.sid = localStorage.getItem('sid')
      axios
        .get('/api/getCaptcha', {
          params: {
            sid: this.form.sid
          }
        })
        .then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.svg = res.data
          }
        })
    }
  }
}
</script>
<style lang="sass">
.jakebyinput .ivu-input-group-append

  padding: 0

.jakeby_code
  height: 28px
  display: inline
  overflow: hidden
  padding: 0
  svg
    width: 120px
    position: relative
    top: -2px
    height: 28px
</style>
