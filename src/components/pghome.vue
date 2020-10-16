<template>
  <div>
    
    <div id="btns">
      <button  v-on:click="logout" v-show="this.$store.state.admin "  class="btn btn-secondary"> logout  </button>
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
          <div class="card-body mx-3">
            <h5 class="card-title">Name:{{detail.name}}</h5>
            <h5 class="card-title">phonenumber:{{detail.phonenumber}}</h5>
            <h5 class="card-title">landmark:{{detail.landmark}}</h5>
           
            <h5 class="card-title">address:{{detail.address}} </h5>
            <h5 class="card-title">location:{{detail.city}}</h5>
            <h5 class="card-title">pincode:{{detail.pincode}} </h5>
            <div v-show="authadmin()" >
              <h5  class="card-title">  <button v-on:click=deleting(detail.id)  class="btn btn-secondary" > delete </button> </h5>
            </div>
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
    
    logout:function(){
      this.$router.push("/adminlogin");
      localStorage.removeItem("localid");
      localStorage.removeItem("idtoken");
      localStorage.removeItem("id");
    },

    deleting:function(id){
      axios.delete('http://127.0.0.1:5000/delete/pgregisters/'+id)
      .then(res=>{
        console.log(res)
        location.reload()
        })
      .catch(err=>console.log(err))
    }

  },


async created(){
    await this.$store.dispatch('getuseraction')

    axios.get('http://127.0.0.1:5000/get/pgregisters')
    .then(res=>{
        console.log(res.data)

        let datas=res.data

        for(let obj in datas)
        {
          datas[obj].id=obj
        }
        this.alldetails=datas

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