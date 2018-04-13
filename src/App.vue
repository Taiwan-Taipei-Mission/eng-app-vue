<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" fixed>
    <v-list>
      <v-list-tile v-for="item in menuItems" :key="item.title">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>{{ item. title }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
      <v-toolbar dark class="primary">
        <v-toolbar-side-icon @click="sideNav =!sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Welcome</v-toolbar-title>
              <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
               <v-btn flat v-for="item in menuItems" :key="item.title">
          <v-icon left dark>{{ item.icon }}</v-icon>
                 {{ item.title }}
               </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        { icon: 'home', title: 'My Class' },
        { icon: 'location_on', title: 'Find My Class' },
        { icon: 'settings', title: 'Settings' },
        { icon: 'help', title: 'Help' },
        { icon: 'face', title: 'Sign up' },
        { icon: 'lock_open', title: 'Sign in' }
      ]
    }
  },
  name: 'App'
}
</script>
