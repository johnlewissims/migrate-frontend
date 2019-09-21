<template>
  <div class="container form-wrap">
    <h1 class="title">{{ videoData.title }}</h1>
    <p class="author">Created by <b>{{ getAuthor(videoData.owner_id) }} {{ authorName }}</b></p>
    <hr>
    <video v-if="video" style="width:600px;max-width:100%;" controls="">
      <source v-bind:src="video" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    <p>{{ videoData.description }}</p>
    <hr class="dark">
    <Comments />
  </div>
</template>

<script>

  import Comments from '@/components/comments.vue'

  export default{
    middleware: ['auth'],
    data() {
			return {
				video: '',
        videoData: '',
        authorName: '',
			}
		},
		mounted() {
      this.$axios.get(`/private/view/${this.$route.params.id}`, {responseType: 'blob'})
      .then((getResponse) => {
        this.video = URL.createObjectURL(getResponse.data)
      })
      this.$axios.get(`/videos/${this.$route.params.id}`)
      .then((getResponse) => {
        this.videoData = getResponse.data.data
      })
		},
    components: {
      Comments
    },
		methods: {
      getAuthor(id) {
        this.$axios.$get(`/users/${id}`)
        .then((getResponse) => {
          this.authorName = getResponse.first_name + " " + getResponse.last_name
        })
      },
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

  .container {
    max-width: 500px;
  }

  .author {
    padding-top: 0px;
    font-size: 10px;
  }

  .title {
    margin-bottom: 0px;
  }

  .dark {
    background-color: #000;
    height: 1px;
  }

</style>
