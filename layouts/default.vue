<template>
  <div :class="{ 'welcome': $route.path==='/' || $route.path==='/login' || $route.path==='/register' || $route.path==='/dashboard' }" >
    <Navbar v-if="$route.path !='/' && $route.path !='/register' && $route.path !='/login'" :class="{ 'hidden-nav': $route.path==='/' || $route.path==='/login'  || $route.path==='/register' || $route.path==='/dashboard' }" />
    <nuxt />
  </div>
</template>

<script>

import Navbar from '@/components/navbar.vue'
export default {
  data () {
    return {
      title: 'MYGR8'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
  components: {
    Navbar
  }
}

</script>

<style>

  body .hidden-nav {
    display: none;
    max-height: 0px;
  }

</style>
