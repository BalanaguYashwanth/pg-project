<template>
  <div>

    <FlashMessage :position="'right top'"/>

    <slot name="customer" >  </slot>
    <div class="container">
    <p class="display-2" id="title">schedule your food </p>
   
      <form>
           
        <div>     
             <h1  style="text-align:center" > Break Fast </h1>
            <div  class="form-group mx-auto col-md-7">
                <label></label>
                <input
                type="text"
                v-model="tiffin"
                placeholder="enter your tiffin food item"
                class="form-control"
                required
                />
            </div>
          <div  id="col" class="form-group col-md-6">
            <label></label>
            <datetime type="datetime"  v-model="tiffintime" placeholder="   ----- schedule your tiffin -----"   class="datetime" use12-hour></datetime>
          </div>
        </div>

        <div>     
            <h1  style="text-align:center" > Lunch </h1>
            <div  class="form-group mx-auto col-md-7">
                <label></label>
                <input
                type="text"
                v-model="lunch"
                placeholder="enter your lunch food item"
                class="form-control"
                required
                />
            </div>

          <div  id="col" class="form-group col-md-6">
            <label></label>
            <datetime type="datetime"  v-model="lunchtime" placeholder="   ----- schedule your lunch -----"   class="datetime" use12-hour></datetime>
          </div>

        </div>

         <div>     
            <h1  style="text-align:center" > Dinner </h1>
            <div  class="form-group mx-auto col-md-7">
                <label></label>
                <input
                type="text"
                v-model="dinner"
                placeholder="enter your Dinner food item"
                class="form-control"
                required
                />
            </div>

          <div  id="col" class="form-group col-md-6">
            <label></label>
            <datetime type="datetime"  v-model="dinnertime" placeholder="  ----- schedule your Dinner ----- "   class="datetime" use12-hour></datetime>
          </div>
        </div>

          <div class="form-group">
            <label>  </label>
            <input
              type="text"
              v-model="queries"
              placeholder="Any queries ? : Optional  text box "
              class="form-control"
              required
            />
          </div>

        <button v-on:click.prevent="posted"  style="float:center" class=" col-md-3 mx-auto d-block btn btn-secondary " >Submit</button>
      </form>
    
    </div>
  </div>
</template>


<script >
import axios from 'axios';
export default {
  data(){
    return{
      name:'',
      phonenumber:'',
      email:'',
      age:'',
      
      
      tiffin:'',
      tiffintime:'',
      lunch:'',
      lunchtime:'',
      dinner:'',
      dinnertime:'',
      queries:'',
    }
  },

methods:{
  posted:function(){
    if((this.tiffin!='' && this.tiffintime!='') || (this.lunch!='' &&  this.lunchtime!='' ) || (this.dinner!='' && this.dinnertime!='') )
    {
    axios.post('http://127.0.0.1:5000/post/schedulefood',{
      name:this.$store.state.displayName,
      phonenumber:this.$store.state.phonenumber,
      uid:localStorage.getItem('localid'),
      email:this.$store.state.email,
      gender:this.$store.state.gender,
      age:this.$store.state.age,
    
      
      tiffin:this.tiffin,
      tiffintime:this.tiffintime,
      lunch:this.lunch,
      lunchtime:this.lunchtime,
      dinner:this.dinner,
      dinnertime:this.dinnertime,
      queries:this.queries,
     
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

      setTimeout(
      function()
      { 
        location.reload() 
      }, 3000);

      })
    .catch(err=>console.log(err))
    }
    else{
        this.flashMessage.setStrategy('single');
        this.flashMessage.error({
        message: 'please schedule atleast one',
        time: 3000,
        blockClass: 'custom-block-class'
        });
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
  margin-bottom: 30px;
  text-align: center;
}

#col{
    padding-left: 450px;
}

.form-group col-md-6{
    margin: 0px;
}

input{
    text-align: center;
}


input{
    border:1px solid grey;
}


.container{
    text-transform: capitalize;   
}
</style>