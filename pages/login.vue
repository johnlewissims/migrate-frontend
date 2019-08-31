<template>
  <div class="container form-wrap">
    <h1 class="title">Login</h1>
    <hr>
    <form @submit.prevent="submit">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input v-model.trim="form.email" class="input" type="email" placeholder="Email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
        <p class="help is-danger" v-if="errors.email">{{errors.email[0]}}</p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input v-model.trim="form.password" class="input" type="password" placeholder="Password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <p class="help is-danger" v-if="errors.password">{{errors.password[0]}}</p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success">
            Login
          </button>

        </p>
      </div>
    </form>
    <p class="help signup-link">Don't Have an Account? <nuxt-link to="/register"><b>Register</b></nuxt-link>.</p>
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
          console.log(data);
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

</style>
