<template>
    <div>
        <div class='container'>
         <div class="title display-2">Quick remainders</div>
            {{ currentuser()}}
            <div class="row">
            <div class="col-sm-6" >

            <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 32rem;">
            <div class="card-body">
            <h5 class="card-title mb-3"> *Cleaning schedule</h5>
            <h6 class="card-subtitle mb-2 text-muted">---</h6>
            <p class="card-text">
               <input type="datetime-local" v-model="cleaning">
            </p>
            </div>
            </div>
            </div>

            <div class="col-sm-6"  >
            <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 34rem;">
            <div class="card-body">
            <h5 class="card-title  mb-3"> *Laundry schedule</h5>
            <h6 class="card-subtitle mb-2 text-muted">---</h6>
            <p class="card-text">
            <input type="datetime-local" v-model="laundry">
            </p>
            </div>
            </div>

            </div>
            </div>

             
            <div>
            <div class="card shadow p-3 mx-auto mb-5 bg-white rounded" style="width: 33rem;">
            <div class="card-body">
            <h5 class="card-title mb-3"> queries schedule</h5>
            <h6 class="card-subtitle mb-2 text-muted"> Regarding owner any queries to discuss </h6>
            <p class="card-text">
               <input type="datetime-local" v-model="queries">
            </p>
            </div>
            </div>
               <button id="submit" class="btn btn-secondary btn-block mx-auto mb-3" v-on:click="posting" >  submit </button>
            </div>

            
        *Note :- Any one member should update the shedule for a room contains more than 1 member
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {

    data(){
        return{
            username:'',
            phonenumber:'',
            pg_name:'',
            userid:'',
            cleaning:'',
            laundry:'',
            queries:'',
        }

    },

    methods:{

        posting:function(){

            axios.post('https://pg-app-fd8a7.firebaseio.com/cschedule.json',{
            username:this.username,
            phonenumber:this.phonenumber,
            pgname:this.pg_name,
            userid:this.userid,
            cleaning:this.cleaning,
            laundry:this.laundry,
            queries:this.queries,

            })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))

        },



        
        currentuser:function(){
            let datas=[];
            datas=this.$store.state.mainuserprofile
            for(let obj in datas)
            {
               if(datas[obj].userid==localStorage.getItem('uid'))
               {

                    this.username = datas[obj].username
                    this.phonenumber = datas[obj].phonenumbr
                    this.pg_name = datas[obj].pg_name
                    this.userid = datas[obj].userid

                
               }
            }

        }


    },



    created(){
       
        this.$store.dispatch('profileaction')
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
  margin-top: 110px;
  margin-bottom: 20px;
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