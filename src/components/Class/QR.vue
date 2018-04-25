<template>
  <div>
    <qrcode-reader @decode="onDecode"></qrcode-reader>
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
          this.$store.dispatch('classLocation', content.toLowerCase())
          this.$router.push('classpage')
        } else {
          this.onDecode = ''
        }
      }
    }
  }
</script>
