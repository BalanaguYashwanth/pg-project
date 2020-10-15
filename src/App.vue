<template>
  <div id="app" ref="app">
    <router-view>
      <div slot="title">
        <slider
          :width="300"
          :links="[
            { id: 1, text: 'Home', url: 'http://localhost:8080/pgowner' },
            { id: 2, text: 'Owner Profile', url: 'http://localhost:8080/ownerprofile' },
            { id: 3, text: 'Owner desk', url: 'http://localhost:8080/ownerdesk' },
            { id: 4, text: 'Customer Food ', url: 'http://localhost:8080/foodhistory' },
            { id: 5, text: 'Customer Schedules', url: 'http://localhost:8080/ownerschedule' },
            { id: 6, text: 'Customer Registrations', url: 'http://localhost:8080/ownerdeskdetails' },
          ]"
          format="push"
          direction="left"
          :opacity="0.15"
        ></slider>
      </div>

       <div slot="customer">
        <slider
          :width="300"
          :links="[
            { id: 1, text: 'Home', url: 'http://localhost:8080/cremainder' },
            { id: 2, text: 'Customer Profile', url: 'http://localhost:8080/customerprofile' },
            { id: 3, text: 'Schedule Your Food', url: 'http://localhost:8080/schedulefood' },
            { id: 4, text: 'Food History', url: 'http://localhost:8080/cfoodhistory' },
            { id: 5, text: 'Other Schedules', url: 'http://localhost:8080/schedules' },
            { id: 6, text: 'Schedules History', url:'http://localhost:8080/reviewschedules'},
            { id: 7, text: 'Payments', url: '#' },
          ]"
          format="push"
          direction="left"
          :opacity="0.15"
        ></slider>
      </div>
    </router-view>
  </div>
</template>

<script>
import Slider from "@jeremyhamm/vue-slider";
export default {
  name: "App",
  components: {
    slider: Slider,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-left: auto;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

