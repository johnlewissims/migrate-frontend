<template>
  <div>
    <div class="container form-wrap">
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

  .library-header h1 {
    color: #55006f;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 30px;
    font-size: 35px;
  }

  .form-wrap {
    padding: 0px;
    max-width: 330px;
    margin-top: 25px;
  }


</style>

<script>

import MyVideos from '@/components/myvideos.vue'
export default {
  data() {
    return {
    }
  },
  components: {
    MyVideos
  },
  mounted() {
    this.$parent.$parent.$children[1].pageTitle = "Library"
  },
}

</script>
