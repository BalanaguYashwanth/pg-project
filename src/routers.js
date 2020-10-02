import pgowner from './components/pgowner.vue'
import register from './components/register.vue'
import login from './components/login.vue'
import ownerprofile from './components/ownerprofile'

export default[
    {path:'/pgowner',component:pgowner},
    {path:'/register',component:register},
    {path:'/login',component:login},
    {path:'/ownerprofile',component:ownerprofile}
]

