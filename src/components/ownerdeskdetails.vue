<template>
    <div >
        <slot name="title" >  </slot>
        <div class="title display-2"> Registered Users </div>
         Note :- * = (yyyy-mm-dd,hh-mm-ss)
        <table class="table table-bordered" style="table-layout: auto width: 100%; " >
            <thead>
                <tr>
                    <th> id  </th>
                    <th> pgname  </th>
                    <th> owner name  </th>
                    <th> customer name  </th>
                    <th> phonenumber  </th>
                    <th> email  </th>
                    <th> category  </th>
                    <th> age  </th>
                    <th> gender  </th>
                    <th> *startdate  </th>
                    <th> *enddate </th>
                    <th> rent paid </th>
                    <th> operation </th>
                </tr>
            </thead>
            <tbody  v-for="(each,index) in  registeredusers()" v-bind:key="index" >
                <th> {{index}}  </th>
                <td> {{each.pgname}} </td>
                 <td> {{each.ownername}} </td>
                <td> {{each.name}} </td>
                <td> {{each.phonenumber}} </td>
                <td> {{each.email}} </td>
                <td> {{each.category}} </td>
                <td> {{each.age}} </td>
                <td> {{each.gender}} </td>
                <td>  {{dateformat(each.startdate)}} </td>
                <td> {{dateformat(each.enddate)}} </td>
                <th> {{each.rent}} </th>
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
   
    methods:{

        dateformat(num){
            let str=num.split("T")
            let str1=(str[1].split('.'))
            let mainstr=str[0]+" , "+str1[0]
            return mainstr
          
        },

        deleting:function(id){
            axios.delete('http://127.0.0.1:5000/delete/userregisters/'+id)
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
           
            if(rusers[obj].pgname==this.$store.state.pgname && rusers[obj].pgname!='')
            {
              console.log('data')
               userr.push( rusers[obj])
            }
        }
        return userr
    },

    },

    created(){
        this.$store.dispatch('profileaction') 
        this.$store.dispatch('userregisters')
         this.$store.dispatch('getuseraction')
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