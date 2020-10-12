<template>
  <div>
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

    <button style="float: right" class="btn btn-secondary" v-on:click="logout">
      signout
    </button>
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
            <input
              type="file"
              placeholder="Upload a photo"
              title="Choose a video please"
              @change="onfileselect"
            />
          </div>
          <p v-show="uploadValue" style="text-align: center">
            {{ info }}
            uploaded file:-{{ this.uploadValue }}%
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
          <div class="card mx-auto m-5" style="width: 35rem">
            <img :src="all.img" class="card-img-top rounded" alt="nature" />
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
    };
  },

  methods: {
    logout: function () {
      let self = this;
      console.log(fb.auth().signOut());

      fb.auth()
        .signOut()
        .then(() => {
          alert("sucessfully logout");
          self.$router.push("/login");
        })
        .catch((err) => alert(err.message));
      localStorage.removeItem("localid");
      localStorage.removeItem("idtoken");
      localStorage.removeItem("refreshtoken");
    },

    onfileselect: function (event) {
      this.selectfile = event.target.files[0];
      // this.imageurl=this.fileurl()
    },

    fileurl: function (text, pgname, username) {
      var storageRef = fb.storage().ref("images/" + this.selectfile.name);
      let uploadedTask = storageRef.put(this.selectfile);
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

              setTimeout(() => {
                axios
                  .post("http://127.0.0.1:5000/post/posts", {
                    text: text,
                    img: downloadURL,
                    pgname: pgname,
                    username: username,
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
    },

    modified: function () {
      let mainprofile = [];
      mainprofile =  this.$store.state.mainuserprofile;
      for (let obj in mainprofile) {
        if (mainprofile[obj].userid == localStorage.getItem("uid")) {
          this.pgname = mainprofile[obj].pg_name;
          this.username = mainprofile[obj].username;
        }
      }
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
    
    // fb.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     var email = user.email;
    //   }
    //   console.log('db',email);
    // });
  
    if (localStorage.getItem("localid")) {
      await axios
        .get("http://127.0.0.1:5000/get/posts")
        .then((res) => {
          console.log(res);
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

    
  },


};
</script>


<style>
textarea {
  height: auto;
}

#profile {
  width: 200px;
  border-radius: 50%;
}
</style>

