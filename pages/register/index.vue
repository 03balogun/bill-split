<template>
  <div class="container">
    <div class="auth-form-container">
      <div class="form-wrapper">
        <h2 class="mb-3 text-center">Register</h2>
        <error-alert :errors="registrationErrors"></error-alert>
        <form action="" @submit.prevent="onRegister">
          <div class="mb-3">
            <label for="username" class="">Username</label>
            <input type="text" v-model="registrationData.username" required id="username" class="form-control">
          </div>
          <div class="mb-3">
            <label for="email" class="">Email</label>
            <input type="email" id="email" v-model="registrationData.email" required class="form-control">
          </div>
          <div class="mb-3">
            <label for="password" class="">Password</label>
            <div class="password-wrap">
              <input type="password" v-model="registrationData.password" required id="password" class="form-control">
              <a href="javascript:;" @click="showPassword" class="">show</a>
            </div>
          </div>
          <div class="d-flex align-items-end">
            <span class="d-block">
              <nuxt-link to="/login">Back to login</nuxt-link>
            </span>
            <button class="btn btn-primary ml-auto" :disabled="isLoading">
              {{!isLoading ? `Submit` : `Please wait...`}}
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
  components: {},
  computed: {
    registrationErrors() {
      return this.$store.getters['authentication/getRegistrationErrors'];
    }
  },
  data(){
    return {
      registrationData: {username: '', email: '', password: ''},
      isLoading: false
    }
  },
  methods: {
    async onRegister(){
      this.isLoading = true;
      await this.$store.dispatch('authentication/register', this.registrationData);
      this.isLoading = false;
    }
  }
}
</script>

<style lang="scss">

</style>
