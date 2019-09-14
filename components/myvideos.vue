<template>
  <div>
    <h3 class="title is-3" v-if="videos.length > 0">My Videos</h3>
    <div class="notification is-warning" v-if="message.length > 0">
      <button class="delete" @click="clearMessage()"></button>
      {{message}}
    </div>
    <div class="card" v-for="video in videos">
      <header class="card-header">
        <p class="card-header-title">
          {{ video.title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <a v-if="video.status != 'Uploading'" v-bind:href="'/view/'+ video.id">
            <img v-bind:src="'http://migrate-backend.test/videos/ZWSWB6MFGRtybP4p/'+ video.id +'/screenshot.png'">
          </a>
          <img v-if="video.status == 'Uploading'" v-bind:src="'http://migrate-backend.test/images/loading.png'">
          {{ video.description }}
          <br><br>
          <time datetime="2016-1-1">{{ moment(video.created_at).format('MMMM Do YYYY, h:mm a') }}</time>
        </div>
      </div>
      <footer class="card-footer">
        <span class="card-footer-item">{{ video.status }}</span>
        <a v-bind:href="'/edit/'+ video.id" class="card-footer-item">Edit</a>
        <a v-if="video.status != 'Uploading'" @click.prevent="deleteVideo(video.id)" href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>


<script>

import moment from 'moment'
export default {
    middleware: ['auth'],
    data() {
      return {
        videos: [],
        message: []
      }
    },
    mounted() {
      this.refreshData()
    },
    methods: {
      moment: function (date) {
        return moment(date);
      },
      date: function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      },
      deleteVideo(id) {
        this.$axios.$delete(`/videos/${id}`)
        .then((getResponse) => {
          this.message = getResponse.response
          this.refreshData()
        })
      },
      clearMessage() {
        this.message = ""
      },
      refreshData() {
        let {data} = this.$axios.$get('/videos')
        .then((getResponse) => {
          this.videos = getResponse.data
        })
      }
    },
    filters: {
      moment: function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      }
    }
}

</script>

<style scoped>

.card {
  margin-bottom: 15px;
}

</style>
