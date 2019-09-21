<template>
  <div>
    <div class="comment" v-for="comment in comments">
      <div class="commentInner">{{comment.comment}}</div>
      <!-- <p class="author"><b>{{ getAuthor(comment.user_id) }} {{ authorName }}</b></p> -->
      <a v-if="comment.user_id == user.id" @click.prevent="deleteComment(comment.id)" href="#" class="delete"></a>
    </div>
    <div class="addComment">
      <textarea class="textarea" ref="commentBox" type="text" placeholder="Add Comment" />
      <button class="button is-success" v-on:click="submitComment()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      comments: [],
      generalError: [],
      videoId: this.$route.params.id,
      authorName: '',
    }
  },
  mounted() {
    this.getComments(this.$route.params.id)
  },
  methods: {
    getComments(id) {
      this.$axios.$get(`/videos/comments/${id}`)
      .then((getResponse) => {
        this.comments = getResponse
      })
    },
    submitComment(){
      let formData = new FormData();
      formData.append('user_id', this.user.id);
      formData.append('comment', this.$refs.commentBox.value);
      this.$axios.post( `/videos/comments/${this.videoId}`,
      formData,
          {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
        }
      ).then(response => {
          //console.log(response)
          this.getComments(this.$route.params.id)
        },err => {
          this.generalError = "An error occured uploading your video.  Please try again later."
        });
    },
    // getAuthor(id) {
    //   this.$axios.$get(`/users/${id}`)
    //   .then((getResponse) => {
    //     return(getResponse.first_name + " " + getResponse.last_name)
    //   })
    // },
    deleteComment(id) {
      this.$axios.$delete(`/videos/comments/${id}`)
      .then((getResponse) => {
        this.getComments(this.$route.params.id)
      })
    },
  }
}

</script>

<style scoped>

  .comment {
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: solid 1px #cdcdcd;
    position: relative;
  }

  .comment .delete {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .author {
    padding-top: 0px;
    font-size: 10px;
  }

  .addComment .button {
    margin-top: 15px;
  }

</style>
