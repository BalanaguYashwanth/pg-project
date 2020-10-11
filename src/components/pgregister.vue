<template>
  <div>
    <div class="container">
      <p class="display-2" id="title"> Pg Hostels Registration</p>
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label> PG Name</label>
            <input
              type="text"
              v-model="name"
              placeholder="enter your pg name"
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
            <label> State/City </label>
            <input
              type="text"
              v-model="city"
              placeholder="enter your state/city"
              class="form-control"
              required
            />
          </div>
          
        <div class="form-group col-md-6">
            <label>Address</label>
            <input
              type="text"
              v-model="address"
              placeholder="enter your address"
              class="form-control"
              required
            />
          </div>
        


        </div>

        <div class="form-row">
            
          <div class="form-group col-md-6">
            <label>Landmark</label>
            <input
              type="text"
              v-model="landmark"
              placeholder="enter your landmark"
              class="form-control"
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label>Pin code</label>
            <input
              type="number"
              v-model="pincode"
              placeholder="enter your pincode"
              class="form-control"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label> Updated your Pg image </label>
          <input type="file" class="form-control-file" @change="fileselect" />
        </div>
        {{ imgurl }}

        <button
          v-on:click.prevent="
            filesubmit(
              name,
              phonenumber,
              landmark,
              address,
              pincode,
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
      landmark: "",
      address: "",
      pincode: "",
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

    filesubmit: function (name, phonenumber, landmark, address, pincode, city) {
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
                .post("http://127.0.0.1:5000/post/pgregisters", {
                  name: name,
                  phonenumber: phonenumber,
                  landmark: landmark,
                  address: address,
                  pincode: pincode,
                  city: city,
                  pgimage: downloadURL,
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