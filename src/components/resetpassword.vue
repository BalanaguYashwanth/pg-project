<template>
  <div class="container">
    <div class="title display-3">Enter Your email Id</div>
      <FlashMessage :position="'right top'"/>

    <form>
      <div>
        <div class="form-group">
          <label> Email </label>
          <input
            type="email"
            class="form-control"
            placeholder="enter your valid email to reset your password"
            v-model="email"
          />
        </div>

     
      </div>
      <button  id="button" class=" col-md-4 mx-auto d-block btn btn-secondary" v-on:click.prevent="posting">submit</button>
     
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      email: "",
    };
  },

  methods: {
    posting: function () {
      axios.post('http://127.0.0.1:5000/resetpassword',{
        email:this.email,
      })
      .then(res=>{
        console.log(res)
         this.flashMessage.setStrategy('single');
        this.flashMessage.error({
        message: 'successfully reset once check your mail',
        time: 3000,
        blockClass: 'custom-block-class'
        });
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