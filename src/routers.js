import pgowner from './components/pgowner.vue'
import register from './components/register.vue'
import login from './components/login.vue'
import ownerprofile from './components/ownerprofile'
import customerregister from './components/customerregister'
import customerlogin from './components/customerlogin'
import customerprofile from './components/customerprofile'
import cremainder from './components/cremainder'
import schedules from './components/schedules'
import ownerschedule from './components/ownerschedule.vue'
import ownerdesk from './components/ownerdesk'
import ownerdeskdetails from './components/ownerdeskdetails'
import hireprofiles from './components/hireprofiles'
import careerprofiles from './components/careerprofiles'
import pgregister from './components/pgregister'
import pghome from './components/pghome'
import reviewschedules from './components/reviewschedules'
import schedulefood from './components/schedulefood'
import foodhistory from './components/foodhistory'
import cfoodhistory from './components/cfoodhistory'
import adminlogin from './components/adminlogin'
import adminregister from './components/adminregister'
import resetpassword from './components/resetpassword'
import Vue from 'vue'
import Vuerouters from 'vue-router'

Vue.use(Vuerouters)

const router = new Vuerouters({
 mode:'history',
 routes:[
    {path:'/pgowner',name:'pgowner',component:pgowner},
    {path:'/register',name:'register',component:register},
    {path:'/login',name:'login',component:login},
    {path:'/ownerprofile',name:'ownerprofile',component:ownerprofile},
    {path:'/customerlogin',name:'customerlogin',component:customerlogin},
    {path:'/customerregister',name:'customerregister',component:customerregister},
    {path:'/customerprofile',name:'customerprofile',component:customerprofile},
    {path:'/cremainder',name:'cremainder',component:cremainder},
    {path:'/schedules',name:'schedules',component:schedules},
    {path:'/ownerschedule',name:'ownerschedule',component:ownerschedule},
    {path:'/ownerdesk',name:'ownerdesk',component:ownerdesk},
    {path:'/ownerdeskdetails',name:'ownerdeskdetails',component:ownerdeskdetails},
    {path:'/hireprofiles',name:'hireprofiles',component:hireprofiles},
    {path:'/careerprofiles',name:'careerprofiles',component:careerprofiles},
    {path:'/pgregister',name:'pgregister',component:pgregister},
    {path:'/pghome',name:'pghome',component:pghome},
    {path:'/reviewschedules',name:'reviewschedules',component:reviewschedules},
    {path:'/schedulefood',name:'schedulefood',component:schedulefood},
    {path:'/foodhistory',name:'foodhistory',component:foodhistory},
    {path:'/cfoodhistory',name:'cfoodhistory',component:cfoodhistory},
    {path:'/adminlogin',name:'adminlogin',component:adminlogin},
    {path:'/adminregister',name:'adminregister',component:adminregister},
    {path:'/resetpassword',name:'resetpassword',component:resetpassword},
]
})


//const owner=['pgowner','ownerprofile','ownerdesk','foodhistory','ownerschedule','ownerdeskdetails']

const openRoutes=['login','register','customerlogin','customerregister','adminlogin','adminregister','pghome','careerprofiles','resetpassword']


router.beforeEach((to, from, next) => {
    
     
    if(openRoutes.includes(to.name)){
        next()
    }

    else if( localStorage.getItem('localid') ){
      next()
    }
    
    else{
        next('/customerlogin')
    }

})




export default router
