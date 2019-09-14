<template>
  <div>
    <Navbar />
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
