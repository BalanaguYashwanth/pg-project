<template>
    <div class="container">
    <div id="container" > 
    <h2 class="display-3 "  id="container"> Coming Soon</h2>
    <h2 class="display-5 " id="container" > Please contact your owner for more information... </h2>
   
    </div>
    </div>
</template>

<script>
document.cookie = 'cookie1=value1; SameSite=Lax';
// Set a cross-site cookie for third-party contexts
document.cookie = 'cookie2=value2; SameSite=None; Secure';
export default {
   
}
</script>

<style scoped>

.container{
    text-align: center;
    text-transform: capitalize;
    margin-top: 200px;
}

@media only screen and (max-width: 600px) {



#container{
    font-size:1em;
}

}
</style>