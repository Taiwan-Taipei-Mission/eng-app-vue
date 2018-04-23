<template>
  <div>
    <qrcode-reader @decode="onDecode"></qrcode-reader>
  </div>
</template>
Xinzhuang Advanced
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
          this.$store.dispatch('classLocation', content)
          this.$router.push('classpage')
        } else {
          this.onDecode = ''
        }
      }
    }
  }
</script>
