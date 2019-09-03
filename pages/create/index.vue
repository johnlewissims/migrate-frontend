<template>
  <div class="container form-wrap">
    <h1 class="title">Create</h1>
    <hr>
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
  </div>
</template>

<script>

  export default{
    middleware: ['auth'],
    data() {
      return {
        file: '',
        filename: ''
      }
    },
    methods: {
      handleFileUpload() {
        this.file = this.$refs.file.files[0];
        this.filename = this.$refs.file.files[0].name;
      },
      submitFile(){
        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('filename', this.filename);
        formData.append('user_id', 1);
        this.$axios.post( 'videos',
        formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
          }
        ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },
    }
  }

</script>

<style scoped>

  .help {
    margin-bottom: 10px;
  }

</style>
