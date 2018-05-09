<template>
  <div class="sign-in">
    <h1>Sign in</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
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
    color: #FFFFFF;
  }
  .sign-in {
    background-color: #4CAF50;
    position: absolute;
    min-width: 100%;
    min-height: 100%;
  }
  </style>
</style>
