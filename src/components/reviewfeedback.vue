<template>
    <div>
        <slot name="admin" >  </slot>
        <div class="title display-2">  Report & Issues </div>
         Note :- *Date & Time format = (yyyy-mm-dd,hh-mm-ss)
        <table class="table table-bordered" style="table-layout: auto width: 100%; " >
            <thead>
                <tr>
                    <th> id  </th>
                    <th> pgname  </th>
                    <th> username  </th>
                    <th> phonenumber  </th>
                    <th> email   </th>
                    <th> issues  </th>
                    <th> operation </th>
                </tr>
            </thead>
            <tbody  v-for="(each,index) in  maindata" v-bind:key="index" >
                <th> {{index}}  </th>
                <td> {{each.pg}} </td>
                <td> {{each.name}} </td>
                <td> {{each.phonenumber}} </td>
                <td> {{each.email}} </td>
                <td> {{each.issues}} </td>
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
            axios.delete('http://127.0.0.1:5000/delete/feedback/'+id)
            .then(res=>{
                console.log(res)
                location.reload()
                })
            .catch(err=>console.log(err))
        },

    getschedule:function(){
        let scheduledata=[]
        let schedule=[]
        scheduledata=this.$store.state.scheduledata
        
        for(let obj in scheduledata)
        {
            if(scheduledata[obj].pgname==this.$store.state.pgname  && scheduledata[obj].pgname!="")
            {
               schedule.push( scheduledata[obj])
            }
        }
        return schedule
    },

    },

    created(){
        axios.get('http://127.0.0.1:5000/get/feedback')
        .then(res=>{
            let mainarray=[]
            let alldatas=res.data
            for(let obj in alldatas)
            {
                alldatas[obj].id=obj
                mainarray.push(alldatas[obj])
            }
            this.maindata=mainarray
            })
        .catch(err=>console.log(err))
        
        this.$store.dispatch('profileaction') 
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

thead{
     text-transform: capitalize;
}

</style>