import pgowner from './components/pgowner.vue'
import ownerregister from './components/ownerregister.vue'
import ownerlogin from './components/ownerlogin.vue'
import ownerprofile from './components/ownerprofile'
import register from './components/register'
import login from './components/login'
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
import signout from './components/signout'
import feedback from './components/feedback'
import reviewfeedback from './components/reviewfeedback'
import osignout from './components/osignout'
import payments from './components/payments'
import Vue from 'vue'
import Vuerouters from 'vue-router'
import template from './components/template'
Vue.use(Vuerouters)

const router = new Vuerouters({
 mode:'history',
 routes:[
    {path:'/pgowner',name:'pgowner',component:pgowner},
    {path:'/ownerregister',name:'ownerregister',component:ownerregister},
    {path:'/ownerlogin',name:'ownerlogin',component:ownerlogin},
    {path:'/ownerprofile',name:'ownerprofile',component:ownerprofile},
    {path:'/login',name:'login',component:login},
    {path:'/register',name:'register',component:register},
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
    {path:'/signout',name:'signout',component:signout},
    {path:'/feedback',name:'feedback',component:feedback},
    {path:'/reviewfeedback',name:'reviewfeedback',component:reviewfeedback},
    {path:'/template',name:'template',component:template},
    {path:'/osignout',name:'osignout',component:osignout},
    {path:'/payments',name:'payments',component:payments}
]
})


//const owner=['pgowner','ownerprofile','ownerdesk','foodhistory','ownerschedule','ownerdeskdetails']

const openRoutes=['ownerlogin','ownerregister','login','register','adminlogin','adminregister','pghome','careerprofiles','resetpassword','signout','template','osignout']


router.beforeEach((to, from, next) => {
    
     
    if(openRoutes.includes(to.name)){
        next()
    }

    else if( localStorage.getItem('localid') ){
      next()
    }
    
    else{
        next('/login')
    }

})




export default router
