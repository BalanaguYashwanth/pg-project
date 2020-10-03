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
        mainuserprofile:[]
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
        }
    },

    actions:{
        getuseraction:function(context){
            fb.auth().onAuthStateChanged(function(user){
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

        signout:function(){
           
               
                console.log(fb.auth().signOut())
                
                fb.auth().signOut()
                .then(() => {
                  alert('sucessfully logout')
                       
                  })
                .catch( err => alert(err.message) )
                localStorage.removeItem('uid')
             
        },


        profileaction:function(context){
            var mainprofiledata=[]
            axios.get('https://pg-app-fd8a7.firebaseio.com/user.json')
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

