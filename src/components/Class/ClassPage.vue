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
            <v-card-title class="headline">{{user.displayName}}歡迎！</v-card-title> <!--welcome!-->
            <v-card-text>看起來您似乎尚未註冊，請點選下方來繼續。</v-card-text> <!--Looks like you haven't checked into a class before, just tap the button below to get started.-->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="alert = false" route to="checkIn">註冊</v-btn> <!--Check into Class-->
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
    <v-flex xs12 class="text-xs-center">
  <v-btn medium route to="checkIn" color="secondary">Check in to class</v-btn>
    </v-flex>
  </v-layout>
</template>



<template v-if="pageLoad !== false">
    <template>
  <v-toolbar dark flat extended extension-height="140" class="primary" height="0">
    <v-layout row slot="extension" >
      <v-flex xs5 class="classinfo px-4 text-xs-center text-lg-center ">
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
        <h2>{{ QR.classLocation }}  {{ QR.classLevel }}</h2>
        <h3>{{ QR.classTime }}</h3>
      </v-flex>
    </v-layout>
  </v-toolbar>
    <v-layout row>
      <v-flex xs12 class="text-xs-center ">
        <v-btn block class="check-in ma-0" large route to="checkIn" color="secondary">報到</v-btn> <!--Check Into Class-->
      </v-flex>
      </v-layout>
      <v-list> <!--TODO Restrict amount of homework that that can be loaded and load by newest first-->
        <v-subheader >回家功課</v-subheader> <!--Homework-->
      <v-divider></v-divider>
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
      <div v-if="alert3">
      <v-alert  @click="dialog2 = true" :value="true" type="warning" class="text-xs-center ma-0">
        請提供您的電話號碼或是Line ID，讓您的老師能夠與您聯絡。
       <!-- Please provide your phone number or Line ID, so your teacher can contact you individually.-->
          <!--<v-btn @click="checkContactInfo" color="primary" dark>Open Dialog</v-btn>-->
      </v-alert>
      <v-btn @click="dialog2 = true" color="warning" class="ma-0" block><v-icon>create</v-icon></v-btn>
      </div>
 </template>

      <v-layout row justify-center>
        <v-dialog v-model="dialog"  max-width="290">
          <v-card>
            <v-card-title class="headline">{{message.homeworkDate}}</v-card-title>
            <v-card-text>{{message.description}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click.native="dialog = false">取消</v-btn> <!--Cancel-->
              <v-btn color="green darken-1" flat :loading="loading3" :disabled="loading3" @click.native="loading3 = true" :href="this.message.homeworkURL"
              >開啟</v-btn> <!--Open-->
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialog2" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline"> 聯絡資料</span> <!--Contact Info-->
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-form v-model="valid" ref="form">
                  <v-flex>
                    <v-text-field
                      name="input-1-1"
                      :rules="nameRules"
                      label="電話號碼" hint=""
                      single-line
                      prepend-icon="phone"
                      v-model="phoneNumber"
                      required
                    ></v-text-field> <!--Phone Number-->
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name="email"
                      label="LINE ID" hint=""
                      single-line
                      prepend-icon="local_post_office"
                      v-model="lineID"
                    ></v-text-field>
                  </v-flex>
                  </v-form>
                </v-layout>
              </v-container>
              <small>*必填</small> <!--indicates required field-->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="dialog2 = false">取消</v-btn> <!--Cancel-->
              <v-btn color="green darken-1" flat @click="firestore2">儲存</v-btn> <!--Submit-->
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-snackbar
        :timeout="6000"
        :bottom="true"
        :multi-line="true"
        v-model="snackbar"
      >
        聯絡資料已成功接收
        <v-btn flat color="pink" @click.native="snackbar = false">關閉</v-btn> <!--Contact info succesfully registered--> <!--close-->
      </v-snackbar>

      <v-snackbar
        :timeout="6000"
        :bottom="true"
        :multi-line="true"
        v-model="succesfulCheckin"
      >
      成功報到
        <v-btn flat color="pink" @click.native="snackbar2 = false">關閉</v-btn> <!--Class Checkin Succesful--> <!--close-->
      </v-snackbar>

    </template>
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
        message: [],
        loading: true,
        alert: false,
        alert2: false,
        alert3: true,
        pageLoad: false,
        dialog: false,
        dialog2: false,
        loading3: false,
        searchString: '',
        userContactInfo: {},
        phoneNumber: '',
        lineID: '',
        snackbar: false,
        snackbar2: false,
        email: '',
        nameRules: [
          v => !!v || '電話號碼必填', /* Phone number is required */
          v => v.length >= 10 || '電話號碼必填' /* Phone number is required */
        ],
        valid: false
      }
    },
    created () {
      this.firestore()
    },
    methods: {
      indicate (index) {
        console.log(index)
        this.dialog = true
        this.message = this.homework[index]
        console.log(this.message.title)
      },
      firestore () {
        db.collection('Users').doc(this.user.uid).get().then(doc => {
          if (doc.exists) {
            var userInfo = doc.data()
            console.log(userInfo.location)
            this.searchString = userInfo.location
            let classArea = userInfo.location.slice(0, -3) /* Slices everything but the last 3 characters away */
            let classLevel = userInfo.location.substr(-3) /* Displays the class level (the last 3 Chinese characters in the string) */
            this.userContactInfo = userInfo
            this.checkContactInfo()
            /* /English_Units/Xizhi/Class Level/underwater knitting/classRole/06-22-2018/students */
            db.collection('English_Units').doc(classArea).collection('Class Level').doc(classLevel).get().then(doc => { /* TODO CHANGE THIS CODE BACK take out the mult split string */
              if (doc.exists) {
                var classDetails = doc.data()
                this.QR = classDetails
                db.collection('English_Units').doc(classArea).collection('Class Level').doc(classLevel).collection('homework').orderBy('homework_timestamp', 'desc').limit(4).get().then((snap) => { /* TODO CHANGE THIS CODE BACK take out the mult split string */ // The homework is orderedBy newest to oldest and only shows the latest 5 assignemnts *.limit()*
                  const items = snap.docs.reduce((res, item) => (/* Homework info returned from Firestore must be modified using this function  */
                    {...res, [item.id]: item.data()}),
                  {})
                  this.homework = items
                  this.pageLoad = true
                  this.loading = false
                })
              } else {
                console.log('error 2')
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
      },
      firestore2 () {
        this.$refs.form.validate()
        if (this.valid) {
          db.collection('Users').doc(this.user.uid).set({
            phoneNumber: this.phoneNumber,
            lineID: this.lineID
          }, {merge: true})
          this.alert3 = false
          this.dialog2 = false
          this.snackbar = true
        } else {
          console.log('Not validated')
        }
      },
      checkContactInfo () {
        if ('phoneNumber' in this.userContactInfo || 'lineID' in this.userContactInfo) {
          this.alert3 = false
          console.log('Phone number or Line ID IS stored')
        } else {
          console.log('No phone number or Line ID stored')
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters['user/user']
      },
      succesfulCheckin () {
        return this.$store.state.snackbar2
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
