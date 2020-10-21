<template>
  <div>

  <div v-show="this.$store.state.admin" >
    <slot  name="admin" >   </slot>
  </div>

    <div class="container">
      <p class="display-2" id="title"> PG/Hostel Registration</p>
        <FlashMessage :position="'right top'"/>
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
          <label> Upload your Pg image </label>
          <!-- <input type="file" class="form-control-file" @change="fileselect" /> -->


            <image-uploader
            type=file
             :preview=false
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
            @input="fileselect"
            >
           </image-uploader>


           <p v-show="uploadValue"> uploading image :- {{uploadValue}}% </p>
        </div>


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
      uploadValue:'',
      hasImage:false,
      name1:'',
      img:'',
    };
  },

  methods: {
    fileselect:  function (obj) {
      this.hasImage = true;
      this.img = obj.dataUrl;
      this.name1=obj.info.name
    },

    filesubmit: function (name, phonenumber, landmark, address, pincode, city) {

      if(name!="" && phonenumber!="" && landmark!="" && address!="" && pincode!="" && city!="" && this.img!="")
      {

        this.flashMessage.setStrategy('single');
        this.flashMessage.success({
        message: 'successfully registered',
        time: 3000,
        blockClass: 'custom-block-class'
        });

      var storageRef = fb.storage().ref("userprofile/" + this.name1);
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
                  setTimeout(location.reload(),3000)

                })
                .catch((err) => console.log(err));
            });
        }
      );

    }
    else{

      this.flashMessage.setStrategy('single');
      this.flashMessage.error({
        message:'please fill up all the inputs',
        time:3000,
        blockClass:'custom-block-class'
      });


    }

    },

  },

  created(){
    this.$store.dispatch('getuseraction')
  }

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