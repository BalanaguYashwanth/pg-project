<template>
    <div class="container">

    <h2 class="display-2 " > Successfully Sigined Out</h2>
    <h2 class="display-5 " > Thankyou for spending your valuable time </h2>
    </div>
</template>

<script>
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
}

</style>