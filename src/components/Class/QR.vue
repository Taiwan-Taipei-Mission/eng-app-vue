<template>
  <div>
    <p> The QR Scanner</p>
    <qrcode-reader @decode="onDecode" :paused="paused"></qrcode-reader>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        paused: false,
        content: ''
      }
    },

    methods: {
      onDecode (content) {
        this.paused = true
        alert(content)
        this.$router.push('classpage')
      }
    }
  }
</script>
