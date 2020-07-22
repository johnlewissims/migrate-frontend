<template>
  <div class="container form-wrap">
    <div class="form-wraper">

      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <div class="file has-name">
              <label class="file-label handle">
                <input class="file-input" ref="file" type="file" v-on:change="handleFileUpload()">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Upload a New Video
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <p class="control">
          <span><b>Title</b></span>
          <input class="input" type="text" v-model="videoData.title">
        </p>
        <p class="help is-danger" v-if="errors.title">{{errors.title[0]}}</p>
      </div>
      <div class="field">
        <p class="control">
          <span><b>Description</b></span>
          <textarea v-model.trim="videoData.description" class="textarea" type="text" placeholder="Description" />
        </p>
        <p class="help is-danger" v-if="errors.description">{{errors.description[0]}}</p>
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
                  <img class="is-rounded" v-bind:src="'https://mygr8.ejincollective.com/storage/watermarks/'+ watermark.id +'/' +watermark.name">
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" v-on:click="update()">
            Update Video
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
      this.$parent.$parent.$children[0].pageTitle = "Edit Video"
		},
		methods: {
      handleFileUpload() {
        this.filename = this.$refs.file.files[0].name;
        this.type = this.$refs.file.files[0].type;
        this.size = this.$refs.file.files[0].size;
        this.file = this.$refs.file.files[0];
      },
      loadVideo() {
        this.loader = false
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
            this.$router.push("/dashboard/library");
					},err => {
            this.loader = false;
            this.generalError = "An error occured uploading your video.  Please try again later."
				  });
      },
      getSponsors() {
        this.$axios.$get(`/sponsors/${this.user.id}`)
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

  .file-cta, .file-cta:hover, .file-cta:focus {
    width: 100%;
    text-align: center;
    justify-content: center;
    color: #fff;
    background: #55006f;
    border-radius: 6px !important;
  }

  .file-cta, .button, .button:hover, .button:focus {
    width: 100%;
    text-align: center;
    justify-content: center;
    font-size: 18px;
    background: #55006f;
  }

  .handle {
    width: 100%;
  }

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
