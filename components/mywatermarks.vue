<template>
  <div>

      <div v-for="watermark in watermarks" class="watermark">
        <div class="card-image">
          <img class="logo" v-bind:src="'https://mygr8.ejincollective.com/storage/watermarks/'+ watermark.id +'/' +watermark.name">
          <p class="name">{{ watermark.name }}</p>
          <a class="deleteBtn" @click.prevent="deleteWatermark(watermark.id)">
            <i class="far fa-trash-alt"></i>
          </a>
        </div>
      </div>
      <div class="">
        <div class="field">
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" ref="file" type="file" v-on:change="addWatermark()">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Upload
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

  </div>
</template>


<script>

import moment from 'moment'
export default {
    middleware: ['auth'],
    data() {
      return {
        watermarks: '',
        file: '',
        name: '',
        loader: false,
        generalError: ''
      }
    },
    mounted() {
      this.refreshData(this.user.id)
    },
    methods: {
      refreshData(id) {
        let {data} = this.$axios.$get(`/watermark/${id}`)
        .then((getResponse) => {
          this.watermarks = getResponse
        })
      },
      deleteWatermark(id) {
        this.$axios.$delete(`/watermark/${id}`)
        .then((getResponse) => {
          this.message = getResponse.response
          this.refreshData(this.user.id)
        })
      },
      addWatermark() {
        this.loader = true;
        this.file = this.$refs.file.files[0];
        this.name = this.$refs.file.files[0].name;
        let formData = new FormData()
        formData.append('file', this.file)
        formData.append('name', this.name)
        formData.append('user_id', this.user.id)
        formData.append('watermark_id', this.selectedWatermark)
        this.$axios.post( 'watermark',
        formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
          }
        ).then(response => {
            this.message = response
            this.refreshData(this.user.id)
					},err => {
            console.log(err)
            this.loader = false;
            this.generalError = "An error occured uploading your watermark.  Please try again later."
				  });
      },
    }
}

</script>

<style scoped>

.watermark {
  padding: 10px;
  text-align: center;
  position: relative;
  border-bottom: solid 1px;
}

.card-image {
  position: relative;
}

.card-image img {
  max-width: 100px;
}

.name {
  font-size: 10px;
}

.deleteBtn {
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 12px;
  color: #CD0000;
}

.file {
  text-align: center;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 25px;
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

</style>
