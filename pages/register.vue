<template>
  <div class="container form-wrap login register">
    <div class="registration" v-if="this.firstScreen">
      <h1 class="title register_1">Register</h1>
      <form @submit.prevent="submit">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input v-model.trim="form.first_name" class="input" type="text" placeholder="First Name">
              </p>
              <p class="help is-danger" v-if="errors.first_name">{{errors.first_name[0]}}</p>
            </div>
            <div class="field">
              <p class="control">
                <input v-model.trim="form.last_name" class="input" type="text" placeholder="Last Name">
              </p>
              <p class="help is-danger" v-if="errors.last_name">{{errors.last_name[0]}}</p>
            </div>
          </div>
        </div>
        <div class="field">
          <p class="control">
            <input v-model.trim="form.email" class="input" type="email" placeholder="Email">
          </p>
          <p class="help is-danger" v-if="errors.email">{{errors.email[0]}}</p>
        </div>
        <div class="field">
          <div class="control">
            <p class="help">Who are you?</p>

            <div class="select">
              <select v-model.trim="form.role">
                <option value="Influencer">Influencer</option>
                <option value="Sponsor">Sponsor</option>
                <option value="Agent">Agent</option>
              </select>
            </div>
          </div>
          <p class="help is-danger" v-if="errors.role">{{errors.role[0]}}</p>
        </div>
        <div class="field">
          <p class="control">
            <input v-model.trim="form.company" class="input" type="text" placeholder="Company / Organization">
          </p>
          <p class="help is-danger" v-if="errors.company">{{errors.company[0]}}</p>
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
              Register
            </button>
          </p>
        </div>
      </form>
      <p class="help signup-link">Already Have an Account?<br> <nuxt-link to="/login" class="register-link">Login</nuxt-link>.</p>
    </div>

    <div class="user-association" v-if="this.influencer">
      <h1 class="title register_1">Select Your Sponsors and Agents</h1>
      <form @submit.prevent="associate">
        <div class="field">
          <div class="control">
            <div class="select is-multiple">
              <select multiple="multiple" size="5" v-model="sponsorsForm.sponsors">
                <option v-for="sponsor in sponsors" v-bind:value="sponsor.id">{{sponsor.first_name}} {{sponsor.last_name}}</option>
              </select>
            </div>
          </div>
          <p class="help is-danger" v-if="errors.role">{{errors.role[0]}}</p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button">
              Log In
            </button>
          </p>
        </div>
      </form>
    </div>


  </div>
</template>

<script>

  export default{
    middleware: ['guest'],
    data() {
      return {
        isMultiple: true,
        form: {
          email: '',
          first_name: '',
          last_name: '',
          role: [],
          company: '',
          password: '',
        },
        newUserId: '',
        firstScreen: true,
        influencer: false,
        sponsors: '',
        sponsorsForm: {
          sponsors: [],
        }
      }
    },
    mounted() {
    },
    methods: {
      submit() {
        //console.log(this.form)
        this.$axios
        .$post("register", this.form)
        .then(data => {
          //Open Association Panel

          console.log(data)
          if(this.form.role == "Influencer") {
            this.influencer = true;
            this.firstScreen = false;
            this.newUserId = data.data.id;
            this.getSponsors()
          } else {
            this.login()
          }
        });
      },
      getSponsors() {
        this.$axios.$get(`/users/`)
        .then((getResponse) => {
          this.sponsors = getResponse
          //console.log(getResponse)
        })
      },
      associate() {
        this.$axios
        .$post(`/associate/${this.newUserId}`, this.sponsorsForm)
        .then(data => {
          this.login()
        });
      },
      login() {
        this.$auth.loginWith("local", {
            data: {
                email: this.form.email,
                password: this.form.password
            }
        });
      }
    }
  }

</script>

<style scoped>

  .signup-link {
    margin-top: 10px;
  }

  .user-association .title {
    font-size: 30px;
  }

</style>
