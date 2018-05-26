<template>
  <div>
    <template>
      <v-toolbar dark flat extended extension-height="40" class="primary" height="0">
        <v-layout row slot="extension" >
          <v-toolbar-title class="white--text">Class Check-in</v-toolbar-title>
        </v-layout>
      </v-toolbar>
    </template>

    <div class="background">
    <v-container fill-height>
      <v-layout row wrap>
        <v-flex class="text-xs-center mt-2">
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
          <v-btn large class="secondary" v-on:click="classLocation" >Submit</v-btn> <!--TODO Add 'disable' class to this button-->
        </v-flex>
      </v-layout>
    </v-container>
      <v-flex xs12 v-if="alert2">
        <v-alert v-model="alert2" type="error">
          "{{userInput}}" not found. Please check your spelling and try again.
        </v-alert>
      </v-flex>
    </div>

    <v-layout row justify-center >
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
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
  import { db } from '../../main'

  export default {
    data () {
      return {
        classLocationInput: '',
        alert: '',
        alert2: false,
        today: '',
        dialog: false,
        paused: false,
        content: '',
        activateQR: false,
        loading: true,
        userInput: ''
      }
    },
    methods: {
      classLocation () {
        this.$store.dispatch('classLocation', this.classLocationInput.toLowerCase())
        let trimString = this.classLocationInput.trim() // TODO FINISH WRITING THIS CODE split location to search firebase
        let originalString = trimString.toLowerCase()

        db.collection('Users').doc(this.user.email).set({location: originalString, studentName: this.user.displayName, photo: this.user.photoURL + '?width=9999', uid: this.user.uid})
        this.date()
        db.collection('QR').doc(originalString).get().then(doc => {
          if (doc.exists) {
            db.collection('QR').doc(originalString).collection('classRole').doc(this.today).collection('students').doc(this.user.email).set({ /* TODO Figure out the original string/split string and found out a way to validate/sanitize information */
              studentID: this.user.email
            }, {merge: true})
            console.log('success')
            this.alert2 = false
            this.$store.commit('succesfulCheckin')
            this.$router.replace('classpage')
          } else {
            console.log('you stupid')
            this.userInput = this.classLocationInput
            this.alert2 = true
            this.dialog = false
          }
        })
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
          let sanitizedInput = content.replace('/', ' ')/* TODO find the correct way to catch an error if the user scans a QR code containing a non alpha numeric string */
          this.classLocationInput = sanitizedInput
          this.classLocation()
        } else {
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
  .background {
    background-color: #ffffff;
    position: absolute;
    min-width: 100%;
    min-height: 100%;
  }
</style>
