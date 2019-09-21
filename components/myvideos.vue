<template>
  <div>
    <h3 class="title is-3" v-if="videos.length > 0">My Videos</h3>
    <div class="notification is-warning" v-if="message.length > 0">
      <button class="delete" @click="clearMessage()"></button>
      {{message}}
    </div>
    <div class="card" v-for="video in videos">
      <header class="card-header">
        <p>
          <a v-bind:href="'/view/'+ video.id">
            <p class="card-header-title">
              {{ video.title }}
            </p>
          </a>
        </p>
        <p class="author">Created by <b>{{ getAuthor(video.owner_id) }} {{ authorName }}</b></p>
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
        <span class="card-footer-item">

          <select ref="status" v-if="user.role == 'Sponsor' &&  video.status != 'Uploading'" v-model.trim="video.status" name="status" v-on:change="statusUpdate(video.id)">
           <option value="Uploaded">Uploaded</option>
           <option value="Approved">Approved</option>
          </select>

          <div v-if="user.role == 'Influencer' || video.status == 'Uploading'">
            {{video.status}}
          </div>

        </span>
        <a v-bind:href="'/edit/'+ video.id" v-if="user.role == 'Influencer'" class="card-footer-item">Edit</a>
        <a v-if="video.status != 'Uploading' && user.role == 'Influencer'" @click.prevent="deleteVideo(video.id)" href="#" class="card-footer-item">Delete</a>
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
        message: [],
        authorName: '',
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
      },
      getAuthor(id) {
        this.$axios.$get(`/users/${id}`)
        .then((getResponse) => {
          this.authorName = getResponse.first_name + " " + getResponse.last_name
        })
      },
      statusUpdate(id) {
        this.loader = true;
        let formData = new FormData();
        formData.append('status', this.$refs.status[0].value);
        this.$axios.post( `videos/status/${id}`,
        formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
          }
        ).then(response => {
						this.loader = false;
            this.$router.push("/dashboard");
					},err => {
            this.loader = false;
            this.generalError = "An error occured uploading your video.  Please try again later."
				  });
      },
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

.card-header {
  display: block;
}

.card-header p {
  width:100%;
}

.card-header-title {
  padding-bottom: 0px;
}

.card-header .author {
  padding: 13px;
  padding-top: 0px;
  font-size: 10px;
}

</style>
