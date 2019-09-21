<template>
  <div>
    <div class="container influencer-panel influencer-header">
      <h1 class="title is-1">Welcome, {{user.first_name}}</h1>
      <nuxt-link to="/create" class="button is-primary">Create New Video</nuxt-link>
    </div>
    <div class="container my-container">
        <div class="column">
          <MyVideos />
        </div>
    </div>
  </div>
</template>

<style scoped>

  .influencer-header {
    max-width: 500px;
    text-align: center;
    display: block;
    margin: auto;
    margin-top: 100px;
    margin-bottom: 100px;
  }

  .my-container {
    max-width: 450px;
  }

</style>

<script>

import MyVideos from '@/components/myvideos.vue'
export default {
  components: {
    MyVideos
  }
}

</script>
