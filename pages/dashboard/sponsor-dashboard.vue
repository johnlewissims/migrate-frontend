<template>
  <div>
    <div class="container influencer-panel influencer-header">
      <h1 class="title is-1">Welcome, {{user.first_name}}</h1>
    </div>
    <div class="container my-container">
      <div class="columns">
        <div class="column">
          <MyVideos />
        </div>
        <div class="column">
          <MyWatermarks />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MyWatermarks from '@/components/mywatermarks.vue'
import MyVideos from '@/components/myvideos.vue'
export default {
  components: {
    MyWatermarks,
    MyVideos
  }
}

</script>

<style scoped>

  .influencer-header {
    max-width: 500px;
    text-align: center;
    display: block;
    margin: auto;
    margin-top: 100px;
    margin-bottom: 100px;
  }

</style>
