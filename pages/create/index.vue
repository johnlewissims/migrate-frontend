<template>
  <div class="container form-wrap upload">
    <h1 class="title">Create</h1>
    <p class="upload-1">Upload your video below.</p>
    <div class="form-wraper">
      <div class="field">
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
                    Upload a Video
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
          <input v-model.trim="title" class="input" type="text" placeholder="Video Title">
        </p>
        <p class="help is-danger" v-if="errors.title">{{errors.title[0]}}</p>
      </div>
      <div class="field">
        <p class="control">
          <textarea v-model.trim="description" class="textarea" type="text" placeholder="Social Blurb" />
        </p>
        <p class="help is-danger" v-if="errors.description">{{errors.description[0]}}</p>
      </div>
      <div class="field" v-if="sponsors">
        <div class="select">
          <select ref="sponsor" v-on:change="sponsorSelect()">
            <option>Select a Sponsor</option>
            <option v-for="sponsor in sponsors" v-bind:value="sponsor.id">{{sponsor.first_name}} {{sponsor.last_name}}</option>
          </select>
        </div>
      </div>
      <div class="watermarks_container" v-if="watermarks">
        <p class="instructions">Select a Watermark for the Video.</p>
        <div class="field watermarks">
          <div class="watermark_wrap" v-for="watermark in watermarks">
            <div class="watermark" v-bind:class="{highlight:watermark.id == selectedWatermark}" v-on:click="selectedWatermark = watermark.id">
              <img v-bind:src="'https://mygr8.ejincollective.com/storage/watermarks/'+ watermark.id +'/' +watermark.name">
              <p class="name">{{watermark.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" v-on:click="submitFile()">
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
        file: '',
        filename: '',
        title: '',
        description: '',
        loader: false,
        generalError: '',
        sponsors: '',
        watermarks: '',
        selectedWatermark: '',
        selectedSponsor: '',
      }
    },
    mounted() {
      this.getSponsors()
    },
    methods: {
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
      handleFileUpload() {
        this.file = this.$refs.file.files[0];
        this.filename = this.$refs.file.files[0].name;
        this.type = this.$refs.file.files[0].type;
        this.size = this.$refs.file.files[0].size;
      },
      submitFile(){
        this.loader = true;
        let formData = new FormData();
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('file', this.file);
        formData.append('filename', this.filename);
        formData.append('user_id', this.user.id);
        formData.append('watermark_id', this.selectedWatermark);
        formData.append('selectedSponsor', this.selectedSponsor);
        formData.append('type', this.type);
        formData.append('size', this.size);
        this.$axios.post( 'videos',
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
    }
  }

</script>

<style scoped>

  .upload h1 {
    color: #55006f;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 0px;
  }

  .upload-1 {
    text-align: center;
    color: #55006f;
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

  .form-wraper {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .input, .textarea, .select select {
    border: solid 1px #55006f;
    border-radius: 6px !important;
  }

  .select select {
    color: #55006f;
  }

  .file label {
    width: 100%;
  }


  .help {
    margin-bottom: 10px;
  }

  .form-wrap {
    position: relative;
    max-width: 330px;
    padding: 10px 10px;
  }

  .watermarks {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .watermark_wrap {
    width: 50%;
  }

  .watermarks img {
    max-width: 100px;
    display: block;
    margin: auto;
    margin-bottom: 10px;
  }

  .watermarks .watermark {
    transition: all .2s ease;
    opacity: .5;
  }

  .watermarks .highlight {
    opacity: 1;
  }

  .name {
    font-size: 10px;
    text-align: center;
  }

  .watermarks_container {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .watermarks_container .instructions {
    margin-bottom: 10px;
    color: #55006f;
    text-align: center;
  }

  @media only screen and (max-width: 767px) {
    .watermark_wrap {
      width: 100%;
    }
  }


</style>
