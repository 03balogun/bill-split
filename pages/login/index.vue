<template>
  <div class="container">
    <div class="auth-form-container">
      <div class="form-wrapper">
        <h2 class="mb-3 text-center">Login</h2>
        <error-alert :errors="loginErrors"></error-alert>
        <form method="post" @submit.prevent="onLogin">
          <div class="mb-3">
            <label for="email" class="">Email</label>
            <input v-model="loginData.email" required type="email" id="email" class="form-control">
          </div>
          <div class="mb-3">
            <label for="password" class="">Password</label>
            <div class="password-wrap">
              <input v-model="loginData.password" required type="password" id="password" class="form-control">
              <a href="javascript:;" @click="showPassword" class="">show</a>
            </div>
          </div>
          <div class="d-flex align-items-end">
            <span class="d-block">
              <nuxt-link to="/register">Create account</nuxt-link>
            </span>
            <button class="btn btn-primary ml-auto" :disabled="isLoading">
              {{!isLoading ? `Sign in` : `Please wait...`}}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import passwordMixin from "~/mixins/password.js"

export default {
  mixins: [passwordMixin],
  computed: {
    loginErrors() {
      return this.$store.getters['authentication/getLoginErrors'];
    }
  },
  data() {
    return {
      loginData: {email: '', password: ''},
      isLoading: false
    }
  },
  components: {},
  methods:{
    async onLogin(){
      this.isLoading = true;
      await this.$store.dispatch('authentication/login', this.loginData);
      this.isLoading = false;
    }
  }
}
</script>

<style lang="scss">

</style>
