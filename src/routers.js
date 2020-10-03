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
    {path:'/ownerschedule',component:ownerschedule}
]

