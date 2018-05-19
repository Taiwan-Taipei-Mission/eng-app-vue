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
          <v-btn large @click="runQR"  class="secondary"> <!--route to ="/QR"-->
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

    <v-layout row justify-center >
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition"> <!--TODO Trying to get QR code to have a closable box and display loading indicator until camera renders-->
        <!--TODO Resolve issue where the QR code does not rescan a code that has been scanned once-->
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false" @click="stopQR">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Scan</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items></v-toolbar>
        <div class="scanDialog">
          <h1 v-show="loading">Loading...</h1>
          <qrcode-reader v-if="activateQR" @init="onInit" @decode="onDecode"></qrcode-reader>
        </div>
      </v-dialog>
    </v-layout>

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
        alert: '',
        today: '',
        dialog: false,
        paused: false,
        content: '',
        activateQR: false,
        loading: true
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
        this.date()
        db.collection('QR').doc(originalString).collection('classRole').doc('students').collection(this.today).doc(this.user.email).set({
          studentID: this.user.email
        }, { merge: true })
        /* this.$router.replace('classpage') */
      },
      logOut () {
        auth.logout()
      },
      date () {
        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth() + 1 // January is 0!
        var yyyy = today.getFullYear()

        if (dd < 10) {
          dd = '0' + dd
        }

        if (mm < 10) {
          mm = '0' + mm
        }

        today = mm + '-' + dd + '-' + yyyy
        this.today = today
        console.log(today)
      },
      onDecode (content) {
        if (confirm(content)) {
          this.$store.dispatch('classLocation', content.toLowerCase())
          db.collection('Users').doc(this.user.email).set({location: content.toLowerCase(), studentName: this.user.displayName, photo: this.user.photoURL + '?width=9999', uid: this.user.uid})
          this.$router.push('classpage')
        } else {
          this.content = ''
        }
      },
      runQR () {
        this.activateQR = true
        this.dialog = true
      },
      stopQR () {
        this.activateQR = false
        this.loading = true
      },
      async onInit (promise) {
        // show loading indicator

        try {
          await promise

          // successfully initialized
        } catch (error) { /* TODO Add in results for each expected error type */
          if (error.name === 'NotAllowedError') {
            // user denied camera access permisson
          } else if (error.name === 'NotFoundError') {
            // no suitable camera device installed
          } else if (error.name === 'NotSupportedError') {
            // page is not served over HTTPS (or localhost)
          } else if (error.name === 'NotReadableError') {
            // maybe camera is already in use
          } else if (error.name === 'OverconstrainedError') {
            // passed constraints don't match any camera. Did you requested the front camera although there is none?
          } else {
            // browser is probably lacking features (WebRTC, Canvas)
          }
        } finally {
          this.loading = false
        }
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
  .scanDialog {
    background-color: #FFF;
    min-width: 100%;
    min-height: 100%;
  }
</style>
