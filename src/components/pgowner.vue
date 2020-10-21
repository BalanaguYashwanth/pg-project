<template>
  <div>
      <FlashMessage :position="'right top'"/>
    {{ modified() }}
    <slot name="title" >  </slot>
    <div v-if="this.$store.state.photourl" style="text-align: right">
      <router-link to="/ownerprofile">
        <img
          id="profile"
          :src="this.$store.state.photourl"
          class="img-centered"
          style="height: auto; width: 60px"
          alt=""
        />
      </router-link>
    </div>

    <div v-else style="text-align: right">
      <router-link to="/ownerprofile">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ54iLC-JopSr54OnaoTHcMculZnCMyweBC9w&usqp=CAU"
          style="height: auto; width: 60px"
          alt=""
        />
      </router-link>
    </div>

    <!-- <button style="float: right" class="btn btn-secondary" v-on:click="logout">
      signout
    </button> -->
    <div class="container">
      <form>
        <div class="card mx-auto" style="width: 50rem">
          <div class="card-body">
            <textarea
              style="border: none"
              rows="3"
              type="text"
              class="form-control"
              placeholder=" ✍️ write a post "
              required
              v-model="textdata"
            >
            </textarea>
          </div>

          <div class="card-footer text-muted">
            <!-- <input
              type="file"
              placeholder="Upload a photo"
              title="Choose a video please"
              @change="onfileselect"
            /> -->

            <image-uploader
            type=file
             :preview=false
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
            @input="onfileselect"
          >
          </image-uploader>


          </div>
          <p v-show="uploadValue" style="text-align: center">
            {{ info }}
            uploading photo:-{{ this.uploadValue }}%
          </p>

          <button
            type="button"
            v-on:click="fileurl(textdata, pgname, username)"
            class="btn btn-secondary m-1"
          >
            Submit
          </button>
        </div>

        <div v-for="(all, index) in alldata" v-bind:key="index">
          <div class="card mx-auto m-5" id="card" style="width: 35rem">
            <img :src="all.img" v-show="all.img" class="card-img-top rounded" alt="nature" />
            <div class="card-body">
              <p class="card-text">
                {{ all.text }} 
              </p>
              <button
                type="button"
                v-on:click="deleting(all.id) "
                class="btn btn-secondary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div v-show="!this.$store.state.pgname" >
          <div class="card mx-auto m-5" id="card" style="width: 35rem">
            <div class="card-body">
              <h3 class="card-text display-5 ">
                Please complete your profile to get updates or your requests or posts will be invalid  
              </h3>
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
import firebase from 'firebase/app'
import 'firebase/firestore'


//import {firestore} from '../firebase'
export default {

  data() {
    return {
      alldata: [],
      textdata: "",
      image: "",
      selectfile: "",
      info: "",
      uploadValue: "",
      imageurl: null,
      email: "",
      uid: "",
      pgname: "",
      username: "",
      info1:"",
      hasImage:false,
      name1:'',
      img:'',
    };
  },

  methods: {
    logout: function () {
      localStorage.removeItem("localid");
      localStorage.removeItem("idtoken");
      localStorage.removeItem("id");
       this.$router.push("/login");
    },

    onfileselect: function (obj) {
      this.hasImage = true;
      this.img = obj.dataUrl;
      this.name1=obj.info.name
    },

    fileurl: function (text, pgname, username) {
      if(this.img!=="")
      {
      var storageRef = fb.storage().ref("images/" + this.name1);
      let uploadedTask = storageRef.putString(this.img,'data_url');
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
              //console.log(fb.firestore())
              setTimeout(() => {
             // var date = new Date();
                axios
                  .post("http://127.0.0.1:5000/post/posts", {
                    text: text,
                    img: downloadURL,
                    pgname: pgname,
                    username: username,
                    uid:localStorage.getItem('localid'),
                    //created:date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                    timestamp:firebase.firestore.Timestamp.fromDate(new Date()),
                  })
                  .then((res) => {
                    console.log('succes')
                    console.log('done',res.statusText);
                    location.reload()
                  })
                  .catch((err) => console.log('err',err));

              }, 3000);
            });
        }
      );
      }
      else if(text!=''){
        axios.post('http://127.0.0.1:5000/post/posts',{
            text: text,
            pgname: pgname,
            username: username,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            uid:localStorage.getItem('localid')
        }).then(res=>{
          console.log(res)
          location.reload()
        })
        .catch(err=>console.log(err))
        console.log('secondary')
      }

      else{
        console.log('enter valid input')
        this.flashMessage.setStrategy('single');
        
        this.flashMessage.error({
        message: 'please fullup atleast one input',
        time: 3000,
        blockClass: 'custom-block-class'
        });

        this.info1="please enter valid input"
      }
    },

    modified: function () {
      this.pgname = this.$store.state.pgname
      this.username=this.$store.state.displayName
    },

    deleting: function (id) {
      alert("deleting the post");
      axios
        .delete("http://127.0.0.1:5000/delete/posts/"+ id)
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => console.log(err.response.delete));
    },
  },


  async created() {
    
    await this.$store.dispatch("getuseraction");
    await this.$store.dispatch("profileaction");
    if (localStorage.getItem("localid")) {
      await axios
        .get("http://127.0.0.1:5000/get/posts")
        .then((res) => {
         console.log(res)
          var data = res.data;
         var blogs=[]
        for(let key in data)
        { 
          data[key].id=key
          blogs.push(data[key])
        }

      for(let obj in blogs)
      {
        if(blogs[obj].pgname == this.pgname)
        {
          this.alldata.push(blogs[obj])
        }
      }
        })
      .catch((err) => console.log(err));
    }
     else {
      console.log("user not  authenticated");
    }
    
          /////// auth ///////////
       let routing=  this.$store.state.owner
        if(!routing)
        {
          this.$router.push('/login')
          localStorage.removeItem("localid");
          localStorage.removeItem("idtoken");
          localStorage.removeItem("id");
        }
        console.log(this.$store.state.owner)
      ////////auth////////////
  },


};
</script>


<style>

#card{
  border: 0.1px solid grey;
}

textarea {
  height: auto;
}

#profile {
  width: 200px;
  border-radius: 50%;
}
</style>

