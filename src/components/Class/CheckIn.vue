<template>
  <div>
    <template>
      <v-toolbar dark flat extended extension-height="40" class="primary" height="0"> <!--TODO Set height of toolbar to 0px-->
        <v-layout row slot="extension" >
          <v-toolbar-title class="white--text">Class Check-in</v-toolbar-title>
        </v-layout>
      </v-toolbar>
    </template>

   <v-card>
    <v-container fill-height>
      <v-layout row wrap>
        <v-flex class="text-xs-center">
           <!--<h1>Welcome!</h1>
            <img :src="user.photoURL" width="100"> <br>
            <h3>{{user.displayName}}</h3>
                    <p>{{user.email}}</p>
                 <v-btn @click="logOut">Log out</v-btn>-->
          <v-btn large route to ="/QR" class="secondary">
            Scan QR Code
            <v-icon right  >photo_camera</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-container>
   </v-card>

       <v-card>
         <v-container fill-height>
           <v-layout row wrap>
             <v-flex class="text-xs-center">
          <h2>or</h2>
          <v-text-field
            name="input-3"
            label="Enter Class Code"
            value=""
            v-model="classLocationInput"
            v-on:keyup.enter="classLocation"
          ></v-text-field>
          <v-btn large class="secondary" v-on:click="classLocation" route to="ClassPage" >Submit</v-btn> <!--TODO Add 'disable' class to this button-->
        </v-flex>
      </v-layout>
    </v-container>
   </v-card>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import auth from '@/auth'
  import { db } from '../../main'

  export default {
    data () {
      return {
        classLocationInput: '',
        alert: ''
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
        let originalString = this.classLocationInput.toLowerCase()// TODO FINISH WRITING THIS CODE split location to search firebase
        const splitString = originalString.split(' ')
        console.log(splitString)
        db.collection('Users').doc(this.user.email).set({location: splitString[0] + ' ' + splitString[1], studentName: this.user.displayName, photo: this.user.photoURL + '?width=9999', uid: this.user.uid})
        this.$router.replace('classpage')
      },
      logOut () {
        auth.logout()
      }
    },
    computed: {
      user () {
        return this.$store.getters['user/user']
      }
    }
  }
</script>

<style scoped>
  img {
    border-radius: 50px;
  }

  h3 {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
  }

  pre {
    text-align: left;
  }
</style>
