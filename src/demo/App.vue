<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { BaseModel } from '../lib/index'

@Component
export default class App extends Vue {
  created () {
    console.log(BaseModel)
  }
}

</script>

<style lang="scss">
</style>
