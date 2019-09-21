<template>
  <div>
    <h3 class="title is-3">My Watermarks</h3>

    <div class="columns is-multiline">
      <div class="column is-one-third-desktop is-half-tablet" v-for="watermark in watermarks">
        <div class="card">
          <div class="card-image">
            <figure class="image is-128x128">
              <img class="is-rounded" v-bind:src="'http://migrate-backend.test/watermarks/'+ watermark.id +'/' +watermark.name">
            </figure>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click.prevent="deleteWatermark(watermark.id)">
              Delete
            </a>
          </footer>
        </div>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <div class="card">
          <div class="card-content">
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


</style>
