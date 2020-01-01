require('dotenv').config();

export default {
  mode: 'universal',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    API_URL: 'https://billsplitapi.herokuapp.com/bills'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/globalComponents'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'message.access_token' },
          user: false,
          logout: false,
        },
      }
    },
    redirect: {
      login: '/login',
      logout: false,
      callback: false,
      home: '/bills'
    },
    plugins: [
      '~/plugins/axios'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, {isDev, isClient, isServer, loaders}) {
      config.module.rules.push(
        {
          test: /.\/.*\.(woff(2)?|eot|eot@|ttf)?(.v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader?name="[name]-[hash].[ext]"'
        }
      );
    }
  }
}
