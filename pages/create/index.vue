<template>
  <div class="container form-wrap">
    <h1 class="title">Create</h1>
    <hr>
    <div class="form-wraper">
      <div class="field">
        <p class="control">
          <input v-model.trim="title" class="input" type="text" placeholder="Video Title">
        </p>
        <p class="help is-danger" v-if="errors.title">{{errors.title[0]}}</p>
      </div>
      <div class="field">
        <p class="control">
          <textarea v-model.trim="description" class="textarea" type="text" placeholder="Description" />
        </p>
        <p class="help is-danger" v-if="errors.description">{{errors.description[0]}}</p>
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
          <div class="field">
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
      }
    },
    methods: {
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
            this.$router.push("/dashboard");
					},err => {
            this.loader = false;
            this.generalError = "An error occured uploading your video.  Please try again later."
				  });
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

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }


</style>
