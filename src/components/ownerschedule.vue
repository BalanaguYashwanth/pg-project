<template>
    <div class="container">
        <div class="title display-2"> Users schedule</div>
        {{getschedule()}}
        
  

    </div>
</template>

<script>
export default {
    data(){
        return{


        }
    },
    methods:{
            getschedule:function(){
        let scheduledata=[]
        scheduledata=this.$store.state.scheduledata
        
        console.log(scheduledata)
        return scheduledata

    },


    },

    created(){
        
        this.$store.dispatch('scheduleaction')
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

.container{
     text-transform: capitalize;
}

</style>