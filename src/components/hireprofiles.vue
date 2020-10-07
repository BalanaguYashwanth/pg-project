<template>
  <div>
    <div class="container">
      <p class="display-2" id="title">Careers in Pg Hostels</p>
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Name</label>
            <input
              type="text"
              v-model="name"
              placeholder="enter your  name"
              class="form-control"
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label>phone number</label>
            <input
              type="text"
              v-model="phonenumber"
              placeholder="enter your phonenumber"
              class="form-control"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label>email</label>
            <input
              type="email"
              v-model="email"
              placeholder="enter your email"
              class="form-control"
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label> State/City </label>
            <input
              type="text"
              v-model="city"
              placeholder="enter your state/city"
              class="form-control"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label>gender</label>
            <select class="form-control" v-model="gender" required>
              <option disabled value>choose the gender</option>
              <option>Men</option>
              <option>Women</option>
              <option>Other</option>
            </select>
          </div>

          <div class="form-group col-md-6">
            <label>Age</label>
            <input
              type="number"
              v-model="age"
              placeholder="enter your age"
              class="form-control"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label> Updated your Profile pic </label>
          <input type="file" class="form-control-file" @change="fileselect" />
        </div>
        {{ imgurl }}

        <button
          v-on:click.prevent="
            filesubmit(
              name,
              phonenumber,
              email,
              gender,
              age,
              city,
            
            )
          "
          class="btn btn-secondary"
        >
          Submit
        </button>
      </form>
     
    </div>
  </div>
</template>

<script >
import axios from "axios";
import { fb } from "../firebase";
export default {
  data() {
    return {
      name: "",
      phonenumber: "",
      gender: "",
      email: "",
      age: "",
      feedback: "",
      city: "",
      file: "",
      imgurl: "",
      imgurl1: "",
    };
  },

  methods: {
    fileselect:  function (event) {
      this.file = event.target.files[0];
    },

    filesubmit: function (name, phonenumber, email, gender, age, city) {
      var storageRef = fb.storage().ref("userprofile/" + this.file.name);
      let uploadedTask = storageRef.put(this.file);
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
                .post("https://pg-app-fd8a7.firebaseio.com/careers.json", {
                  name: name,
                  phonenumber: phonenumber,
                  email: email,
                  gender: gender,
                  age: age,
                  city: city,
                  profile: downloadURL,
                })
                .then((res) => {
                  console.log(res);
                  location.reload()
                })
                .catch((err) => console.log(err));
            });
        }
      );
    },

    posted: function () {
      if (
        this.name != "" &&
        this.phonenumber != "" &&
        this.gender != "" &&
        this.city != "" &&
        this.email != "" &&
        this.age != ""
      ) {
        axios
          .post("https://pg-app-fd8a7.firebaseio.com/careers.json", {
            name: this.name,
            phonenumber: this.phonenumber,
            email: this.email,
            gender: this.gender,
            age: this.age,
            city: this.city,
            profile: this.imgurl,
          })
          .then((res) => {
            console.log(res);
            this.feedback = "successfully submitted";
          })
          .catch((err) => console.log(err));
      } else {
        this.feedback = "please fill up all inputs";
      }
    },
  },
};
</script>

<style scoped >
#title {
  margin-top: 120px;
  margin-bottom: 30px;
  text-align: center;
}

.container {
  text-transform: capitalize;
  
}
</style>