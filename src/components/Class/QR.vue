<template>
  <v-layout row justify-center >
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition"> <!--TODO Trying to get QR code to have a closable box and display loading indicator until camera renders-->
      <v-btn slot="activator" color="primary" dark @click="runQR" >Open Dialog</v-btn> <!--TODO Resolve issue where the QR code does not rescan a code that has been scanned once-->
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
</template>

<script>
  import { db } from '../../main'
  export default {
    data () {
      return {
        paused: false,
        content: '',
        activateQR: false,
        dialog: false,
        loading: true
      }
    },

    methods: {
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
  .scanDialog {
    background-color: #FFF;
    min-width: 100%;
    min-height: 100%;
  }
</style>
