<template>
  <div>
    <div class="comment" v-for="(comment, index) in comments">
      <div class="header">
        <p class="author"><b>{{ comment.user.first_name }} {{ comment.user.last_name }}</b></p>
        <time>{{ moment(comment.created_at).format('MMMM Do, h:mm a') }}</time>
      </div>

      <div class="commentInner">{{comment.comment}}</div>
      <a v-if="comment.user_id == user.id" @click.prevent="deleteComment(comment.id)" href="#" class="delete"></a>
    </div>
    <div class="addComment">
      <textarea class="textarea" ref="commentBox" type="text" placeholder="Add Comment" />
      <button class="button is-success" v-on:click="submitComment()">
        Add Comment
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      comments: [],
      authors: [],
      generalError: [],
      videoId: this.$route.params.id,
      authorName: '',
    }
  },
  mounted() {
    this.getComments(this.$route.params.id)
    this.getAuthor()
  },
  methods: {
    moment: function (date) {
      return moment(date);
    },
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
          this.$refs.commentBox.value = ""
        },err => {
          this.generalError = "An error occured uploading your video.  Please try again later."
        });
    },
    getAuthor() {
      //console.log('test')
      this.comments.forEach(function(item){
        console.log('test')
      });
      // this.$axios.$get(`/users/${id}`)
      // .then((getResponse) => {
      //   this.authors.push(getResponse.first_name + ' ' + getResponse.last_name)
      // })
    },
    deleteComment(id) {
      this.$axios.$delete(`/videos/comments/${id}`)
      .then((getResponse) => {
        this.getComments(this.$route.params.id)
      })
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  }
}

</script>

<style scoped>

  .comment {
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: solid 1px #55006f;
    position: relative;
  }

  .comment .delete {
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: rgba(85, 0, 111, 0.6);
  }

  .author {
    color: #55006f;
    font-weight: bold;
    font-size: 18px;
  }

  .addComment .button {
    margin-top: 15px;
  }

  .addComment textarea {
    border: solid 1px #55006f;
    border-radius: 6px;
  }

  .button, .button:hover, .button:focus {
    background: #55006f;
    width: 100%;
    text-align: center;
    font-size: 20px;
  }

  .header {
    display: flex;
    align-items: flex-end;
  }

  hr {
    background-color: #55006f;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .header time {
    font-size: 14px;
    color: #55006f;
    padding-left: 10px;
    padding-bottom: 3px;
  }

</style>
