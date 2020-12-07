<template>
    <div>
    
    <nav  class="navbar navbar-expand-lg  navbar-dark" >
        <div class="container" >
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse"   id="navbarTogglerDemo01">
                <div class="navbar-nav py-2 px-5   mx-5"  >
                  <img  src="../assets/logo.jpeg" id="logo" class="rounded-circle" style="height:50%;width:25%" alt="logo" >
                </div>
                <div class="navbar-nav py-2 px-5 mx-4 " >
                    <a class="nav-item nav-link active" > Home </a>
                    <a class="nav-item nav-link" href="#features" > Features </a>
                    <a class="nav-item nav-link"  href="#contactus"> Contact us </a>
                    <div  class="dropdown"  >  
                    <a class="nav-item nav-link" id="nav" > Login </a>
                    <div class="dropdown-content">
                        <a href="https://livenextpg.com/login">Customer login</a>
                        <a href="https://livenextpg.com/ownerlogin">Owner login</a>
                    </div>
                    </div>
                
                </div>
            </div>
        </div>
    </nav>

    <div class="jumbotron rounded-0 px-0 flex-header flex-background-colour py-0 bg-white" >
        <div class="container" style="margin-top: 50px;">
            <div class="row" >
                <div class="col-md-12 text-left offset-md-0" >
                    <div class="pt-3 pb-5" >
                        <div class="row" >
                            <div class="col-md-5" >
                                <img class="w-100 img-fluid mt-4"  id="pgManagement" src="../assets/image.jpg" alt="pg Management ">
                            </div>
                            <div id="maintitle" >
                                <h1 class="text-slate font-size--64 font-weight-300 mb-1"> PG's & Hostels  </h1>
                                <p class=" display-4" id="management" >Smart Management Tool </p>
                                <h5 class="text-slate font-size--64 font-weight-300 mb-1" > We offers and provides better solutions for pg's and hostels to make <br>  their life smarter </h5>
                                <br>
                                <p class="text-slate-20 font-size--14 mt-2 mb-1">Call to get set up by  our specialist.</p>
                                <a href="tel:+91 9629975138" class="color-blue"><i class="fa fa-phone mr-1" aria-hidden="true"></i>+91 9629975138</a>
                                <br>
                                <a href="tel:+91 9629976249" class="color-blue"><i class="fa fa-phone mr-1" aria-hidden="true"></i>+91 9629976249</a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-neutral-20 pb-3 position-relative pb-lg-6 pb-5" id="features" > 
        <br>
    <h2 class="text-center text-tw-slate font-size--36 col-sm-12 mb-5"  >
        <p>Our Features</p>
    </h2>
    <div class="container position-relative z2"   >
        <div class="row " >
           
             <div class="col-md-4  col-lg-4  ">
                <div class="card p-5 shadow "  style="width: 20em;">
                    <h2 style="text-align:center; font-weight: 400; margin:0px; " class=" card-title p-3  ">
                          Owner desk
                    </h2>
                    <div class="card-block   ">
                        <p>
                            To track the all customers interms of check-ins and rents
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-4 col-lg-4   ">
                <div class="card p-5 shadow "  style="width: 20em;">
                 
                    <h3 style="text-align:center; font-weight: 400; margin:0px; " class=" card-title p-3  " >
                         Updates
                    </h3>
                    <div class="card-block   ">
                        <p>
                            updates for your customers in your pg/hostel either food or events etc
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-4 col-lg-4 ">
                <div class="card p-5 shadow "  style="width: 20em;">
                 
                    <h3 style="text-align:center; font-weight: 400;  margin:0px;" class=" card-title p-3  " >
                        Quick services
                    </h3>
                    <div class="card-block   ">
                        <p>
                             customer need services like repair, cleaning etc will quicky notify you etc
                        </p>
                    </div>
                </div>
            </div>


             <div class="col-md-4 col-lg-4  ">
                <div class="card p-5 shadow "  style="width: 20em;">
                 
                    <h3 style="text-align:center; font-weight: 400;  margin:0px;" class=" card-title p-3  " >
                        Complaints
                    </h3>
                    <div class="card-block   ">
                        <p>
                            If any complaints are you facing in pg/hostels you can address in our dashboards
                        </p>
                    </div>
                </div>
            </div>


            <div class="col-md-4 col-lg-4  ">
                <div class="card p-5 shadow "  style="width: 20em;">
                 
                    <h3 style="text-align:center; font-weight: 400; margin:0px;" class=" card-title p-3  " >
                        Payments
                    </h3>
                    <div class="card-block   ">
                        <p>
                            customer can do digital payments like credit cards, debitcards and other wallets 
                        </p>
                    </div>
                </div>
            </div>


            <div class="col-md-4 col-lg-4  ">
                <div class="card p-5 shadow "  style="width: 20em;">
                 
                    <h3 style="text-align:center; font-weight: 400; margin:0px;" class=" card-title p-3  " >
                       Other services
                    </h3>
                    <div class="card-block   ">
                        <p>
                            If any feature is missing in our software, you can quickly contact us to add...
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
    <div>
        <form>
            <div class="container" id="contactus" >
                <br>
                <h1  style="text-align:center"> Contact us for more info </h1>
                <br>
                
                <div class="row">
                    <div class="col-md-6" >
                        Name
                        <input type="text" placeholder="Enter your name" class="form-control" v-model="name">
                    </div>
                    <div class="col-md-6" >
                        Phone number
                        <input type="text" placeholder="Enter your phonenumber" class="form-control"  v-model="phonenumber">
                    </div>
                    <br>
                    <br>
                    <br>
                     <div class="col-md-6" >
                        Email
                        <input type="email"  placeholder="Enter your email (optional)" class="form-control"  v-model="email">
                       
                    </div>
                    
                     <div class="col-md-6" >
                        Subject
                        <input type="text"  placeholder="Enter your subject (optional)"  class="form-control"  v-model="subject">
                       
                    </div>
                    <br>
                    <br>
                    <br>
                </div>

                <div > 
                    Message 
                    <textarea name="" id=""   placeholder="Type your message..."  class="form-control" v-model="message" rows="10"></textarea>
                </div>
                    <br>
                  <button class="btn btn-secondary"  v-on:click.prevent="posting"> submit </button>
            </div>
           <h4 style="text-align:center">   {{info}} </h4>
        </form>
    </div>

    <br>
    

    <footer  id="website" style="text-align:center; color:white">
        <br>
           <p>  Terms of service  Privacy policy</p>
        <p  >  © 2020 - LiveNext PG  &    Website Designed and Developed by liveNext PG </p>
     
       <br>
    </footer>


    </div>
</template>

<script>
import axios from 'axios'
export default {
    
    data(){
        return{
            name:'',
            phonenumber:'',
            email:'',
            subject:'',
            message:'',
            info:'',
        }
    },

    methods:{
                

        posting:function(){

           if( this.name!="" && this.phonenumber!="" && this.message!="" )
           {     
                axios.post('https://pg-v1.herokuapp.com/post/contactus',{
                    name:this.name,
                    phonenumber:this.phonenumber,
                    email:this.email,
                    subject:this.subject,
                    message:this.message
                }).then(res=>{
                    console.log(res)
                    this.info="successfully submitted"
                    })
                .catch(err=>console.log(err)) 
                

                this.name="";
                this.phonenumber="";
                this.email="";
                this.subject="";
                this.message="";
               
                
            }
            else{
                this.info='please enter the valid inputs'
            }


        }

    }


}
</script>

<style >
    footer {
        display: block;
      }

    .jumbotron {
        font-family: FaktSoft, Arial, Helvetica, "sans-serif";
        background-repeat: no-repeat;
        background-size:cover;
        
    }

    #mainbody{
        background-color: rgb(66, 66, 66);
    }

    .navbar {
        background-color: rgb(66, 66, 66);
    }

    .nav-item{
        color: white;
       
    }

    .nav {
        text-transform: capitalize;
        
    }

    .rows{
        margin-left: auto;
    }


    .bg-neutral-20{
        background-color:#eceff3!important;
    }

.card-title:hover{
  background: rgba(255,255,255,0.5);
}

.card:hover {
  transform: scale(1.1) !important;
  transition: 0.3s;
}

.card{
    text-transform: capitalize;
    color:#000000;
    transition:0.25s;
    font-size:1rem; 
    margin-bottom: 30px !important;
  border-radius: 8px !important;
  background-position: left !important;
}

footer{
    background-color: rgb(66, 66, 66);
}



.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 140px;
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.1);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}


@media only screen and (max-width: 600px) {
  
   #maintitle{
    margin: auto;
    text-align: center;
    
   }

   #management{
       font-size:2.0rem ;
   }

   #website{
       font-size: 10px;
   }
  
}


@media only screen and (max-width: 767px) {
  #maintitle{
    margin: auto;
    text-align: center;
    
   }

   #management{
       font-size:2.0rem ;
   }
  
}


</style>