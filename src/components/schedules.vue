<template>
    <div>
        <slot name="customer" > </slot>
        <div class='container'>
         <div class="title display-2">Quick Room schedules</div>
            {{ currentuser()}}

            <FlashMessage :position="'right top'"/>

            <div class="row">
            <div class="col-sm-6" >

            <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 32rem;">
            <div class="card-body">
            <h5 class="card-title mb-3"> *Cleaning schedule</h5>
            <h6 class="card-subtitle mb-2 text-muted"> schedule your room cleaning</h6>
            <p class="card-text">
               
            <input type="text"  placeholder="Room or bathroom or both " v-model="cleaningquery" class=" col-md-6 my-3 form-control" >

            <datetime type="datetime"  placeholder=" enter your cleaning date & time " v-model="cleaning"   class="datetime" use12-hour></datetime>

        

            </p>
            </div>
            </div>
            </div>

            <div class="col-sm-6"  >
            <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 34rem;">
            <div class="card-body">
            <h5 class="card-title  mb-3"> *Repair schedule</h5>
            <h6 class="card-subtitle mb-2 text-muted">schedule your repairs in room </h6>
            <p class="card-text">

            <input type="text"  placeholder="Room or bathroom repair " v-model="repairquery" class=" col-md-6 my-3 form-control" >


            <datetime type="datetime"  placeholder=" enter your repair date & time " v-model="repair"   class="datetime" use12-hour></datetime>

            </p>
            </div>
            </div>

            </div>
            </div>

             
            <div>
            <div class="card shadow p-3 mx-auto mb-5 bg-white rounded" style="width: 33rem;">
            <div class="card-body">
            <h5 class="card-title mb-3"> queries schedule</h5>
            <h6 class="card-subtitle mb-2 text-muted"> schedule to meet owner to discuss any problems</h6>
            <p class="card-text">
            
            <input type="text"  placeholder=" Query is all about ?" v-model="queriestext" class=" col-md-6 my-3 form-control" >


            <datetime type="datetime"  v-model="queries"  placeholder="schedule your queries " class="datetime" use12-hour></datetime>
            </p>
            </div>
            </div>
               <button id="submit" class="btn btn-secondary btn-block mx-auto mb-3" v-on:click="posting" >  submit </button>
            </div>

            
        *Note :- Any one member should update the shedule for a room contains more than 1 member
         <h1> {{info}} </h1>
        </div>
       
    </div>
</template>

<script>
import axios from 'axios'
export default {

    data(){
        return{
            repairquery:'',
            cleaningquery:'',
            username:'',
            phonenumber:'',
            pg_name:'',
            userid:'',
            cleaning:'',
            repair:'',
            queries:'',
            info:'',
            queriestext:'',
        }

    },

    methods:{

        posting:function(){

        if( this.cleaning!="" || this.repair!="" || this.queries!="" ){

            axios.post('http://127.0.0.1:5000/post/customerschedule',{
            username:this.username,
            phonenumber:this.phonenumber,
            pgname:this.pg_name,
            userid:this.userid,
            cleaningquery:this.cleaningquery,
            cleaning:this.cleaning,
            repairquery:this.repairquery,
            repair:this.repair,
            queriestext:this.queriestext,
            queries:this.queries,
            })
            .then(res=>{
                console.log(res)
                this.flashMessage.setStrategy('single');
                this.flashMessage.success({
                message: 'successfully submitted your schedule',
                time: 3000,
                blockClass: 'custom-block-class'
                });

                setTimeout(function(){ location.reload() }, 3000);


                

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
        console.log('please enter valid data')
        }


        },
        
        currentuser:function(){
            this.username = this.$store.state.displayName
            this.phonenumber = this.$store.state.phonenumber
            this.pg_name = this.$store.state.pgname
            this.userid = localStorage.getItem('localid')
        }


    },


    created(){
       
        this.$store.dispatch('profileaction')
        this.$store.dispatch('getuseraction')


        axios.get('http://127.0.0.1:5000/get/customerschedule')
        .then(res => (res))
    }
    
}
</script>

<style scoped>

.title {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-left: auto;
  color: #2c3e50;
  
  margin-bottom: 50px;
  text-transform: capitalize;
}

.container{
     text-transform: capitalize;
}

#submit{
    text-align:center;
    float : center;
}

</style>