<template>
  <div>
    <slot name="title"> </slot>
    <!-- <button style="float: right" v-on:click="signout" class="btn btn-secondary">
      signout
    </button> -->
    <FlashMessage :position="'right top'"/>
    
    <div class="container">
      <div class="title display-2">Owner Profile</div>
      <form>
        <div class="text-center m-3">
          <div v-if="this.$store.state.photourl">
            <img :src="this.$store.state.photourl" id="img" alt="profile pic" />
          </div>

          <div v-else>
            <img
              src="https://info-ted.eu/wp-content/uploads/2019/12/profile-photo.png"
              class="rounded"
              alt="profile pic"
            />
          </div>
          <div v-if="this.$store.state.photourl">
            <button
              style="border: none; float: botton"
              v-on:click.prevent="deletephoto"
            >
              X
            </button>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label> username </label>
            <div v-if="this.$store.state.displayName">
              <input
                disabled
                type="text"
                class="form-control"
                placeholder="enter your username"
                :value="this.$store.state.displayName"
              />
            </div>
            <div v-else>
              <input
                type="text"
                class="form-control"
                placeholder="enter your username"
                v-model="username"
              />
            </div>
          </div>

          <div class="form-group col-md-6">
            <label> Phone number </label>

            <div v-if="this.$store.state.phonenumber">
              <input
                disabled
                type="text"
                class="form-control"
                placeholder="enter your phone number"
                v-model="this.$store.state.phonenumber"
              />
            </div>

            <div v-else>
              <input
                type="text"
                class="form-control"
                placeholder="enter your phone number ex:- 9655537630"
                v-model="phonenumber"
              />
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label> email </label>
            <div v-if="this.$store.state.email">
              <input
                disabled
                type="text"
                class="form-control"
                placeholder="enter your email"
                :value="this.$store.state.email"
              />
            </div>

            <div v-else>
              <input
                type="text"
                class="form-control"
                placeholder="enter your email"
                v-model="email"
              />
            </div>
          </div>

          <div class="form-group col-md-6">
            <label> select pg hostel </label>
            <div v-if="this.$store.state.pgname">
              <input
                disabled
                type="text"
                class="form-control"
                placeholder="select the pg hostel"
                v-model="this.$store.state.pgname"
              />
            </div>
            <div v-else>

            <select class="custom-select" v-model="pgname"  >
              <option value="" disabled> select the pg </option>
              <option v-for="(pg,index) in this.$store.state.pgnames" v-bind:key="index" > {{pg.name}}</option>
            </select>
            
            </div>
          </div>

        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label> age </label>

            <div v-if="this.$store.state.age">
              <input
                type="text"
                disabled
                class="form-control"
                placeholder="select the age"
                v-model="this.$store.state.age"
              />
            </div>
            <div v-else>
              <input
                type=number
                class="form-control"
                placeholder="select the age"
                v-model="age"
              />
            </div>
          </div>

          <div class="form-group col-md-6">
            <label> select gender </label>

            <div v-if="this.$store.state.gender">
              <select
                class="custom-select"
                disabled
                v-model="this.$store.state.gender"
              >
                <option value="men">Men</option>
                <option value="women">Woman</option>
                <option value="other">other</option>
              </select>
            </div>

            <div v-else>
                <select class="custom-select" v-model="gender">
                <option value="" disabled > select the gender </option>
                <option value="men">Men</option>
                <option value="women">Woman</option>
                <option value="other">other</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label> Update your Profile :- </label>
          <input type="file" class="form-control-file" @change="file" />
        </div>
        <p  v-show=" uploadValue">
          uploading photo:{{ uploadValue }}%  
        </p>
        

        <button
          id="submit"
          class="btn btn-secondary btn-md btn-block"
          v-on:click.prevent="
            posting(username, phonenumber, pgname, gender, age, email, owner)
          "
        >
          submit
        </button>
        <button
          id="submit"
          class="btn btn-secondary btn-md btn-block"
          v-on:click.prevent="deleting"
        >
          delete
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { fb } from "../firebase";
import axios from "axios";

export default {
  data() {
    return {
      date:'',
      owner: "",
      username: "",
      phonenumber: "",
      phonenumber1: "",
      isAdmin: false,
      email: "",
      pgname: "",
      pgname1: "",
      imageurl: "",
      gender: "",
      age: "",
      gender1: "",
      age1: "",
      mainselectfile: "",
      uploadValue: "",
      allusers: "",
      pk_id: "",
    };
  },

  methods: {
   
    signout: function () {
       localStorage.removeItem("localid");
      localStorage.removeItem("idtoken");
      localStorage.removeItem("id");
     this.$router.push("/login");
    },

    deletephoto: function () {
      axios
        .post("http://127.0.0.1:5000/deletephoto/user", {
          uid: localStorage.getItem("localid"),
          id: this.$store.state.id,
          photourl: null,
        })
        .then((res) => {
          console.log(res.data)
          location.reload()
          })
        .catch((err) => console.log(err));
    },

    deleting() {
      axios
        .delete("http://127.0.0.1:5000/delete/user/" + this.$store.state.id)
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => console.log(err));
    },

    file: function (event) {
      this.mainselectfile = event.target.files[0];
    },


    posting: function (
      username,
      phonenumber,
      pgname,
      gender,
      age,
      email,
      owner
    ) {
        
      email = this.$store.state.email;
      owner = this.$store.state.owner;
      if (
        this.$store.state.displayName == "" &&
        this.$store.state.pgname == "" &&
        this.$store.state.phonenumber =="" &&
        this.$store.state.gender=="" 
      ) {
          
        if(username!="" &&  phonenumber.length==10 && pgname!="" && gender!="" && age!="" && this.mainselectfile!="")
        {
          this.flashMessage.setStrategy('single');
          this.flashMessage.success({
          message: 'successfully registered',
          time: 3000,
          blockClass: 'custom-block-class'
          });
          console.log('please enter valid data')
        }else{
          this.flashMessage.setStrategy('single');
          this.flashMessage.error({
          message: 'please complete all details',
          time: 3000,
          blockClass: 'custom-block-class'
          });
          console.log('please enter valid data')

          if(phonenumber.length!=10)
          {
          this.flashMessage.setStrategy('single');
          this.flashMessage.error({
          message: 'phone number must be 10 digits ex:- 9655537630',
          time: 3000,
          blockClass: 'custom-block-class'
          });
          console.log('please enter valid data')
          }
        }


        var storageRef = fb
          .storage()
          .ref("userprofile/" + this.mainselectfile.name);
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
              .then(async function (downloadURL) {
                await console.log(downloadURL);

                console.log('primary')
              if(username!="" &&  phonenumber.length==10 && pgname!="" && gender!="" && age!="" )
              {  
                axios
                  .post("http://127.0.0.1:5000/post/user", {
                    uid: localStorage.getItem("localid"),
                    username: username,
                    email: email,
                    phonenumber: phonenumber,
                    pgname: pgname,
                    gender: gender,
                    age: age,
                    owner: owner,
                    profilepic: downloadURL,
                  })
                  .then((res) => {
                    console.log(res);
                    location.reload();
                  })
                  .catch((err) => console.log(err));
              }
              });
          }
        );
      } else if(this.mainselectfile!="") {
        var storageRef1 = fb
          .storage()
          .ref("userprofile/" + this.mainselectfile.name);
        let uploadedTask = storageRef1.put(this.mainselectfile);
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
              .then(async function (downloadURL) {
                await console.log(downloadURL);

                axios
                  .post("http://127.0.0.1:5000/deletephoto/user", {
                    uid:localStorage.getItem('localid'),
                    id: localStorage.getItem('id'),
                    photourl: downloadURL,
                  })
                  .then((res) => {
                    console.log(res);
                    location.reload()
                    console.log("updated the photo");
                  })
                  .catch((err) => console.log(err));
              });
          }
        );
      }
      else{
        this.flashMessage.setStrategy('single');
        this.flashMessage.info({
        message: 'please enter all input datas',
        time: 3000,
        blockClass: 'custom-block-class'
      });
        console.log('please enter valid data')
      }
    },
  },

  async created() {
    if (localStorage.getItem("localid")) {
      await this.$store.dispatch("getuseraction");
      await this.$store.dispatch("profileaction");
    }

    axios
      .post("http://127.0.0.1:5000/getcurrentuser", {
        uid: localStorage.getItem("localid"),
      })
      .then((res) => {
        console.log(res.data);
        if (!res) {
          console.log("user: error in user or user not signin");
        }
      })
      .catch((err) => console.log(err));

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

      this.$store.dispatch('getpgnames')
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

  text-transform: capitalize;
}

#submit {
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