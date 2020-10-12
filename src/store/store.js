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
        alluserregisters:[],
        owner:[]
    },
    getters:{

    },

    mutations:{

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
        //    await fb.auth().onAuthStateChanged(function(user){
        //         if(user)
        //         {
        //         var email=user.email
        //         var userid=user.uid
               
        //         var photoURL=user.photoURL
        //         var displayName=user.displayName
        //         context.commit('getuser',email,displayName,photoURL)     
        //         context.commit('getname',displayName)     
        //         context.commit('getphoto',photoURL)  
        //         console.log(user)
        //         localStorage.setItem('uid',userid)
        //         }
        //         else{
        //             //console.log('user: error in user or user not signin')
        //         }
        //     })

            axios.post('http://127.0.0.1:5000/getcurrentuser',{
                uid:localStorage.getItem('localid'),
              }).then(res=>{
                if(res)
                {
                console.log('owner:',res.data.owner)
                context.commit('getname',res.data.display_name)
                context.commit('getuser',res.data.email)
                context.commit('getphoto',res.data.photo_url)
                context.commit('getowner',res.data.owner)
                }
                else{
                    console.log('user: error in user or user not signin')
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

