<template>
  <div class="container">
    <div class="title display-2">admin registration</div>
    <form>
      <div>
        <div class="form-group">
          <label> Email </label>
          <input
            type="email"
            class="form-control"
            placeholder="enter your email"
            v-model="email"
          />
        </div>

        <div class="form-group">
          <label> Password </label>
          <input
            type="password"
            class="form-control"
            placeholder="enter your name"
            v-model="password"
          />
        </div>
      </div>
      <button class="btn btn-secondary" v-on:click.prevent="posting">submit</button>
    </form>
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
       
      axios.post('http://127.0.0.1:5000/asignup',{
        email:this.email,
        password:this.password
      })
      .then(res=>{
        console.log(res)
        this.$router.push('adminlogin')
        })
      .catch(err=>console.log(err))

    },
  },
};
</script>

<style scoped >
.title {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-left: auto;
  color: #2c3e50;
  margin-top: 200px;
  text-transform: capitalize;
}

.container {
  text-transform: capitalize;
}
</style>