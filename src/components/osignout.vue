<template>
    <div class="container">
    <div id="container" > 
    <h2 class="display-3 "  id="container"> Successfully Sigined Out</h2>
    <h2 class="display-5 " id="container" > Thankyou for spending your valuable time </h2>
    <a href="http://localhost:8080/ownerlogin">  Back to login </a>
    </div>
    </div>
</template>

<script>
document.cookie = 'cookie1=value1; SameSite=Lax';
// Set a cross-site cookie for third-party contexts
document.cookie = 'cookie2=value2; SameSite=None; Secure';
export default {
    created(){
      localStorage.removeItem("localid");
      localStorage.removeItem("idtoken");
      localStorage.removeItem("id");
    }
}
</script>

<style scoped>

.container{
    text-align: center;
    text-transform: capitalize;
    margin-top: 200px;
    font-family: "Lucida Console", Courier, monospace;
}

@media only screen and (max-width: 600px) {



#container{
    font-size:1em;
}

}
</style>