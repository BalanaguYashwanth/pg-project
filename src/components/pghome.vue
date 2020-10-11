<template>
  <div>
    <div id="btns">
      <button  v-on:click="logout"  v-if="valid" class="btn btn-secondary">Hey, {{this.bookedname}} logout  </button>
    </div>
    <div class="container">
      <h1 id="title" class="display-3"> Home </h1>

      <div v-for="(detail,index) in alldetails" v-bind:key="index">
        <div class="card mb-3 mx-auto" style="width: 30em;">
          <img
            class=" my-3 mb-3 mx-auto"
            height="auto"
            :src="detail.pgimage"
            alt="profile pic"
            style=" border: 5px solid black;"
          />
          <div class="card-body mx-auto">
            <h5 class="card-title">Name:{{detail.name}}</h5>
            <h5 class="card-title">phonenumber:{{detail.phonenumber}}</h5>
            <h5 class="card-title">landmark:{{detail.landmark}}</h5>
           
            <h5 class="card-title">address:{{detail.address}} </h5>
            <h5 class="card-title">city:{{detail.city}}</h5>
            <h5 class="card-title">pincode:{{detail.pincode}}</h5>
           
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      alldetails: "",
      bookedname: "",
      bookedphonenumber: "",
      valid:localStorage.getItem('user-token'),
    };
  },

  method:function(){
    
    



  },

  created(){

      axios.get('http://127.0.0.1:5000/get/pgregisters')
      .then(res=>{
          console.log(res.data)
          this.alldetails=res.data
          })
      .catch(err=>console.log(err))


  }
 
};
</script>


<style scoped >
#title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 40px;
  margin-left: auto;
}
#btns {
  float: right;
}
.container {
  text-transform: uppercase;
  font-family: "Lucida Console", Courier, monospace;
}

img {
 float:center;
  width: 300px;
  border-radius: 10%;
}

.card {
    border: 5px solid grey;
}

.img{
    border: 5px solid black;
}
</style>