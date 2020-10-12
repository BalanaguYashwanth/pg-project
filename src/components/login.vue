<template>
  <div class="container">
    <div class="title display-2">Owner Login</div>
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
            placeholder="enter your password"
            v-model="password"
          />
        </div>
      </div>
      <button class="btn btn-secondary" v-on:click.prevent="posting">submit</button>
    </form>
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
      //  let  self = this
      // fb.auth()
      //   .signInWithEmailAndPassword(this.email, this.password)
      //   .then(
      //     function () {
      //       self.$router.push('ownerprofile');
      //       location.reload()
      //       location.reload()
      //     },
      //     function (err) {
      //       alert(err.message);
      //     }
      //   );


      axios.post('http://127.0.0.1:5000/signin',{
        email:this.email,
        password:this.password
      })
      .then(res=>{
        console.log(res)
        localStorage.setItem('localid',res.data.localId)
        localStorage.setItem('idtoken',res.data.idToken)
          this.$router.push('ownerprofile');
          location.reload()
          location.reload()
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