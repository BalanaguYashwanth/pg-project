<template>
  <div>

       <FlashMessage :position="'right top'"/>


     <slot name="title" >  </slot>
    <div class="container">
      <p class="display-2" id="title">Owner desk</p>
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
              placeholder="enter your phonenumber ex:- 9655537630"
              class="form-control"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Start Date</label>
            <datetime type="datetime"  v-model="startdate"   class="datetime" use12-hour></datetime>
          </div>

          <div class="form-group col-md-6">
            <label>End date</label>
            <datetime type="datetime"  v-model="enddate"   class="datetime" use12-hour></datetime>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label> choose the category </label>
            <select class="form-control" v-model="category" required>
              <option disabled value>Choose the category</option>
              <option>Working professoinal</option>
              <option>Student</option>
              <option>other</option>
            </select>
          </div>

          <div class="form-group col-md-6">
            <label>rent</label>
            <input
              type="number"
              v-model="rent"
              placeholder="enter rent amount paid"
              class="form-control"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label>gender</label>
            <select class="form-control" v-model="gender" required>
              <option disabled value> choose the gender</option>
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
            <label>email</label>
            <input
              type="email"
              v-model="email"
              placeholder="enter your email"
              class="form-control"
              required
            />
          </div>

        <button v-on:click.prevent="posted" class="btn btn-secondary">Submit</button>
      </form>
      <h1> {{feedback}} </h1>
    
    </div>
  </div>
</template>


<script >
import axios from 'axios';
export default {
  data(){
    return{
      date:'',
      name:'',
      phonenumber:'',
      startdate:'',
      enddate:'',
      gender:'',
      category:'',
      email:'',
      age:'',
      feedback:'',
      rent:''
    }
  },

    

methods:{
  posted:function(){
    if(this.name!='' && this.phonenumber.length==10 && this.startdate!='' &&  this.enddate!='' && this.gender!='' && this.category!='' && this.email!='' && this.age!='' && this.rent!="")
    {
    axios.post('http://127.0.0.1:5000/post/userregisters',{
      name:this.name,
      phonenumber:this.phonenumber,
      startdate:this.startdate,
      enddate:this.enddate,
      email:this.email,
      gender:this.gender,
      age:this.age,
      category:this.category,
      ownername: this.$store.state.displayName,
      rent:this.rent,
      pgname:this.$store.state.pgname,
    })
    .then(res=>{
      console.log(res)

    
        this.flashMessage.setStrategy('single');
        this.flashMessage.success({
        message: 'successfully registered',
        time: 3000,
        blockClass: 'custom-block-class'
        });
        console.log('please enter valid data')

      this.feedback="successfully registered";
      })
    .catch(err=>console.log(err))
    }
    else{
      if(this.phonenumber.length!=10)
      {
        this.flashMessage.setStrategy('single');
        this.flashMessage.error({
        message: 'phone number must be 10 digits',
        time: 3000,
        blockClass: 'custom-block-class'
        });
        console.log('please enter valid data')
      }
      
      this.flashMessage.setStrategy('single');
        this.flashMessage.error({
        message: 'please fill up all details',
        time: 3000,
        blockClass: 'custom-block-class'
        });
        console.log('please enter valid data')
      
      this.feedback="please fill up all details & enter valid inputs" 
    }
  }
},

created(){
    this.$store.dispatch('getuseraction')
    this.$store.dispatch('profileaction') 
}

};
</script>

<style scoped >
#title {
  margin-top: 120px;
  margin-bottom: 30px;
  text-align: center;
}



.container{
    text-transform: capitalize;
}
</style>