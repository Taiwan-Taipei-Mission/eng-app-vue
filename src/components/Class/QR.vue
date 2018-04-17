<template>
  <div>
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
        if (confirm(content)) {
          this.$router.push('classpage')
        } else {
          this.onDecode = ''
        }
      }
    }
  }
</script>
