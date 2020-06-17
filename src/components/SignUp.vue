<template>
  <div class="container">
    <div class="wrapper" style="width: 70%">
      <Card class="p-shadow-3">
      <template slot="title">
        <Message severity="success" v-if="response === 'success'">Account created successfully, you have recieved a link in your inbox, click to confirm your email</Message>
        <Message severity="error" v-else-if="response === 'failed'">An error has occured try again later</Message>
          Sign Up Here
      </template>
      <template slot="content">
        <div class="p-grid p-fluid">
        <div class="p-col-12 p-md-4">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
            </span>
                <InputText v-model="firstname" placeholder="Firstname" />
            </div>
            <span style="color: red">{{error1}}</span>
        </div>
        <br>
        <div class="p-col-12 p-md-4">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
            </span>
                <InputText v-model="lastname" placeholder="Lastname"/>
            </div>
            <span style="color: red">{{error2}}</span>
        </div>
        <br>
        <div class="p-col-12 p-md-4">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-envelope"></i>
            </span>
                <InputText v-model="email" placeholder="Email"/>
            </div>
            <span style="color: red">{{error3}}</span>
        </div>
        <br>
        <div class="p-col-12 p-md-4">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-eye-slash"></i>
            </span>
                <InputText v-model="password" type="password" placeholder="password"/>
            </div>
            <span style="color: red">{{error4}}</span>
        </div>
        <br>
        <div class="p-col-12 p-md-4">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-eye-slash"></i>
            </span>
                <InputText v-model="confirm_password" type="password" placeholder="confirm password"/>
            </div>
            <span style="color: red">{{error5}}</span>
        </div>
        <br>
        <div class="p-col-12 p-md-4">
          <div class="p-field-checkbox">
              <Checkbox id="binary" v-model="terms_and_condition" :binary="true" />
              <p>Agree To Terms And Conditions</p>
          </div>
          <span style="color: red">{{error6}}</span>
          <i class="pi pi-spin pi-spinner" v-show="loading" style="fontSize: 2rem"></i>
        </div>
      </div>
      <Button @click.prevent="create_account" label="Create Account"/>
      </template>
      <template slot="footer">
        <router-link to="/SignIn">Have an account? Sign In</router-link>
      </template>
  </Card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import validator from 'validator'
export default {
  name: 'SignUp',
  data(){
    return {
      terms_and_condition: false,
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      confirm_password: null,
      error1: "",
      error2: "",
      error3: "",
      error4: "",
      error5: "",
      error6: "",
      loading: false,
      response: ""
    }
  },
  methods: {
    create_account(){
      this.response = ""
      if(!this.firstname) this.error1 = "Firstname required";
      else this.error1 = ""
      if(!this.lastname) this.error2 = "Lastname required"
      else this.error2 = ""
      if(!this.email) this.error3 = "email required"
      else{
        if(!validator.isEmail(this.email)) this.error3 = "Invalid Email Format"
        else this.error3 = ""
      }
      if(!this.password) this.error4 = "password required";
      else this.error4 = ""
      if(!this.confirm_password) this.error5 = "confirm password"
      else{
        if(this.password !== this.confirm_password) this.error5 = "password do not match"
        else this.error5 = ""
      }
      if(this.terms_and_condition === false) this.error6 = "Please accept terms and condition"
      else this.error6 = ""

      if(this.firstname.length !== 0 &&
          this.lastname.length !== 0 &&
          this.email.length !== 0 &&
          this.password !== 0 &&
          this.password === this.confirm_password &&
          this.terms_and_condition === true &&
          validator.isEmail(this.email)
      ){
        this.loading = true
        let self = this
        setTimeout(function(){
          self.create_account_api(self.firstname,self.lastname,self.email,self.password,self.confirm_password,self.terms_and_condition)
        },1000)
      }
    },
    async create_account_api(firstname,lastname,email,password,confirm_password,terms_and_condition){
      let data = {
        user : {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
          password_confirmation: confirm_password,
          market_id: '8db9987c-1255-42de-8e66-2a200971063b',
          terms_and_policy: terms_and_condition
        }
      }
      console.log("hello")
      try {
        let account_res = await axios({url: 'https://api-staging.veryfy.net/auth/signup', data: data, dataType: 'JSON',method: 'POST'})

        if(account_res.status === 200){
          this.loading = false
          this.response = "success"
          console.log(account_res.data)
          // let confirm_email = await axios({url: `https://api-staging.veryfy.net/auth/confirm_email/`})
        }
      } catch(e) {
        if(e){
          console.log(e.response)
          this.loading = false
          this.response = "failed"
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: center;
}
.container .wrapper{
  display: inline-block
}
</style>
