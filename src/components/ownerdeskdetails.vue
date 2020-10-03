<template>
    <div >
        <div class="title display-2"> Registered Users </div>
        <table class="table table-bordered" style="table-layout: auto width: 100%; " >
            <thead>
                <tr>
                    <th> id  </th>
                    <th> pgname  </th>
                    <th> username  </th>
                    <th> phonenumber  </th>
                    <th> email  </th>
                    <th> category  </th>
                    <th> owner name  </th>
                    <th> age  </th>
                    <th> gender  </th>
                    <th> startdate  </th>
                    <th> enddate </th>

                    <th> operation </th>
                </tr>
            </thead>
            <tbody  v-for="(each,index) in  registeredusers()" v-bind:key="index" >
                <th> {{index}}  </th>

                <td> {{each.pgname}} </td>
                <td> {{each.name}} </td>
                <td> {{each.phonenumber}} </td>
                <td> {{each.email}} </td>
                <td> {{each.category}} </td>
                <td> {{each.ownername}} </td>
                <td> {{each.age}} </td>
                <td> {{each.gender}} </td>
                <td> {{each.startdate}} </td>
                <td> {{each.enddate}} </td>
                <td> <button class="btn btn-secondary"  v-on:click=deleting(each.id) > delete </button> </td>

            </tbody>

        </table>

       
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            userpg:'',
            maindata:[],
        }
    },


    computed:{
        profile:function(){
        let profiledata=[]
        var userpg=''
        profiledata=this.$store.state.mainuserprofile
        for(let obj in profiledata)
        {
            if(profiledata[obj].userid==localStorage.getItem('uid'))
            {
                userpg=profiledata[obj].pg_name
            }
        }
        return userpg

    },
    },

    methods:{
        deleting:function(id){
            axios.delete('https://pg-app-fd8a7.firebaseio.com/userregisters/'+id+'.json')
            .then(res=>{
                console.log(res)
                location.reload()
                })
            .catch(err=>console.log(err))

        },

    registeredusers:function(){
        let rusers=[]
        let userr=[]
        rusers=this.$store.state.alluserregisters
        
        for(let obj in rusers)
        {
            if(rusers[obj].pgname==this.profile)
            {
               userr.push( rusers[obj])
            }
        }
        return userr
    },

    },

    created(){
        this.$store.dispatch('profileaction') 
        this.$store.dispatch('userregisters')

        
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
  margin-top: 50px;
  margin-bottom: 20px;
  text-transform: capitalize;
}

.table{
    text-align: center;
}

.container{
     text-transform: capitalize;
}

</style>