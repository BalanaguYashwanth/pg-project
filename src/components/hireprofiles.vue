<template>
  <div>

    <div v-show="this.$store.state.admin" >
      <slot  name="admin" >   </slot>
    </div>


    <div class="container">
              <FlashMessage :position="'right top'"/>
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
           <!-- <input type="file" class="form-control-file" @change="fileselect" />  -->

           <image-uploader
            type=file
             :preview=false
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
            @input="setImage"
          >
          </image-uploader>

          
           
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
          <br>
        {{this.uploadValue}}
      </form>
     
    </div>
  </div>
</template>

<script >
import axios from 'axios'
import { fb } from "../firebase";
//import imageCompressor from 'vue-image-compressor'
//import MyComponent from './MyComponent.vue';

export default {

  // components: {
  //   imageCompressor,
  // },


  data() {
    return {
      scale:100,
      quality:0,
      originalSize: true,
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
      info:'',
      compressed:'',
      img:'',
      hasImage:false,
      name1:'',
      uploadValue:'',
    };

    
  },

  

  methods: {

     setImage: function(obj){
      this.hasImage = true;
      this.img = obj.dataUrl;
      this.name1=obj.info.name
      console.log(this.img)
      console.log(obj.info.name)
      console.log('Info', obj.info)
      console.log('Exif', obj.exif)
      },

    // fileselect: async function (event) {
    //   this.file = event.target.files[0];
    //   console.log(this.file)
    // },

    filesubmit: function (name, phonenumber, email, gender, age, city) {
      
      if(name!="" && phonenumber!="" && email!="" && gender!="" && age!="" && city!="" && this.img!="")
    {
     
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
                .post("http://127.0.0.1:5000/post/careers", {
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

  async created(){
    await this.$store.dispatch('getuseraction')
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