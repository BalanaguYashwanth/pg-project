<template>
    <div>
        <slot name="customer">  </slot>
        <div class="title display-2">  schedule Food History </div>
         Note :- *Date & Time format = (yyyy-mm-dd,hh-mm-ss)
        
        <table class="table table-bordered" style="table-layout: auto width: 100%; " >
            <thead>
                <tr>
                    <th> id  </th>
                    <th> pgname  </th>
                    <th> username  </th>
                    <th> phonenumber  </th>
                    <th> tiffin   </th>
                    <th> tiffin time  </th>
                    <th> lunch  </th>
                    <th> lunch time </th>
                    <th> dinner  </th>
                    <th> dinner time </th>
                    <th> queries </th>
                  
                </tr>
            </thead>

            <tbody  v-for="(each,index) in   getschedule()" v-bind:key="index" >
                <th> {{index}}  </th>
                <td> {{each.pgname}} </td>
                <td> {{each.name}} </td>
                <td> {{each.phonenumber}} </td>
                <td> {{each.tiffin}} </td>
                <td> {{dateformat(each.tiffintime)}} </td>
                <td> {{each.lunch}} </td>
                <td> {{dateformat(each.lunchtime)}} </td>
                <td> {{each.dinner}} </td>
                <td> {{dateformat(each.dinnertime)}} </td>
                <td> {{(each.queries)}} </td>
             
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
        if(num)
        {
        let str=num.split("T")
        let str1=(str[1].split('.'))
        let mainstr=str[0]+" , "+str1[0]
        return mainstr
        }else{
            return "---"
        }
    },


    deleting:function(id){
        alert("deleting the selected data")
        axios.delete('http://127.0.0.1:5000/delete/schedulefood/'+id)
        .then(res=>{
            console.log(res)
            location.reload()
            })
        .catch(err=>console.log(err))
    },

    getschedule:function(){
        let scheduledata=[]
        let schedule=[]
        scheduledata=this.$store.state.foodschedules
        
        for(let obj in scheduledata)
        {
            if(scheduledata[obj].pgname==this.$store.state.pgname && scheduledata[obj].uid==localStorage.getItem('localid')  && scheduledata[obj].pgname!="")
            {
               schedule.push( scheduledata[obj])
            }
        }
      
        return schedule
    },

    },

    created(){
        this.$store.dispatch('profileaction') 
        this.$store.dispatch('scheduleaction')
        this.$store.dispatch('getuseraction')
        this.$store.dispatch('foodaction')
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

thead{
     text-transform: capitalize;
}

</style>