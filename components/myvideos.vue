<template>
  <div>

    <vue-glide v-if="videos.length > 0" perView="1" class="video-slider">
      <vue-glide-slide v-for="(video, index) in videos">
        <a v-if="video.status != 'Uploading'" v-bind:href="'/view/'+ video.id">
          <div class="video-preview" :style="{ backgroundImage: 'url(https://mygr8.ejincollective.com/storage/videos/ZWSWB6MFGRtybP4p/'+ video.id +'/screenshot.png)' }"></div>
        </a>
        <div v-if="video.status == 'Uploading'" class="video-preview" :style="{ backgroundImage: 'url(https://mygr8.ejincollective.com/storage/images/loading.png)' }"></div>
        <div class="video-details">
          <h4>{{ video.title }}</h4>

          <p class="author">Created by <b>{{ video.owner.first_name }} {{ video.owner.last_name }}</b></p>

          <select class="status" ref="status-2" v-if="user.role == 'S' &&  video.status != 'Uploading'" v-model.trim="video.status" name="status" v-on:change="statusUpdate(video.id, index)">
           <option value="Uploaded">Uploaded</option>
           <option value="Revise">Revise</option>
           <option value="Approved">Approved</option>
          </select>

          <div v-if="user.role == 'A' || user.role == 'I' || video.status == 'Uploading'">
            <div class="status uploading" v-if="video.status == 'Uploading'">
              {{video.status}}
            </div>

            <div class="status uploaded" v-if="video.status == 'Uploaded'">
              {{video.status}}
            </div>
            <div class="status revise" v-if="video.status == 'Revise'">
              {{video.status}}
            </div>
            <div class="status approved" v-if="video.status == 'Approved'">
              {{video.status}}
            </div>
          </div>

          <div class="description">
            <h3>Description:</h3>
            {{video.description}}
          </div>

          <footer>
            <a v-bind:href="'/view/'+ video.id" class="footer-button">View Details</a>
            <a v-bind:href="'/edit/'+ video.id" v-if="user.role == 'I'" class="footer-button">Edit</a>
            <a v-if="video.status != 'Uploading' && user.role == 'I'" @click.prevent="toggleModal()" href="#" class="delete-button"><i class="far fa-trash-alt"></i></a>
          </footer>

          <div class="notification" v-if="message != ''">
            <div class="message">
              <h4>Are You Sure?</h4>
              <p>You'll have to re-upload and start over.</p>
              <span @click.prevent="deleteVideo(video.id)" class="modal-button danger-button">Yes, Delete This Video</span>
              <span @click.prevent="clearMessage()" class="modal-button">Nevermind, Go Back</span>
            </div>
          </div>

        </div>
      </vue-glide-slide>
      <template slot="control">
        <button v-for="(video, index) in videos" :data-glide-dir="'='+index">
          <div v-if="video.status == 'Uploading'" class="video-thumbnail" :style="{ backgroundImage: 'url(https://mygr8.ejincollective.com/storage/images/loading.png)' }"></div>
          <div v-if="video.status != 'Uploading'" class="video-thumbnail" :style="{ backgroundImage: 'url(https://mygr8.ejincollective.com/storage/videos/ZWSWB6MFGRtybP4p/'+ video.id +'/screenshot.png)' }"></div>
        </button>
      </template>
    </vue-glide>
  </div>
</template>


<script>

import moment from 'moment'
import VueGlide from 'vue-glide-js'
import { Glide, GlideSlide } from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'

export default {
    middleware: ['auth'],
    data() {
      return {
        videos: [],
        message: [],
        authorName: '',
      }
    },
    components: {
      [Glide.name]: Glide,
      [GlideSlide.name]: GlideSlide
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
      toggleModal() {
        this.message = "message"
      },
      deleteVideo(id) {
        this.$axios.$delete(`/videos/${id}`)
        .then((getResponse) => {
          this.message = getResponse.response
          this.refreshData()
          this.clearMessage()
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
      statusUpdate(id, index) {
        this.loader = true;
        let formData = new FormData();
        formData.append('status', this.$refs['status-2'][index].value);
        this.$axios.post( `videos/status/${id}`,
        formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
          }
        ).then(response => {
						this.loader = false;
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

/* VIDEO COMPONENT */
.video-preview {
  height: 300px;
  width: 100%;
  background-position: center;
  background-size: cover;
}

.video-thumbnail {
  background: none;
  border: 0px;
  width: 100%;
  height: 35px;
  background-size: cover;
  background-position: center;
}

.video-slider button {
  background: none;
  border: 0px;
  width: 15%;
  margin: 0px;
  padding: 0px;
}

.video-slider {
  margin-bottom: 50px;
}

.video-details {
  padding: 10px 0px;
}

.video-details h4 {
  font-size: 18px;
  font-weight: 600;
}

.video-details .author {
  font-size: 14px;
  margin-bottom: 10px;
}

.video-details .status {
  background: #2ec24f;
  color: #fff;
  display: inline;
  padding: 3px 10px;
  border-radius: 6px;
}

.video-details .description {
  margin-top: 10px;
  font-size: 14px;
  margin-bottom: 15px;
}

.video-details .description h3 {
  font-size: 18px;
  color: #55006f;
  font-weight: 600;
}

.video-slider footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

footer .footer-button {
  color: #55006f;
  border: solid 2px;
  border-radius: 6px;
  padding: 2px 15px;
  font-weight: 600;
  min-width: 120px;
  text-align: center;
  max-height: 33px;
}

footer .delete-button {
  color: #DC0000;
  padding: 0px;
  font-size: 24px;
}

footer {
  max-width: 300px;
}

.old {
  display: none;
}

.glide__slide {
  position: relative;
}

.notification {
  position: absolute;
  z-index: 100;
  top: 25vh;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px 30px;
  min-width: 300px;
  text-align: center;
  background: #fff;
  border: solid 1px #55006f;
}

.notification p {
  margin-bottom: 10px;
}

.message {
  background: #fff;
}

.notification h4 {
  color: #55006f;
}

.modal-button {
  color: #55006f;
  border: solid 2px;
  border-radius: 6px;
  padding: 7px 15px;
  font-weight: 600;
  min-width: 120px;
  text-align: center;
  display: block;
}

.danger-button {
  background: #db0000;
  color: #fff;
  border: solid 2px #db0000;
  margin-bottom: 10px;
}

.video-details  select.status {
  background: transparent;
  color: #55006f;
  display: inline;
  border-radius: 6px;
  padding: 5px 10px;
  min-height: 0px;
  border: solid 2px #55006f;
  font-size: 14px;
  font-weight: 600;
}

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

.video-details .uploading {
  background: rgba(50, 87, 219, 0.68);
}

.video-details .uploaded {
  background: #3257DB;
}

.video-details .revise {
  background: #DC0000;
}

</style>
