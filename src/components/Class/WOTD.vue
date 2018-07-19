<!--TODO Change the source of the background image to something that is hand selected by us-->
<!--TODO Either take off the link or link it an additional website that contails info on the Word of the Day-->
<!--TODO Make the CSS on the picture background reactive and adjust to the size of the screen-->

<template>
  <div id="inspire">
<!--<v-btn @click="test">Test</v-btn>-->
    <div id="date" class="font shadedbg">
      {{ this.displayDateVal }}
      {{ this.today }} <!--TODO remove this after testing-->
    </div>
    <!--<p id="favorites" class="shadedbg">favorites</p>
    <div id="fave-panel"></div>-->
    <div id="all" class="font centered shadedbg">
      <a id="link" href="#" target="_blank"><div id="word">{{ this.WOTD.englishWord }}</div></a>
      <div id="pronun">{{ this.WOTD.chineseWord }}</div>
      <div id="defin">{{ this.WOTD.englishSentence }}</div>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
  import { db } from '../../main'

  export default {
    data () {
      return {
        WOTD: {},
        displayDateVal: {},
        today: ''
      }
    },
    created () {
      this.test()
    },
    methods: {
      test () {
        this.displayDate()
        this.date()
        db.collection('wotd').doc(this.today).get().then(doc => {
          if (doc.exists) {
            this.WOTD = doc.data()
          } else {
            console.log('Error: WOTD Doc not found in firestore')
          }
        })
      },
      displayDate () {
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        var date = new Date()
        var day = date.getDate()
        var monthIndex = date.getMonth()
        var year = date.getFullYear()
        var marker
        if (day === 1 || day === 21) {
          marker = 'st'
        } else if (day === 2 || day === 22) {
          marker = 'nd'
        } else if (day === 3 || day === 23) {
          marker = 'rd'
        } else {
          marker = 'th'
        }
        this.displayDateVal = monthNames[monthIndex] + ' ' + day + marker + ' ' + year
      },
      date () {
        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth() + 1 // January is 0!
        /* var yyyy = today.getFullYear() */

        /* if (dd < 10) {
          dd = '0' + dd
        }

        if (mm < 10) {
          mm = '0' + mm
        } */

        today = mm + '-' + dd /* + '-' + yyyy */
        this.today = today
        console.log(today)
      },
      placeImage (w, h) {
        w = window.screen.availWidth
        h = window.screen.availHeight

        document.body.innerHTML += '<img src=' + '"https://source.unsplash.com/collection/347929/' + w + 'x' + h + '"' + ' id="bg" alt="">'
      }
    }
  }
</script>

<style scoped>
   #inspire {
    background-image: url("https://source.unsplash.com/collection/347929/");
    position: absolute;
    min-width: 100%;
    min-height: 100%;
  }
   html {
     background-size: cover;
     background-repeat: no-repeat;
     overflow: hidden;
   }

   body {
     opacity: 0;
     font-family: 'Open Sans', sans-serif;
     -moz-transition: opacity 2s;
     -webkit-transition: opacity 2s;
     -o-transition: opacity 2s;
     transition: opacity 2s;
   }

   img {
     opacity: 0;
     -moz-transition: opacity 2s;
     -webkit-transition: opacity 2s;
     -o-transition: opacity 2s;
     transition: opacity 2s;
   }

   a, a:hover, a:active, a:visited {
     text-decoration: none !important;
     color: #fff !important;
   }

   .centered {
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }

   #bg {
     position: fixed;
     top: 0;
     left: 0;
     min-width: 100%;
     min-height: 100%;
     z-index: -1;
   }

   .fa {
     text-decoration: none;
     color: #fff;
   }

   .shadedbg {
     background: rgba(0,0,0,0.3);
     padding: 0px 20px;
   }

   #all p {
     padding: 0px 20px;
   }

   .font {
     text-align: center;
     color: #fff;
     font-weight: 400;
   }

   #date {
     font-size: 1.05em;
     line-height: 1.5em;
     width: 100%;
     height: 1.5em;
   }

   #word {
     font-size: 5em;
     /*text-shadow: 0px 0px 50px #777;*/
   }

   #defin {
     margin-top: 10px;
     font-size: 1.2em;
   }

   #pronun {
     font-family: "Open Sans", sans-serif;
     font-size: 2.0em;
   }

   .fa-heart-o {
     right: 0;
     position: absolute;
     margin-right: 5px;
     margin-top: 4px;
     z-index: 100;
   }

   #favorites {
     position: absolute;
     height: 2em;
     line-height: 2em;
     top: 0;
     right: 0;
     z-index: 100;
     color: white;
     font-size: 1.05em;
     background: rgba(0,0,0,0.15);
     cursor: pointer;
   }
   #favorites:active {
     background: rgba(0,0,0,0.3);
   }

   #fave-panel {
     z-index: 100;
     height: 100%;
     width: 100%;
     right: 0;
     position: absolute;
     background: rgba(0,0,0,0.5);
   }

   .hide {
     visibility: hidden;
   }
</style>
