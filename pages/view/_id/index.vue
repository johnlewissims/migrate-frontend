<template>
  <div class="container form-wrap video">
    <video v-if="video" style="width:600px;max-width:100%;" controls="">
      <source v-bind:src="video" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    <div class="header">
      <h1 class="title">{{ videoData.title }}</h1>
      <p class="author">Created by <b>{{ getAuthor(videoData.owner_id) }} {{ authorName }}</b></p>
      <time>{{ moment(videoData.created_at).format('MMMM Do, h:mm a') }}</time>

      <select class="status" ref="status-2" v-if="user.role == 'S' &&  video.status != 'Uploading'" v-model.trim="video.status" name="status" v-on:change="statusUpdate(video.id, index)">
       <option value="Uploaded">Uploaded</option>
       <option value="Revise">Revise</option>
       <option value="Approved">Approved</option>
      </select>

      <div v-if="user.role == 'I' || videoData.status == 'Uploading'">
        <div class="status uploaded" v-if="videoData.status == 'Uploaded'">
          {{videoData.status}}
        </div>
        <div class="status revise" v-if="videoData.status == 'Revise'">
          {{videoData.status}}
        </div>
        <div class="status approved" v-if="videoData.status == 'Approved'">
          {{videoData.status}}
        </div>
      </div>
    </div>

    <div class="description">
      <h4>Description</h4>
      {{ videoData.description }}
    </div>

    <hr>

    <div class="comments">
      <Comments />
    </div>

  </div>
</template>

<script>

  import Comments from '@/components/comments.vue'
  import moment from 'moment'
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
      moment: function (date) {
        return moment(date);
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
        return moment(date).format('MMMM Do, h:mm:ss a');
      }
    }
  }

</script>

<style scoped>

  .form-wrap {
    max-width: 330px !important;
    padding-top: 25px;
  }

  video {
    max-width: 200px !important;
    display: block;
    margin: auto;
    margin-bottom: 15px;
  }

  .title {
    font-size: 20px;
    margin-bottom: 0px;
  }

  .author {
    font-size: 16px;
  }

  .status {
    background: #2ec24f;
    color: #fff;
    display: inline;
    padding: 3px 10px;
    border-radius: 6px;
  }

  time {
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
  }

  .description {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .description h4 {
    color: #55006f;
    font-weight: bold;
    font-size: 18px;
  }

  .video hr {
    background-color: #55006f;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .help, .header {
    margin-bottom: 10px;
  }

  .form-wrap {
    position: relative;
  }

  .container {
    max-width: 500px;
  }

  .dark {
    background-color: #000;
    height: 1px;
  }

  .uploading {
    background: rgba(50, 87, 219, 0.68);
  }

  .uploaded {
    background: #3257DB;
  }

  .revise {
    background: #DC0000;
  }

</style>
