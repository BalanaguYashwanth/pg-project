<template>
  <div>
      {{modifiedprofile()}}
     <slot name="customer" > </slot>
    <div v-if="this.$store.state.photourl" style="text-align:right" >  
      <router-link  to="/customerprofile">
      <img  id="profile" :src=this.$store.state.photourl class="img-centered" style="height:auto; width:60px" alt="">
      </router-link>
    </div>
    
   
    <div v-else style="text-align:right" >  
      <router-link  to="/ownerprofile">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ54iLC-JopSr54OnaoTHcMculZnCMyweBC9w&usqp=CAU"  style="height:auto; width:60px" alt="">
      </router-link>
    </div>
    
    <button style="float: right" class="btn btn-secondary" v-on:click="logout">
      signout
    </button>
    <div class="container">
        <p style="text-align:center"  class="display-2 mx-auto"> Remainders  </p>
      <form>
        

        <div v-for="(all, index) in alldata" v-bind:key="index">

          <div class="card mx-auto m-5" style="width: 35rem">
            <img :src="all.img"  class="card-img-top rounded" alt="nature" />
            <div class="card-body">
              <p class="card-text">
                {{ all.text }}
              </p>
            </div>
          </div>

        </div>


      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { fb } from "../firebase";
export default {
  data() {
    return {
      alldata: [],
      textdata: '',
      image: "",
      selectfile: "",
      info: "",
      uploadValue: "",
      imageurl: null,
      email:'',
      uid:'',
      pgname:'',
      username:'',
      userpg:'',
    };
  },

  methods: {

    logout:function(){
      let self=this
      console.log(fb.auth().signOut())
      
      fb.auth().signOut()
      .then(() => {
        alert('sucessfully logout')
        self.$router.push('/customerlogin')        
        })
      .catch( err => alert(err.message) )
      localStorage.removeItem('uid')
    },


    onfileselect: function (event) {
      this.selectfile = event.target.files[0];
      // this.imageurl=this.fileurl()
    },


    modifiedprofile: function () {
        let mainprofile=[]
        mainprofile= this.$store.state.mainuserprofile
        for(let obj in  mainprofile)
        {
          if(mainprofile[obj].userid == localStorage.getItem('uid'))
          {
            this.userpg=mainprofile[obj].pg_name
          }
          
        }
    },

    deleting: function (id) {
      alert("deleting the post");
      axios
        .delete("http://127.0.0.1:5000/delete/posts" + id)
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => console.log(err.response.delete));
    },
  },


  async created() {

    await this.$store.dispatch('getuseraction')
    await this.$store.dispatch('profileaction')

   fb.auth().onAuthStateChanged(function(user){
      if(user)
      {
        var email= user.email;
      }
      console.log('email',email)
    })

    if(localStorage.getItem('uid'))
    {
     await axios
      .get("http://127.0.0.1:5000/get/posts")
      .then((res) => {
        var data = res.data;
         var blogs=[]
        for(let key in data)
        { 
          data[key].id=key
          blogs.push(data[key])
        }

      for(let obj in blogs)
      {
        if(blogs[obj].pgname == this.userpg)
        {
          this.alldata.push(blogs[obj])
        }
      }       

      })
      .catch((err) => console.log(err.response.data));
    }else{
      console.log('user not  authenticated')
    }
     

  },
};
</script>


<style>
textarea {
  height: auto;
}

#profile{
  width: 200px;
  border-radius: 50%; 
}

</style>

