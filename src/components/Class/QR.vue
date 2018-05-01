<template>
  <div>
    <qrcode-reader @decode="onDecode"></qrcode-reader>
  </div>
</template>

<script>
  import { db } from '../../main'
  export default {
    data () {
      return {
        paused: false,
        content: ''
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
      }
    },
    computed: {
      user () {
        return this.$store.getters['user/user']
      }
    }
  }
</script>
