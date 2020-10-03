<template>
    <div>
      
     <button style="float: right" v-on:click="signout" class="btn btn-secondary">
         signout
    </button>
    
    {{getcurrentuser()}}
  <div class="container">
    <div class="title display-2">Customer Profile</div>
    <form>
        <div class="text-center m-3">
         
          <div v-if="this.$store.state.photourl">
            <img
            :src=this.$store.state.photourl
            id="img"
           
            alt="profile pic"
          />
          
          </div>
          
          <div v-else  >  
          <img
            src="https://info-ted.eu/wp-content/uploads/2019/12/profile-photo.png"
            class="rounded"
            alt="profile pic"
          />
          </div>

            <div v-if="this.$store.state.photourl">
              <button style="border:none;float:botton " v-on:click.prevent="deletephoto" > X </button>
            </div>
          
          
        </div>
        
      <div class="form-row" >
      
        <div class="form-group col-md-6 ">
          <label> username </label>
          <div v-if="this.$store.state.displayName" >  
          <input
          disabled
            type="text"
            class="form-control"
            placeholder="enter your username"
           :value='this.$store.state.displayName'
          />
          </div>
          <div v-else >
            <input
            type="text"
            class="form-control"
            placeholder="enter your username"
            v-model="username"
          />
          </div>
        </div>

        <div  class="form-group col-md-6"  >
            <label> Phone number </label>

            <div v-if="phonenumber1">
            <input
            disabled
            type="text"
            class="form-control"
            placeholder="enter your phone number"
            v-model="phonenumber1"
          />
            </div>

          <div v-else >  
          <input
            type="text"
            class="form-control"
            placeholder="enter your phone number"
            v-model="phonenumber"
          />
          </div>

        </div>
      </div>

        <div class="form-row" >
 
        <div class="form-group col-md-6 ">
          <label> email </label>
          <div v-if="this.$store.state.email" >  
          <input
            disabled
            type="text"
            class="form-control"
            placeholder="enter your email"
           :value="this.$store.state.email"
          />
          </div>
          
          <div v-else > 
            <input
            type="text"
            class="form-control"
            placeholder="enter your email"
            v-model="email"
          />
          </div>

          
           

        </div>


        <div class="form-group col-md-6 ">
          <label> select pg hostel  </label>
          <div  v-if="pgname1" >
          <input
            disabled
            type="text"
            class="form-control"
            placeholder="select the pg hostel"
            v-model="pgname1"
          />
          </div>
          <div v-else >  
            
          <input
            type="text"
            class="form-control"
            placeholder="select the pg hostel"
            v-model="pgname"
          />
           </div>
        </div>

      </div>
    
    <div class="form-row">  

         <div class="form-group col-md-6">
          <label> age  </label>
          
          <div v-if="age1" > 
            <input
            type="text"
            disabled
            class="form-control"
            placeholder="select the age"
            v-model="age1"
          />
          </div>
          <div v-else >  <input
            type="text"
            class="form-control"
            placeholder="select the age"
            v-model="age"
          /> </div>
         


        </div>

        <div class="form-group col-md-6">
          <label> select gender </label>
        
          <div  v-if="gender1" >  
           <select  class="custom-select" disabled  v-model="gender1">
                <option value="men"> Men </option>
                <option value="women"> Woman </option>
                <option value="other"> other </option>
            </select>
          </div>

          <div v-else > 
            <select  class="custom-select"  v-model="gender">
                <option value="men"> Men </option>
                <option value="women"> Woman </option>
                <option value="other"> other </option>
            </select>
          </div>
        </div>
    </div>

        <div  class="form-group">
        <label> Update your Profile  :-  </label>
          <input type="file" class="form-control-file"   @change="file" />
        </div>
        {{uploadValue}}

        <button id="submit" class="btn btn-secondary btn-md btn-block" v-on:click.prevent=posting(username) >   submit </button>
        <button id="submit" class="btn btn-secondary btn-md btn-block" v-on:click.prevent="deleting" >  delete </button>
     
    </form>
  </div>
  </div>
</template>

<script>
import {fb} from '../firebase';
import axios from 'axios'
export default {
  data() {
    return {
      username: "",
      phonenumber: "",
      phonenumber1: "",
      isAdmin:false,
      email:'',
      pgname:'',
      pgname1:'',
      imageurl:'',
      gender:'',
      age:'',
      gender1:'',
      age1:'',
      mainselectfile:'',
      uploadValue:'',
      allusers:'',
      pk_id:'',
    };
  },

  methods: {

    signout:function(){
      this.$store.dispatch('signout')
      this.$router.push('/customerlogin')
    },

    deletephoto:function(){
        
        var user = fb.auth().currentUser;
        user.updateProfile({       
        photoURL: null
        }).then(function() {
        console.log('deleted photo Successfully');
        });
    },

    deleting(){
      axios.delete('https://pg-app-fd8a7.firebaseio.com/user/'+ this.pk_id +'.json')
      .then(res=>{console.log(res)
      location.reload()
      })
      .catch(err=>console.log(err))
    },

    file:function(event){
      this.mainselectfile = event.target.files[0]
      //console.log(this.mainselectfile)
    },

      posting:function(username){

        if(this.$store.state.displayName)
        {
          username=this.$store.state.displayName
        }else{
          console.log("username is manually entered")
        }

      if(this.$store.state.displayName == null || this.$store.state.photourl == null )
      {
      var storageRef = fb.storage().ref("userprofile/" + this.mainselectfile.name);
      let uploadedTask = storageRef.put(this.mainselectfile);
      uploadedTask.on(
        "state_changed",
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function (err) {
          console.log(err);
        },

        function () {
          uploadedTask.snapshot.ref
            .getDownloadURL()
            .then(function (downloadURL) {
              console.log(downloadURL);

              
                var user=fb.auth().currentUser
                user.updateProfile({
                displayName:username,
                photoURL:downloadURL,
              }).then(()=>console.log('success'))
              .catch(err=>console.log(err))
               console.log('not restrict')
              

              
            });
        }
      );
      }else{
        console.log('not allow to post primary data')
      }

      if(this.$store.state.displayName)
      {
        this.username=this.$store.state.displayName
      }
        if( this.phonenumber1 == '' && this.pgname1 == '' && this.age1 == '' && this.gender1 == '')    
       {
          axios.post('https://pg-app-fd8a7.firebaseio.com/user.json',{
          userid:localStorage.getItem('uid'),
          username:this.username,
          email:this.$store.state.email,
          phonenumber:this.phonenumber,
          pg_name:this.pgname,
          age:this.age,
          gender:this.gender,
        })
        .then(res=>{
          console.log(res)
          
          })
        .catch(err=>console.log(err.reponse.data))
      }else{
        console.log('not enter to post secondary data')
      }

      },

      getcurrentuser: function(){
        let allusers=[]
         allusers= this.$store.state.mainuserprofile
        for(let key in allusers)
        {
            if( allusers[key].userid == localStorage.getItem('uid') )
            {
              this.phonenumber1=allusers[key].phonenumber
              this.pgname1=allusers[key].pg_name
              this.gender1=allusers[key].gender
              this.age1=allusers[key].age
              this.pk_id=allusers[key].id
            }
          
        }
      }

  },

  async created(){

    if(localStorage.getItem('uid'))
    {
    await this.$store.dispatch('getuseraction')
    await this.$store.dispatch('profileaction')
    }

  
    fb.auth().onAuthStateChanged(function(user){
        if(user)
        {
        var email=user.email
        var userid=user.uid
        var phonenumber=user.phoneNumber
        var photoURL=user.photoURL
        var displayName=user.displayName
        console.log('email',email,displayName,photoURL,phonenumber)
        localStorage.setItem('uid',userid)
        
        } 
        else{
            console.log('user: error in user or user not signin')
        }
    })


  }

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
 
  text-transform: capitalize;
}

#submit{
    margin: auto;
    margin-bottom: 20px;
}

#img {
  width: 200px;
  border-radius: 50%;
}

.container {
  text-transform: capitalize;
}
</style>