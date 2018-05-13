<template>
  <div>

    <template v-if="loading" >
      <v-container fill-height>
        <v-layout row justify-center align-center fill-height>
          <v-progress-circular indeterminate :size="50" :width="5" color="green"></v-progress-circular>
        </v-layout>
      </v-container>
    </template>

    <template v-if="alert">
      <v-layout row justify-center>
        <v-dialog v-model="alert" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Welcome!</v-card-title>
            <v-card-text>Looks like you haven't checked into a class before, just tap the button below to get started.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="alert = false" route to="checkIn">Check into Class</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

<template v-if="alert2">
  <v-layout row justify-center wrap>
    <v-flex xs12>
  <v-alert v-model="alert2" type="error">
    "{{searchString}}" not found. Please check your spelling and try again.
  </v-alert>
    </v-flex>
    <v-flex xs12 class="text-xs-center"">
  <v-btn medium route to="checkIn" color="secondary">Check in to class</v-btn>
    </v-flex>
  </v-layout>
</template>



<template v-if="pageLoad !== false">
    <template>
  <v-toolbar dark flat extended extension-height="140" class="primary" height="0"> <!--TODO Set height of toolbar to 0px-->
    <v-layout row slot="extension" >
      <v-flex xs5 class="classinfo px-4">
        <v-avatar
          size="100"
          color="grey lighten-4"
          style="vertical-align:middle"
          class="elevation-{24}"
        >
          <img :src="QR.teacherPic"  alt="avatar">
        </v-avatar>
        <h4>{{ QR.teacherName }}</h4>
      </v-flex>
      <v-flex class="classinfo" xs7>
        <h2>{{ QR.classLocation }} {{ QR.classLevel }}</h2>
        <h3>{{ QR.classTime }}</h3>
      </v-flex>
    </v-layout>
  </v-toolbar>
    <v-layout row>
    <v-flex xs12 class="text-xs-center ">
      <v-btn block class="check-in ma-0" large route to="checkIn" color="secondary">Check in to class</v-btn>
    </v-flex>
    </v-layout>
    <v-list two-line> <!--TODO Restrict amount of homework that that can be loaded and load by newest first-->
      <v-subheader>Homework</v-subheader>
      <template v-for="(homework, index) in homework">
        <v-list-tile
          :key="homework.homeworkDate"
          avatar
          ripple
          @click="indicate(index)"
        >
          <v-list-tile-content>
            <v-list-tile-title class="text--primary">{{homework.homeworkDate}}</v-list-tile-title>
            <v-list-tile-sub-title>{{homework.description}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text></v-list-tile-action-text> <!-- hovers above mailbox icon, might want to add a feature in the future with this-->
            <v-icon
              color="grey lighten-1"
            >local_post_office</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
      </template>
    </v-list>
 </template>

      <v-layout row justify-center>
        <v-dialog v-model="dialog"  max-width="290">
          <v-card>
            <v-card-title class="headline">{{message.homeworkDate}}</v-card-title>
            <v-card-text>{{message.description}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click.native="dialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" flat :loading="loading3" :disabled="loading3" @click.native="loading3 = true" :href="this.message.homeworkURL"
              >Open</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <!--<v-btn @click="test" color="primary" dark>Open Dialog</v-btn>  -->
  </div>

</template>

<script>
  import { db } from '../../main'

  export default {

    data () {
      return {
        paused: false,
        content: '',
        QR: [],
        homework: [],
        classLocation: [],
        test1: [],
        message: [],
        loading: true,
        alert: false,
        alert2: false,
        pageLoad: false,
        dialog: false,
        loading3: false,
        searchString: ''
      }
    },
    created () {
      this.firestore2()
    },
    firestore () {
      return {
        classLocation: db.collection('Users').doc(this.user.email)
      }
    },
    methods: {
      test () {
        console.log(this.message)
      },
      indicate (index) {
        console.log(index)
        this.dialog = true
        this.message = this.homework[index]
        console.log(this.message.title)
      },
      firestore2 () {
        db.collection('Users').doc(this.user.email).get().then(doc => {
          if (doc.exists) {
            var userInfo = doc.data()
            console.log(userInfo.location)
            this.searchString = userInfo.location
            let originalString = userInfo.location
            const splitString = originalString.split(' ') // TODO FINISH WRITING THIS CODE split location to search firebase
            console.log(splitString + 'This is the classPage')
            db.collection('QR').doc(userInfo.location).get().then(doc => {
              if (doc.exists) {
                var classDetails = doc.data()
                this.QR = classDetails
                db.collection('QR').doc(userInfo.location).collection('homework').get().then((snap) => { /* Must be converted to objects */
                  const items = snap.docs.reduce((res, item) => (
                    {...res, [item.id]: item.data()}),
                  {})
                  this.homework = items
                  this.pageLoad = true
                  this.loading = false
                })
              } else {
                console.log('error 2') /* todo add error message dialog for user */
                this.loading = false
                this.alert2 = true
              }
            })
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document! user has no location saved in their user document. error 1')
            this.alert = true
            this.loading = false
          }
        })
      }
    },
    computed: {
      user () {
        return this.$store.getters['user/user']
      }
    }
  }
</script>

<!--<style>
  #homeworkBox {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 6px;
    padding-right: 6px;
  },
  #Absolute-Center {
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }
</style>-->
<style scoped>
  .check-in {
    margin-top: 10px;
  }
  h4 {
    margin: auto 0;
    text-align: center;
    color: #fff;
    font-weight: 400
  },
  .classinfo {
    align-items: center;
    justify-content: center;
  }
</style>
