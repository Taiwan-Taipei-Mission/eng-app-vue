<template>
  <div class="sign-up">
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex class="text-xs-center">
        <!--<h2>Sign in</h2>-->
        <v-text-field
          label="Email"
          value=""
          v-model="email"
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
        ></v-text-field>
        <v-btn large v-on:click="signUp" color="secondary">Create an Account</v-btn>
        <p>Already have an account? <router-link to="/signin">Sign in here</router-link></p>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'signUp',
    data: function () {
      return {
        email: '',
        password: '',
        e1: true
      }
    },
    methods: {
      signUp: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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
