import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {fb} from '../firebase'
Vue.use(Vuex)


export const store = new Vuex.Store({
    strict:true,
    state:{
        email:[],
        photourl:"",
        displayName:"",
        mainuserprofile:[],
        scheduledata:[],
        alluserregisters:[],
        owner:[],
        phonenumber:"",
        age:"",
        pgname:"",
        gender:"",
        id:[]
    },
    getters:{

    },

    mutations:{

        getid:function(state,id){
            state.id=id
        },

        getgender:function(state,gender){
            state.gender=gender
        },

        getphonenumber:function(state,phonenumber){
            state.phonenumber=phonenumber
        },

        getage:function(state,age){
            state.age=age
        },

        getpgname:function(state,pgname){
            state.pgname=pgname
        },

        getowner:function(state,owner){
            state.owner=owner
        },

        getuser:function(state,email){
            state.email=email
        },
        getname:function(state,name){
            state.displayName=name
        },

        getphoto:function(state,photoURL){
            state.photourl=photoURL
        },
        profile:function(state,mprofile){
            state.mainuserprofile=mprofile
        },

        schedule:function(state,data){
            state.scheduledata=data
        },

        userregister:function(state,users){
            state.alluserregisters=users
        },
    },

    actions:{
        getuseraction: async function(context){

            axios.post('http://127.0.0.1:5000/getcurrentuser',{
                uid:localStorage.getItem('localid'),
              }).then(res=>{
                if(res)
                {
                context.commit('getuser',res.data.email)
                context.commit('getowner',res.data.owner)
                }
                else{
                    console.log('user: error in user or user not signin')
                }
                })
              .catch(err=>console.log(err))
            
            axios.get('http://127.0.0.1:5000/get/user')
            .then(res=>{
                let datas=res.data
                let maindatas=[]
                for(let obj1 in datas)
                {
                   datas[obj1].id=obj1
                   maindatas.push(datas[obj1])
                }
               

               let data=maindatas
                

                for(let obj in data)
                {
                    if( localStorage.getItem('localid') == data[obj].uid  )
                    {
                        console.log( data[obj])
                        context.commit('getid',data[obj].id)
                        context.commit('getname',data[obj].username)
                        context.commit('getphoto',data[obj].profilepic)
                        context.commit('getphonenumber',data[obj].phonenumber)
                        context.commit('getage',data[obj].age)
                        context.commit('getpgname',data[obj].pgname)
                        context.commit('getgender',data[obj].gender)
                        localStorage.setItem('id',data[obj].id)
                    }
                }
            
            })
            .catch(err=>console.log(err))
        },

        scheduleaction:function(context){
            axios.get('http://127.0.0.1:5000/get/customerschedule')
            .then(res=>{
                console.log(res)
                let alldata=[]
                let datas = res.data
                for(let key in datas)
                {
                    datas[key].id=key
                    alldata.push(datas[key])
                }
                context.commit('schedule',alldata)
            
            })
            .catch(err=>console.log(err))
        },

        userregisters:function(context){
            axios.get('http://127.0.0.1:5000/get/userregisters')
            .then(res =>{
                console.log('users',res)
                let users=[]
                let register=res.data
                for(let key in register)
                {
                    register[key].id=key
                    users.push(register[key])
                }
                context.commit('userregister',users)
            })
            .catch(err=>console.log(err))
        },

        signout:function(){
                console.log(fb.auth().signOut())
                
                fb.auth().signOut()
                .then(() => {
                  alert('sucessfully logout')
                       
                  })
                .catch( err => alert(err.message) )
                localStorage.removeItem('uid')
             
        },


        profileaction:async function(context){
            var mainprofiledata=[]
           await axios.get('http://127.0.0.1:5000/get/user')
            .then(res=>{
                let data=res.data
                for(let key in data)
                {
                    data[key].id=key
                    mainprofiledata.push(data[key])
                } 
                                

                context.commit("profile",mainprofiledata)
            })
            .catch(err=>console.log(err))
        }    

    },

})

