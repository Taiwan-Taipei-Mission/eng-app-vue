<template>
  <div>
    <template>
      <v-toolbar dark flat extended extension-height="40" class="primary" height="0">
        <v-layout row slot="extension" >
          <v-toolbar-title class="white--text">報到</v-toolbar-title> <!--Class Check-in-->
        </v-layout>
      </v-toolbar>
    </template>

    <div class="background">
    <v-container fill-height>
      <v-layout row wrap>
        <v-flex class="text-xs-center mt-2">
          <v-btn large @click="runQR"  class="secondary"> <!--route to ="/QR"-->
            掃描QR碼
            <v-icon right  >photo_camera</v-icon></v-btn> <!--Scan QR Code-->
        </v-flex>
      </v-layout>
    </v-container>

         <v-container fill-height>
           <v-layout row wrap>
             <v-flex class="text-xs-center">
          <h2>或</h2> <!--or-->
          <v-text-field
            name="input-3"
            label="輸入班級代碼"
            value=""
            :error="alert2"
            v-model="classLocationInput"
            v-on:keyup.enter="classLocation"
            id="classField"
            data-hj-whitelist
          ></v-text-field>  <!--Enter Class Code-->
          <v-btn large class="secondary" :disabled="!classLocationInput.length >= 1" v-on:click="classLocation" >提交</v-btn> <!--Submit-->
        </v-flex>
      </v-layout>
    </v-container>
      <v-flex xs12 v-if="alert2">
        <v-alert v-model="alert2" type="error">
          「{{userInput}}」不存在。 請檢查您的代碼，並再試一次
        </v-alert> <!--not found. Please check your spelling and try again.-->
      </v-flex>
    </div>

    <v-layout row justify-center >
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <!--TODO Resolve issue where the QR code does not rescan a code that has been scanned once--> <!--Bug is caused by Vue QR Reader, not my code-->
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false" @click="stopQR">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>掃描</v-toolbar-title> <!--Scan-->
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items></v-toolbar>
        <div class="scanDialog">
          <h1 v-show="loading">處理中...</h1> <!--Loading...-->
          <v-alert type="error" v-show="QRerror">{{QRerror}}</v-alert>
          <qrcode-reader v-if="activateQR" @init="onInit" @decode="onDecode"></qrcode-reader>
        </div>
      </v-dialog>
    </v-layout>




  </div>
</template>

<script>
  import { db } from '../../main'
  import firebase from 'firebase/app'

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
        userInput: '',
        QRerror: ''
      }
    },
    methods: {
      classLocation () {
        this.$store.dispatch('classLocation', this.classLocationInput.toLowerCase())
        let trimString = this.classLocationInput.trim()
        let originalString = trimString.toLowerCase()
        this.date()
        db.collection('QR').doc(originalString).get().then(doc => {
          if (doc.exists) {
            console.log('set date for classRole')
            db.collection('QR').doc(originalString).collection('classRole').doc(this.today).set({
              date: this.today
            }, {merge: true})
            console.log('trying to make doc for student details')
            db.collection('QR').doc(originalString).collection('classRole').doc(this.today).collection('students').doc(this.user.email).set({
              studentID: this.user.email
            }, {merge: true})
            db.collection('Users').doc(this.user.email).set({lastSearchAttempt: originalString, location: originalString, studentName: this.user.displayName, photo: this.user.photoURL + '?width=9999', uid: this.user.uid}, {merge: true})
            console.log('success')
            this.alert2 = false
            this.$store.commit('successfulCheckin') // Activates the successful checkin toast on the ClassPage
            this.$router.replace('classpage')
          } else {
            console.log('class location not located')
            this.userInput = this.classLocationInput
            this.alert2 = true
            this.dialog = false
            document.getElementById('classField').blur() // Blurs the element so that the keyboard will disappear and allow the user to see the alert
            db.collection('AppLogs').doc(this.user.email).set({failedSearchAttempt: originalString, lastSearchedAt: firebase.firestore.FieldValue.serverTimestamp()}, {merge: true}) // Logs the failed search attempt
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
        if (content !== '') {
          if (confirm('您將報到.... "' + content + '"')) {
            let sanitizedInput = content.replace('/', ' ')
            /* TODO find the correct way to catch an error if the user scans a QR code containing a non alpha numeric string */
            this.classLocationInput = sanitizedInput
            this.classLocation()
          } else {
          }
        } else {
          console.log('QR Reader returned blank string')
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
        } catch (error) {
          if (error.name === 'NotAllowedError') {
            // user denied camera access permisson
            this.QRerror = '尚未允許相機存取權限' /* Camera Access Denied */
          } else if (error.name === 'NotFoundError') {
            // no suitable camera device installed
            this.QRerror = '找不到合適的相機裝置' /* Camera Not Found */
          } else if (error.name === 'NotSupportedError') {
            // page is not served over HTTPS (or localhost)
            this.QRerror = '沒有掃QR的功能' /* QR Not Supported */
          } else if (error.name === 'NotReadableError') {
            // maybe camera is already in use
            this.QRerror = '其他應用程式正在使用相機' /* Camera Currently Being Used By Other Application */
          } else if (error.name === 'OverconstrainedError') {
            // passed constraints don't match any camera. Did you requested the front camera although there is none?
            this.QRerror = '檢查是否正確使用相機裝置' /* Camera Not Found */
          } else {
            // browser is probably lacking features (WebRTC, Canvas)
            this.QRerror = '您的瀏覽器沒有掃QR的功能' /* QR Scanner Not Supported By Your Browser */
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
