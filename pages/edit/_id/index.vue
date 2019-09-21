<template>
  <div class="container form-wrap">
    <h1 class="title">Edit</h1>
    <hr>
    <div class="form-wraper">
      <div class="field">
        <p class="control">
          <input class="input" type="text" v-model="videoData.title">
        </p>
        <p class="help is-danger" v-if="errors.title">{{errors.title[0]}}</p>
      </div>
      <div class="field">
        <p class="control">
          <textarea v-model.trim="videoData.description" class="textarea" type="text" placeholder="Description" />
        </p>
        <p class="help is-danger" v-if="errors.description">{{errors.description[0]}}</p>
      </div>
      <div v-if="!filename">
        <video v-if="video" style="width:600px;max-width:100%;" controls="">
          <source v-bind:src="video" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
      </div>
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
      <div class="field" v-if="filename">
        <div class="select">
          <select ref="sponsor" v-on:change="sponsorSelect()">
            <option>Select a Sponsor</option>
            <option v-for="sponsor in sponsors" v-bind:value="sponsor.id">{{sponsor.first_name}} {{sponsor.last_name}}</option>
          </select>
        </div>
      </div>
      <div class="field" v-if="watermarks">
        <div class="columns is-multiline">
          <div class="column is-one-half-desktop is-half-tablet watermarks" v-for="watermark in watermarks">
            <div class="card" v-bind:class="{highlight:watermark.id == selectedWatermark}" v-on:click="selectedWatermark = watermark.id">
              <div class="card-image">
                <figure class="image is-128x128">
                  <img class="is-rounded" v-bind:src="'http://migrate-backend.test/watermarks/'+ watermark.id +'/' +watermark.name">
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        videoData: '',
        loader: true,
        generalError: '',
        filename: '',
        sponsors: '',
        watermarks: '',
        selectedWatermark: '',
        selectedSponsor: '',
        file: '',
			}
		},
		mounted() {
      this.loadVideo()
      this.getSponsors()
		},
		methods: {
      handleFileUpload() {
        this.filename = this.$refs.file.files[0].name;
        this.type = this.$refs.file.files[0].type;
        this.size = this.$refs.file.files[0].size;
        this.file = this.$refs.file.files[0];
      },
      loadVideo() {
        this.$axios.get(`/videos/${this.$route.params.id}`)
        .then((getResponse) => {
          this.videoData = getResponse.data.data
        })
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
			update(){
        this.loader = true;
        let formData = new FormData();
        formData.append('title', this.videoData.title);
        formData.append('description', this.videoData.description);
        formData.append('file', this.file);
        formData.append('filename', this.filename);
        formData.append('user_id', this.user.id);
        formData.append('watermark_id', this.selectedWatermark);
        formData.append('selectedSponsor', this.selectedSponsor);
        formData.append('type', this.videoData.type);
        formData.append('size', this.videoData.size);
        this.$axios.post( `/videos/update/${this.$route.params.id}`,
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
      getSponsors() {
        this.$axios.$get(`/users/`)
        .then((getResponse) => {
          this.sponsors = getResponse
        })
      },
      sponsorSelect() {
        this.selectedSponsor = this.$refs.sponsor.value
        this.$axios.$get(`/watermark/${this.$refs.sponsor.value}`)
        .then((getResponse) => {
          this.watermarks = getResponse
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

  .watermarks .card {
    opacity: .5;
    transition: all .2s ease;
  }

  .watermarks .card {
    opacity: .5;
    transition: all .2s ease;
  }

  .watermarks .highlight {
    opacity: 1;
  }

</style>
