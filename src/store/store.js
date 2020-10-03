import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {fb} from '../firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
    strict:true,
    state:{
        email:[],
        photourl:[],
        displayName:[],
        mainuserprofile:[],
        scheduledata:[],
        alluserregisters:[]
    },
    getters:{

    },

    mutations:{
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
           await fb.auth().onAuthStateChanged(function(user){
                if(user)
                {
                var email=user.email
                var userid=user.uid
               
                var photoURL=user.photoURL
                var displayName=user.displayName
                context.commit('getuser',email,displayName,photoURL)     
                context.commit('getname',displayName)     
                context.commit('getphoto',photoURL)  
               
                localStorage.setItem('uid',userid)
                }
                else{
                    console.log('user: error in user or user not signin')
                }
            })
           
        },

        scheduleaction:function(context){

            axios.get('https://pg-app-fd8a7.firebaseio.com/cschedule.json')
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
            axios.get('https://pg-app-fd8a7.firebaseio.com/userregisters.json')
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
           await axios.get('https://pg-app-fd8a7.firebaseio.com/user.json')
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

