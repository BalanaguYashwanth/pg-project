import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import {fb} from '../firebase'
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
        id:[],
        foodschedules:[],
        pgnames:[],
        admin:"",
        posts:[],
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

        getfood:function(state,foodusers){
            state.foodschedules=foodusers
        },

        getpg:function(state,pg){
            state.pgnames=pg  
        },

        getadmin:function(state,admin){
            state.admin=admin
        },

        postdata:function(state,post){
           
            state.posts=post
           
        }

    },

    actions:{
        
        getpgnames:function(context){
            axios.get('http://127.0.0.1:5000/get/pgregisters')
            .then(res=>{
                context.commit('getpg',res.data)
            })
            .catch(err=>console.log(err))
        },
        
        getuseraction: async function(context){
            
            
            document.cookie = 'cookie1=value1; SameSite=Lax';
            document.cookie = 'cookie2=value2; SameSite=None; Secure';

            axios.post('http://127.0.0.1:5000/getcurrentuser',{
                uid:localStorage.getItem('localid'),
              }).then(res=>{
                  //console.log(res.data)
                if(res)
                {
                context.commit('getuser',res.data.email)
                context.commit('getowner',res.data.owner)
                context.commit('getadmin',res.data.admin)
                }
                else{
                    console.log('user: error in user or user not signin')
                }
                })
              .catch(err=>{
                  console.log(err.response.data.message)
                
                })
            
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
                        //console.log( data[obj])
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
            .catch(err=>console.log(err.response)),


            axios.get('http://127.0.0.1:5000/token')
            .then(res=>{
               // console.log(res.data.token)
                localStorage.setItem('token',res.data.token)
            })

            .catch(err=>console.log(err))

          
        },

        
        postsaction: function(context){
            
            if (localStorage.getItem("localid")) {
                
                 axios
                  .get("http://127.0.0.1:5000/get1/posts")
                  .then((res) => {
                 
                  var data = res.data;
                  var blogs=[]
                  for(let key in data)
                  { 
                    data[key].id=key
                    blogs.push(data[key])
                  }
                  context.commit('postdata',blogs)
                  })
                .catch((err) => console.log(err));
              }
               else {
                console.log("user not  authenticated");
              }
        },



        scheduleaction:function(context){
            axios.get('http://127.0.0.1:5000/get/customerschedule')
            .then(res=>{
                //console.log(res)
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

        foodaction:function(context){
            axios.get('http://127.0.0.1:5000/get/schedulefood')
            .then(res=>{
                //console.log(res)
                let array=[]
                let resdata=res.data
                for( let obj in resdata )
                {
                    resdata[obj].id=obj
                    array.push(resdata[obj])
                }
                context.commit('getfood',array)
                //console.log(array)
            })
            .catch(err=>console.log(err))
        },

        userregisters:function(context){
            axios.get('http://127.0.0.1:5000/get/userregisters')
            .then(res =>{
                //console.log('users',res)
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
            this.$router.push("/login");
            localStorage.removeItem("localid");
            localStorage.removeItem("idtoken");
            localStorage.removeItem("id");
        },


        profileaction:async function(context) {
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
        },

        authowner: async (state) => {
            let routing= await state.owner
            if(!routing)
            {
                
              localStorage.removeItem("localid");
              localStorage.removeItem("idtoken");
              localStorage.removeItem("id");
            }
            //console.log(state.owner)
        }

    },

})

