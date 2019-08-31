<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item logo"><b>Migrate</b></nuxt-link>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggle" >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">

      </div>

      <div class="navbar-end">
        <!-- <a class="navbar-item">
          Home
        </a> -->
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="!authenticated">
              <nuxt-link to="/login" class="button is-primary">Login</nuxt-link>
              <nuxt-link to="/register" class="button is-light">Register</nuxt-link>
            </template>
            <template v-if="authenticated">
              <nuxt-link to="/dashboard" class="button is-primary">{{user.first_name}}</nuxt-link>
              <a @click.prevent="logout" class="button is-light">Logout</a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      toggle: function( event ) {
        event.target.classList.toggle('is-active')
        this.$el.children[1].classList.toggle('is-active')
        //console.log(this.$el.children[1].classList)
        //console.log(event)
      },
      logout() {
        this.$auth.logout()
      }
    }
  }
</script>

<style scoped>

.logo {
  font-size: 25px;
}

</style>
