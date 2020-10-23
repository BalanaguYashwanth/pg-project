<template>
<div id="login" >
  <div class="container" >
   
    <FlashMessage :position="'right top'"/>

    <form>
      <div >  
         <div class="  title  display-3"    id="title">Owner Login</div>
        <div class="form-group  ">
          
          <input
            type="email"
            class="form-control"
            placeholder="enter your email"
            v-model="email"
          />
        </div>

        <div class="form-group ">
        
          <input
            type="password"
            class="form-control"
            placeholder="enter your password"
            v-model="password"
          />
        </div>
      </div>
      <button class="btn   btn-block"    v-on:click.prevent="posting">submit</button>
      <router-link  style="float:right" to="/resetpassword"> forgot password ? </router-link>

    </form>
  </div>
  </div>
</template>

<script>
//import { fb } from "../firebase";
import axios from 'axios'
export default {
  data() {
    return {
      email: "",
      password: "",
   
  };
  },

  methods: {

    posting: function () {
    
     
      axios.post('http://127.0.0.1:5000/signin',{
        email:this.email,
        password:this.password
      })
      .then(res=>{
        console.log(res)
        localStorage.setItem('localid',res.data.localId)
        localStorage.setItem('idtoken',res.data.idToken)
          this.$router.push('pgowner');
          location.reload()
          location.reload()
      })
      .catch(err=>{
        console.log(err.response.data)
        
          this.flashMessage.setStrategy('single');
          this.flashMessage.error({
          message: err.response.data,
          time: 3000,
          blockClass: 'custom-block-class'
          });
          console.log('please enter valid data')


        })

    },

  },
};
</script>

<style  src='../assets/css/login.css' scoped> </style>
