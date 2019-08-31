<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>

import Navbar from '@/components/navbar.vue'
export default {
  components: {
    Navbar
  }
}

</script>


<style>

  * {
    font-family: 'Nunito Sans', sans-serif;
  }

  .form-wrap {
    max-width: 300px;
    margin-top: 100px;
    margin-bottom: 100px;
  }

</style>
