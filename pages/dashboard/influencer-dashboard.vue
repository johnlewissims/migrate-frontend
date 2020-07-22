<template>
  <div>
    <div class="container influencer-panel influencer-header dashboard">
      <img class="logo" src="https://mygr8.ejincollective.com/storage/images/mets.png">
      <h1 class="title">Hello, {{user.first_name}}</h1>
      <p class="dashboard-1">What would you like to do today?</p>
      <nuxt-link to="/create" class="my-button">Upload a Video</nuxt-link>
      <nuxt-link to="/dashboard/library" class="my-button">View Library</nuxt-link>
    </div>
  </div>
</template>

<style scoped>

  .influencer-header {
    max-width: 300px;
    text-align: center;
    display: block;
    margin: auto;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  h1 {
    margin-bottom: 0px !important;
    color: #fff;
    font-size: 45px;
    font-weight: 400;
  }

  .dashboard-1 {
    margin-bottom: 15px;
    font-size: 18px;
    color: #fff;
  }

  .logo {
    width: 100px;
    margin-bottom: 25px;
  }

  .my-button {
    display: block;
    color: #fff;
    border: solid 2px;
    border-radius: 6px;
    padding: 5px 0px;
    font-size: 18px;
    margin-bottom: 10px;
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
