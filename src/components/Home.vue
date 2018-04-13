<template>
  <div>
    <v-container fill-height>
      <v-layout row wrap>
        <v-flex class="text-xs-center">
          <h1>Class Check-in</h1>
          <v-btn large route to ="/QR" class="secondary">
            Scan QR Code
            <v-icon right  >photo_camera</v-icon></v-btn>
          <h2>or</h2>
          <v-text-field
            name="input-3"
            label="Enter Class Code"
            value=""
          ></v-text-field>
          <v-btn large class="secondary" route to="ClassPage">Submit</v-btn> <!--TODO Add 'disable' class to this button-->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
