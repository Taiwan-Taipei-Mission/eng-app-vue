<!--Vuetifyjs.com - Makes code way easier. Built using Vuejs. vuejs.org-->
<template>
  <div class="login">
    <!---->
    <v-container fill-height>
      <!--Makes reactive.Replaces media queries in HTML. From Vuetify.-->
      <v-layout row wrap>
        <!--Center in the screen. From Vuetify-->
        <v-flex class="text-xs-center">
    <!--<h2>Sign in</h2>-->
          <v-text-field
            label="Email"
            value=""
            v-model="email"
            v-on:keyup.enter="signIn"
          ></v-text-field>
          <v-text-field
            name="input-10-1"
            label="Password"
            hint="At least 6 characters"
            v-model="password"
            min="6"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            counter
            v-on:keyup.enter="signIn"
          ></v-text-field>
    <v-btn large v-on:click="signIn" color="secondary">Sign in</v-btn>
    <p>Don't have have an account? <router-link to="/signup">Sign up here</router-link></p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'login',
    data: function () {
      return {
        email: '',
        password: '',
        e1: true
      }
    },
    methods: {
      signIn: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        )
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
