<template>
    <div class="container">
         <FlashMessage :position="'right top'"/>
        <h1 class="display-2" > Report & Issues </h1>
        <textarea 
        class="form-control"
        placeholder="Before writing about your problem or issues, please introduce your self ex:- customer (or) owner of the pg and student or working professional etc "
        rows="12"
        v-model="issues"
        >
        </textarea>
        <br>
        <button v-on:click="posting"  class="btn btn-secondary" > submit </button>
    </div>
</template>

<script>
import axios from 'axios'
export default {

    data(){
        return{
            issues:'',
        }
    },

    methods:{
        posting:function(){
            
            if(this.issues)
            {
                axios.post('http://127.0.0.1:5000/post/feedback',{
                pg:this.$store.state.pgname,
                issues:this.issues,
                uid:localStorage.getItem('localid'),
                name:this.$store.state.displayName,
                email:this.$store.state.email,
                phonenumber:this.$store.state.phonenumber,               
            })
            .then(res=>{
                console.log(res)
                this.flashMessage.setStrategy('single');
                this.flashMessage.success({
                message: 'successfully submiited',
                time: 3000,
                blockClass: 'custom-block-class'
                });
                setTimeout(location.reload(),3000)
                })
            .catch(err=>{
                console.log(err)
            })
            }
            else{

                this.flashMessage.setStrategy('single');
                this.flashMessage.error({
                message: 'please submit valid input',
                time: 3000,
                blockClass: 'custom-block-class'
                });
            }

        }
    },

    created(){
        this.$store.dispatch('getuseraction')
    }


}
</script>

<style  scoped>

textarea{
    height: auto;
    border:1px solid grey;
}

.container{
    margin-top: 120px;
}


</style>