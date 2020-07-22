
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:300,300i,400,700,700i&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: 'images/favicon.png' }

    ],
    script: [
      { src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js', type: 'text/javascript' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'assets/main.css'
  ],

  /*
  ** Router
  */
  router: {
    middleware: ["clearValidationErrors"]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/mixins/user.js',
    './plugins/axios.js',
    './plugins/mixins/validation.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: "https://mygr8.ejincollective.com/api"
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'login',
            method: 'post',
            propertyName: "meta.token"
          },
          user: {
            url: 'user',
            method: 'get',
            propertyName: 'data'
          },
          logout: {
            url: 'logout',
            method: 'post'
          }
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
