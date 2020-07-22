<template>
  <div>
    <div class="nav-wrap">
      <nav class="navbar container" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <nuxt-link to="/" class="logo"><img src="https://mygr8.ejincollective.com/storage/images/mets.png"></nuxt-link>
          <h4>{{pageTitle}}</h4>
          <span @click.prevent="toggle" class="cog" style="color: #fff;"><i class="fas fa-cog fa-2x"></i></span>
        </div>
      </nav>
    </div>

    <div class="menu">
      <div class="header">
        <span @click.prevent="toggle" style="color: #55006f;" class="chevron"><i class="fas fa-chevron-left"></i></span>
        <h4>Menu</h4>
        <span class="blank"></span>
      </div>
      <div class="body">
        <div class="my-row" @click.prevent="logout">
          <a class="" style="display: block;">Logout</a>
          <span style="color: #55006f;" class="chevron"><i class="fas fa-chevron-right"></i></span>
        </div>
        <span @click.prevent="toggle" v-if="user.role == 'I'">
          <nuxt-link to="/create" class="my-row">
            <a class="" style="display: block;">Create Video</a>
            <span style="color: #55006f;" class="chevron"><i class="fas fa-chevron-right"></i></span>
          </nuxt-link>
        </span>
        <span @click.prevent="toggle">
          <nuxt-link to="/dashboard/library" class="my-row">
            <a class="" style="display: block;">Video Library</a>
            <span style="color: #55006f;" class="chevron"><i class="fas fa-chevron-right"></i></span>
          </nuxt-link>
        </span>
        <div class="my-row" v-if="user.role == 'S'" @click.prevent="watermarkToggle">
          <a class="" style="display: block;">Watermarks</a>
          <span style="color: #55006f;" class="chevron"><i class="fas fa-chevron-right"></i></span>
        </div>
        <div class="my-row" v-if="user.role == 'I'" @click.prevent="sponsorToggle">
          <a class="" style="display: block;">Sponsors</a>
          <span style="color: #55006f;" class="chevron"><i class="fas fa-chevron-right"></i></span>
        </div>
      </div>

      <div class="watermarks">
        <div class="header">
          <span @click.prevent="watermarkToggle" style="color: #55006f;" class="chevron"><i class="fas fa-chevron-left"></i></span>
          <h4>Watermarks</h4>
          <span class="blank"></span>
        </div>
        <div class="body">
          <div class="my-row instructions">
            <p>Add or delete logos influencers can use to watermark their videos.</p>
          </div>
          <MyWatermarks />
        </div>
      </div>

      <div class="sponsors">
        <div class="header">
          <span @click.prevent="sponsorToggle" style="color: #55006f;" class="chevron"><i class="fas fa-chevron-left"></i></span>
          <h4>Sponsors</h4>
          <span class="blank"></span>
        </div>
        <div class="body">
          <div class="my-row instructions">
            <p>No longer making content for a sponsor or an agent? Remove them here.</p>
          </div>
          <Sponsors />
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import MyWatermarks from '@/components/mywatermarks.vue'
  import Sponsors from '@/components/sponsors.vue'
  export default {
    data() {
      return {
        pageTitle: 'Mets'
      }
    },
    components: {
      MyWatermarks,
      Sponsors
    },
    mounted() {
      const page = this.$refs;
    },
    methods: {
      toggle: function( event ) {
        this.$el.children[1].classList.toggle('is-active')
      },
      watermarkToggle: function( event ) {
        //this.$el.children[1].classList.toggle('is-active')
        this.$el.children[1].children[2].classList.toggle('is-active')
      },
      sponsorToggle: function( event ) {
        //this.$el.children[1].classList.toggle('is-active')
        this.$el.children[1].children[3].classList.toggle('is-active')
      },
      logout() {
        this.$auth.logout()
        this.toggle()
      },
      create() {
        this.toggle()
      }
    }
  }
</script>

<style scoped>

.nav-wrap {
  background: rgb(74,25,110);
  background: linear-gradient(159deg, rgba(74,25,110,1) 0%, rgba(50,87,219,1) 100%);
  padding: 5px;
}

.cog, .chevron, .my-row {
  cursor: pointer;
}

.navbar {
  z-index: 10;
  background: transparent;
}

.navbar-brand i {
  font-size: 20px;
}

.menu, .watermarks, .sponsors {
  position: fixed;
  top: 0px;
  width: 250px;
  height: 100vh;
  background: #fff;
  z-index: 10;
  right: -250px;
  transition: all .2s;
  border-left: solid 1px #55006f;
}

.is-active {
  right: 0px;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 17px 10px;
  border-bottom: solid 1px #55006f;
}

.header h4 {
  color: #55006f;
  font-weight: bold;
  font-size: 19px;
}

.my-row {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  border-bottom: solid 1px #4a4a4a;
}

.my-row a, .my-row a:hover, .my-row a:focus {
  color: #4a4a4a;
}

.instructions p {
  font-size: 14px;
  text-align: center;
}

.watermarks, .sponsors {
  overflow: scroll;
}

.navbar-brand h4 {
  color: #fff;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}

.navbar-brand {
  max-width: 500px;
  margin: auto;
}

.navbar-brand .logo {
}

.logo img {
  width: 32px;
}

@media only screen and (max-width: 767px) {
  .menu, .watermarks, .sponsors {
    width: 100%;
    right: -100%;
  }
  .is-active {
    right: 0px;
  }
  .instructions p {
    width: 100%;
    text-align: center;
    max-width: 250px;
    display: block; margin: auto;
  }
  .card-image {
    display: block;
    position: relative;
    max-width: 250px;
    margin: auto;
  }
  .menu {
    border-left: 0px;
  }
}


</style>
