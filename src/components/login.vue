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
import { fb } from "../firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {

    posting: function () {
       let  self = this
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          function () {
            alert("successfully loggedIn");
            self.$router.push('pgowner');
          },
          function (err) {
            alert(err.message);
          }
        );
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