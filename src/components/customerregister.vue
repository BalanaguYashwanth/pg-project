<template>
  <div id="login">
  <div class="container">
    <FlashMessage :position="'right top'"/>
    <div class="title display-3"  id="title">Customer Register</div>
    <form>
      <div>
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
      <button class="btn btn-block" v-on:click.prevent="posting">submit</button>
    </form>
  </div>
  </div>  
</template>

<script>
import axios from 'axios'
//import {fb} from "../firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    posting: function () {

      if(this.password.length>=6 && this.password!="")
      {
      axios.post('http://127.0.0.1:5000/csignup',{
        email:this.email,
        password:this.password
      })
      .then(res=>{

        console.log(res)
        this.flashMessage.setStrategy('single');
        this.flashMessage.success({
        message: res.data.message,
        time: 5000,
        blockClass: 'custom-block-class'
        });

        setTimeout(this.$router.push('customerlogin'),3000)
        
        })
      .catch(err=>{
        console.log(err.response)
        
        this.flashMessage.setStrategy('single');
        this.flashMessage.error({
        message: err.response.data.message,
        time: 3000,
        blockClass: 'custom-block-class'
        })
        })
      }
      else{
           
        this.flashMessage.setStrategy('single');
        this.flashMessage.error({
        message: 'password must be more than 6 characters',
        time: 3000,
        blockClass: 'custom-block-class'
        })
      }

    },
  },
};
</script>

<style src='../assets/css/login.css' scoped> </style>
