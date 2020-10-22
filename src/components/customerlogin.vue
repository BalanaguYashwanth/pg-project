<template>

  <div id="login">
  <div class="container">
  
      <FlashMessage :position="'right top'"/>

    <form>
      <div>
        <div class="title display-3"  id="title">Customer Login</div>
        <div class="form-group">
          
          <input
            type="email"
            class="form-control"
            placeholder="enter your email"
            v-model="email"
          />
        </div>

        <div class="form-group">
          
          <input
            type="password"
            class="form-control"
            placeholder="enter your password"
            v-model="password"
          />
        </div>
      </div>
      <button class="btn btn-block"  v-on:click.prevent="posting">submit</button>
      <router-link  style="float:right" to="/resetpassword"> forgot password ? </router-link>
    </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
//import { fb } from "../firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    posting: function () {
      axios.post('http://127.0.0.1:5000/csignin',{
        email:this.email,
        password:this.password
      })
      .then(res=>{
        console.log(res)
        localStorage.setItem('localid',res.data.localId)
        localStorage.setItem('idtoken',res.data.idToken)
          this.$router.push('cremainder');
          location.reload()
          location.reload()
      })
      .catch(err=>{
        console.log(err.response)
        
        this.flashMessage.setStrategy('single');
        this.flashMessage.error({
        message: err.response.data.message,
        time: 3000,
        blockClass: 'custom-block-class'
        });
        
        
        })
    },

  },

};

</script>

<style src='../assets/css/login.css' scoped> </style>
