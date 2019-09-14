<template>
  <div class="container form-wrap">
    <h1 class="title">Edit</h1>
    <hr>
    <div class="form-wraper">
      <div class="field">
        <p class="control">
          <input class="input" type="text" v-model="video.title">
        </p>
        <p class="help is-danger" v-if="errors.title">{{errors.title[0]}}</p>
      </div>
      <div class="field">
        <p class="control">
          <textarea v-model.trim="video.description" class="textarea" type="text" placeholder="Description" />
        </p>
        <p class="help is-danger" v-if="errors.description">{{errors.description[0]}}</p>
      </div>
      <video v-if="video" style="width:600px;max-width:100%;" controls="">
        <source v-bind:src="video" type="video/mp4">
        Your browser does not support HTML5 video.
      </video>
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <div class="file has-name">
              <label class="file-label">
                <input class="file-input" ref="file" type="file" v-on:change="handleFileUpload()">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Upload a file…
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div class="field is-hidden-desktop">
            <div class="file has-name">
              <label class="file-label">
                <input class="file-input" type="file" accept="video/*" v-on:change="handleFileUpload()" capture>
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-video"></i>
                  </span>
                  <span class="file-label">
                    Record a Video
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <p class="help">{{ this.filename }}</p>
      <div class="field">
        <p class="control">
          <button class="button is-success" v-on:click="update()">
            Submit Video
          </button>
        </p>
      </div>
      <p class="help is-danger" v-if="this.generalError">{{ this.generalError }}</p>
      <div class="loading-fade" v-if="loader"></div>
      <div class="loading" v-if="loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
    </div>
  </div>
</template>

<script>

  export default{
    middleware: ['auth'],
    data() {
			return {
				video: '',
        loader: true,
        generalError: '',
        filename: '',
        title: '',
        description: ''
			}
		},
		mounted() {
      this.loadVideo()
		},
		methods: {
      handleFileUpload() {
        this.filename = this.$refs.file.files[0].name;
        this.type = this.$refs.file.files[0].type;
        this.size = this.$refs.file.files[0].size;
      },
      loadVideo() {
        this.$axios.get(`/private/view/${this.$route.params.id}`, {responseType: 'blob'})
        .then((getResponse) => {
          this.video = URL.createObjectURL(getResponse.data)
          this.loader = false
        })
      },
      loadInformation() {
        this.$axios.get(`/videos/${this.$route.params.id}`)
        .then((getResponse) => {
          this.filename = URL.createObjectURL(getResponse.data)
          this.loader = false
        })
      },
			update() {
			  this.$axios.patch(`/videos/${this.$route.params.id}`, {
					title: this.video.title,
          description: this.video.description,
          file: this.$refs.file.files[0],
          filename: this.filename,
          type: this.type,
          size: this.size,
				}).then(response => {
						this.loader = false;
            console.log(this.$refs.file.files[0]);
            //this.$router.push("/dashboard");
					},err => {
            this.loader = false;
            this.generalError = "An error occured uploading your video.  Please try again later."
				  });
			}
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
