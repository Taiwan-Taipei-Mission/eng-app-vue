<template>
  <div>
    <v-container fill-height>
      <v-layout row wrap>
        <v-flex class="text-xs-center">
          <h1>Class Check-in</h1>
          <v-btn large route to ="/QR" class="secondary">
            Scan QR Code
            <v-icon right  >photo_camera</v-icon></v-btn>
          <h2>or</h2>
          <v-text-field
            name="input-3"
            label="Enter Class Code"
            value=""
            v-model="classLocationInput"
          ></v-text-field>
          <v-btn large class="secondary" v-on:click="classLocation" route to="ClassPage" >Submit</v-btn> <!--TODO Add 'disable' class to this button-->
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn v-on:click="logout">Logout</v-btn>
  </div>
</template>
<script>
  import firebase from 'firebase'

  export default {
    data () {
      return {
        classLocationInput: ''
      }
    },
    methods: {
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('signin')
        })
      },
      classLocation () {
        this.$store.dispatch('classLocation', this.classLocationInput.toLowerCase())
      }
    }
  }
</script>
