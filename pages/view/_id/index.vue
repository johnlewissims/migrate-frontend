<template>
  <div class="container form-wrap">
    <h1 class="title">View Video {{this.$route.params.id}}</h1>
    <hr>
    <video v-if="video" style="width:600px;max-width:100%;" controls="">
      <source v-bind:src="video" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
  </div>
</template>

<script>

  export default{
    middleware: ['auth'],
    data() {
			return {
				video: '',
			}
		},
		mounted() {
      this.$axios.get(`/private/view/${this.$route.params.id}`, {responseType: 'blob'})
      .then((getResponse) => {
        this.video = URL.createObjectURL(getResponse.data)
      })
		},
		methods: {
		}
  }

</script>

<style scoped>

  .help {
    margin-bottom: 10px;
  }

  .form-wrap {
    position: relative;
  }


</style>
