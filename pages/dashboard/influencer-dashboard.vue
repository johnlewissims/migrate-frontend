<template>
  <div>
    <div class="container influencer-panel influencer-header">
      <h1 class="title is-1">Welcome, {{user.first_name}}</h1>
      <nuxt-link to="/create" class="button is-primary">Create New Video</nuxt-link>
    </div>
    <div class="container my-container">
      <div class="columns">
        <div class="column">
          <h3 class="title is-3">Updates</h3>
          <div class="card">
            <div class="card-content">
              <div class="content">
                Your video "<a href="#">In the Locker Room with the Mets!</a>" has been posted and is pending approval.
                <br><br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <h3 class="title is-3">My Videos</h3>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                In the Locker Room with the Mets!
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                A short video of the team hanging out before the game.
                <a href="#">@frank</a>. <a href="#">#mets</a> <a href="#">#baseball</a>
                <br><br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Status</a>
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .influencer-header {
    max-width: 500px;
    text-align: center;
    display: block;
    margin: auto;
    margin-top: 100px;
    margin-bottom: 100px;
  }

</style>
