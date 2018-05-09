<template>
  <v-layout row justify-center >
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition"> <!--TODO Trying to get QR code to have a closable box and display loading indicator until camera renders-->
      <v-btn slot="activator" color="primary" dark @click="runQR" >Open Dialog</v-btn>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false" @click="stopQR">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
          <v-card>
          <qrcode-reader v-if="activateQR" @init="onInit" @decode="onDecode"></qrcode-reader>
          </v-card>
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
          this.onDecode = ''
        }
      },
      runQR () {
        this.activateQR = true
      },
      stopQR () {
        this.activateQR = false
      },
      onInit () {
        this.loading = false
        console.log('I have initialized')
      }

    },
    computed: {
      user () {
        return this.$store.getters['user/user']
      }
    }
  }
</script>
