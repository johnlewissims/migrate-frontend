<template>
  <div>
      <div v-for="sponsor in sponsors">
        <span v-for="influencer in sponsor.influencer">
          <span v-if="influencer.id == user.id" class="sponsor">
            <span class="sponsor_row">
              <p class="name">{{ sponsor.first_name }} {{ sponsor.last_name }}</p>
              <span style="color: #CD0000; font-size: 23px;" class="deleteBtn" @click.prevent="deleteSponsor(sponsor.id)"><i class="fas fa-minus-circle"></i></span>
            </span>
          </span>
        </span>
      </div>

      <div class="addSponsorsPanel" v-if="modal != ''">
        <h4>Add Sponsors and Agents</h4>
        <div v-for="sponsor in nonSponsors">
          <span class="sponsor">
            <span class="sponsor_row">
              <p class="name">{{ sponsor.first_name }} {{ sponsor.last_name }}</p>
              <span style="color: #67B94E; font-size: 23px;" class="deleteBtn" @click.prevent="addSponsor(sponsor.id)"><i class="fas fa-plus-circle"></i></span>
            </span>
          </span>
        </div>
        <div class="closeContainer">
          <span @click.prevent="clearMessage()" class="finished">Finished</span>
        </div>
      </div>

      <div class="addRow" v-if="modal == ''">
        <label class="file-label" @click.prevent="toggleModal(1)">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-plus"></i>
            </span>
            <span class="file-label">
              Add Sponsor
            </span>
          </span>
        </label>
      </div>



  </div>
</template>


<script>

import moment from 'moment'
export default {
    middleware: ['auth'],
    data() {
      return {
        sponsors: '',
        nonSponsors: '',
        modal: ''
      }
    },
    mounted() {
      this.refreshData()
    },
    methods: {
      refreshData() {
        let {data} = this.$axios.$get(`/users`)
        .then((getResponse) => {
          this.sponsors = getResponse
        })

        let {data2} = this.$axios.$get(`/non-sponsors/${this.user.id}`)
        .then((getResponse) => {
          this.nonSponsors = getResponse
        })
      },
      deleteSponsor(id) {
        let formData = new FormData()
        formData.append('influencerId', id)
        this.$axios.post( `/disassociate/${this.user.id}`,
        formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
          }
        ).then(response => {
            this.refreshData()
					},err => {
            console.log(err)
				});
      },
      addSponsor(id) {
        let formData = new FormData()
        formData.append('influencerId', id)
        this.$axios.post( `/associate-single/${this.user.id}`,
        formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
          }
        ).then(response => {
            this.refreshData()
					},err => {
            console.log(err)
				});
      },
      toggleModal(id) {
        this.modal = id
      },
      clearMessage() {
        this.modal = ''
      }
    }
}

</script>

<style scoped>

.name {
  font-size: 20px;
}

.sponsor {
  padding: 10px;
  width: 100%;
  border-bottom: solid 1px;
  display: block;
}

.sponsor_row {
  display: block;
  max-width: 300px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sponsor .name {
  padding-right: 15px;
}

.deleteBtn {
  cursor: pointer;
}

.addRow {
  display: flex;
  justify-content: center;
  padding-top: 30px;
  margin-bottom: 25px;
}

.file-label, .file-cta, .file-cta:hover, .file-cta:focus {
  background: #67B94E;
  border: none;
  border-radius: 6px;
  color: #fff;
}

.notification {
}

.addSponsorsPanel h4 {
  text-align: center;
  padding: 10px;
  color: #55006f;
  border-bottom: solid 1px;
  font-weight: bold;
}

.finished {
  color: #55006f;
  border: solid 2px;
  border-radius: 6px;
  padding: 2px 15px;
  font-weight: 600;
  min-width: 120px;
  text-align: center;
  display: block;
  cursor: pointer;
}

.closeContainer {
  padding: 10px;
}

</style>
