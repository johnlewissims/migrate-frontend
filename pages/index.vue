<template>
  <div class="container form-wrap login">
    <h1 class="title">Welcome</h1>
    <p class="login_1">Please Sign In</p>
    <form @submit.prevent="submit">
      <div class="field">
        <p class="control">
          <input v-model.trim="form.email" class="input" type="email" placeholder="Email">
        </p>
        <p class="help is-danger" v-if="errors.email">{{errors.email[0]}}</p>
      </div>
      <div class="field">
        <p class="control">
          <input v-model.trim="form.password" class="input" type="password" placeholder="Password">
        </p>
        <p class="help is-danger" v-if="errors.password">{{errors.password[0]}}</p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button">
            Log In
          </button>

        </p>
      </div>
    </form>
    <p class="help signup-link">Don't Have an Account? <br><nuxt-link to="/register" class="register-link">Make One Here.</nuxt-link></p>
  </div>
</template>

<script>

  export default{
    middleware: ['guest'],
    data() {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      submit() {
        this.$auth
        .loginWith("local", {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        .then(data => {
          this.$router.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }

</script>

<style scoped>

  .signup-link {
    margin-top: 10px;
  }

  .container {

  }

</style>
