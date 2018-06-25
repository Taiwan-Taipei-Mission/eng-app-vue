<template>
    <v-layout row justify-center>
      <div class="sign-in">
        <v-flex xs12 lg12 class="text-lg-center text-xs-center">
      <img class="mt-5" src="../../assets/App Sign In Free English Class.png"/>
        </v-flex>
      <div id="firebaseui-auth-container"></div> <!--TODO Change the CSS of firebase auth when a user tries to sign in through email, ie button colors, white line etc-->
        <p class="text-xs-center text-lg-center white--text mt-5"><a class="white--text" href="http://taiwaneng.com/privacy-policy">隱私權政策</a></p>
      </div>
    </v-layout>
</template>

<script>
  import auth from '@/auth'

  export default {
    name: 'auth',
    mounted () {
      auth.authForm('#firebaseui-auth-container')
    }
  }
</script>

<style scoped>
  @import "../../../node_modules/firebaseui/dist/firebaseui.css"; /*If you want to change the firebase ui defaults, you must go into this file and change them ie. firebase ui auth*/
  h1 {
    text-align: center;
    margin-top: 125px;
    color: #4CAF50;
  }
  .sign-in {
    background-color: #4CAF50;
    position: absolute;
    min-width: 100%;
    min-height: 100%;
  }
  img {
    max-width: 100%;
    height: auto;
    width: auto\9; /* ie8 */
  }
  </style>

