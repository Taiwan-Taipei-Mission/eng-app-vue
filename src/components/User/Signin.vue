<template>
  <div>
    <p> The Signin Page</p>
    <input type="text" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <v-btn v-on:click="signin">Sign in</v-btn>
    <p>{{this.user.firstName}} {{this.user.lastName}}</p>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  export default {
    name: 'signin',
    computed: mapState({
      user: state => state.user
    }),
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signin: function () {
        console.log(this.signinAction)
        this.signinAction({
          email: this.email,
          password: this.password
        })
      },
      ...mapActions({
        signinAction: 'signin'
      })
    },
    mounted: function () {
      console.log('mounted')
    }
  }
</script>
