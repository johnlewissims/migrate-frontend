<template>
  <div class="container form-wrap">
    <h1 class="title">Register</h1>
    <hr>
    <form @submit.prevent="submit">
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input v-model.trim="form.first_name" class="input" type="text" placeholder="First Name">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
            <p class="help is-danger" v-if="errors.name">{{errors.name[0]}}</p>
          </div>
          <div class="field">
            <p class="control is-expanded">
              <input v-model.trim="form.last_name" class="input" type="text" placeholder="Last Name">
            </p>
            <p class="help is-danger" v-if="errors.name">{{errors.name[0]}}</p>
          </div>
        </div>
      </div>
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
            Register
          </button>
        </p>
      </div>
    </form>
    <p class="help signup-link">Already Have an Account? <nuxt-link to="/login"><b>Login</b></nuxt-link>.</p>
  </div>
</template>

<script>

  export default{
    middleware: ['guest'],
    data() {
      return {
        form: {
          email: '',
          name: '',
          password: ''
        }
      }
    },
    methods: {
      submit() {
        this.$axios
        .$post("register", this.form)
        .then(data => {
          // login
          this.$auth.loginWith("local", {
              data: {
                  email: this.form.email,
                  password: this.form.password
              }
          });
          console.log(data);
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
