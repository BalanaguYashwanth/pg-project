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


export default[
    {path:'/pgowner',component:pgowner},
    {path:'/register',component:register},
    {path:'/login',component:login},
    {path:'/ownerprofile',component:ownerprofile},
    {path:'/customerlogin',component:customerlogin},
    {path:'/customerregister',component:customerregister},
    {path:'/customerprofile',component:customerprofile},
    {path:'/cremainder',component:cremainder},
    {path:'/schedules',component:schedules},
    {path:'/ownerschedule',component:ownerschedule},
    {path:'/ownerdesk',component:ownerdesk},
    {path:'/ownerdeskdetails',component:ownerdeskdetails},
    {path:'/hireprofiles',component:hireprofiles},
    {path:'/careerprofiles',component:careerprofiles},
    {path:'/pgregister',component:pgregister},
    {path:'/pghome',component:pghome},
    {path:'/reviewschedules',component:reviewschedules},
    {path:'/schedulefood',component:schedulefood},
    {path:'/foodhistory',component:foodhistory},
    {path:'/cfoodhistory',component:cfoodhistory}
]

