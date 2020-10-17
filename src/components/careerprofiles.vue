<template>
  <div>
    <div v-show="this.$store.state.admin" >
      <slot  name="admin" >   </slot>
    </div>
    
    
    <!-- <div id="btns">
      <button v-on:click="logout" v-show="this.$store.state.admin" class="btn btn-secondary"> logout  </button>
    </div> -->

    <div class="container">
      <h1 id="title" class="display-3"> Careers </h1>

      <div v-for="(detail,index) in alldetails" v-bind:key="index">
        <div class="card mb-3 mx-auto" style="width: 30em;">
          <img
            class=" my-3 mb-3 mx-auto"
            height="auto"
            :src="detail.profile"
            alt="profile pic"
            style=" border: 5px solid black;"
          />
          <div class="card-body mx-auto">
            <h5 class="card-title">Name:{{detail.name}}</h5>
            <h5 class="card-title">phonenumber:{{detail.phonenumber}}</h5>
            <h5 class="card-title">email:{{detail.email}}</h5>
           
            <h5 class="card-title">age:{{detail.age}} </h5>
            <h5 class="card-title">city:{{detail.city}}</h5>
            <h5 class="card-title">Gender:{{detail.gender}}</h5>
            <h5 class="card-title" > <button v-show="authadmin()"  class="btn btn-secondary" v-on:click=deleting(detail.id) > delete  </button>  </h5>
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
    
    };
  },

  methods:{
    authadmin:function(){
      return this.$store.state.admin
    },

    deleting:function(id){
       axios.delete('http://127.0.0.1:5000/delete/careers/'+id)
      .then(res=>{
        console.log(res)
        location.reload()
        })
      .catch(err=>console.log(err))
    },
    
    logout:function(){
      this.$router.push("/adminlogin");
      localStorage.removeItem("localid");
      localStorage.removeItem("idtoken");
      localStorage.removeItem("id");
    },
    
  },
  

  
  created(){
      axios.get('http://127.0.0.1:5000/get/careers')
      .then(res=>{
          let resdata=res.data
          for(let key in resdata)
          {
            resdata[key].id=key
          }
          this.alldetails=resdata
          })
      .catch(err=>console.log(err))

      this.$store.dispatch('getuseraction')


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
  border-radius: 50%;
}

.card {
    border: 5px solid grey;
}

.img{
    border: 5px solid black;
}
</style>