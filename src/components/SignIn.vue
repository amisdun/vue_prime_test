<template>
  <div class="container">

    <div class="wrapper" style="width: 70%">
      <Card class="p-shadow-3">
      <template slot="title">
        <Message severity="error" v-if="response === 'failed'">{{response_err_msg}}</Message>
          Sign In Here
      </template>
      <template slot="content">
        <div class="p-grid p-fluid">
        <div class="p-col-12 p-md-4">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-envelope"></i>
            </span>
                <InputText v-model="email" placeholder="Email" required/>
            </div>
            <span style="color: red">{{error1}}</span>
        </div>
        <br>
        <div class="p-col-12 p-md-4">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-eye-slash"></i>
            </span>
                <InputText v-model="password" type="password" placeholder="password" required/>
            </div>
            <span style="color: red">{{error2}}</span>
            <br>
            <i class="pi pi-spin pi-spinner" v-show="loading" style="fontSize: 2rem"></i>
        </div>
      </div><br>
      <Button @click.prevent="signin_user" label="SignIn"/>
      </template>
      <template slot="footer">
          <router-link to="/">Don't have an Account? Sign Up</router-link>
      </template>
  </Card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import validator from 'validator'
export default {
  name: 'SignIn',
  data(){
    return {
      email: null,
      password: null,
      error1: "",
      error2: "",
      loading: false,
      response: "",
      response_err_msg: ""
    }
  },
  methods: {
    signin_user(){
      this.response = ""
      if(!this.email) this.error1 = "email required"
      else{
        if(!validator.isEmail(this.email)) this.error1 = "Invalid Email Format";
        else this.error1 = ""
      }
      if(!this.password) this.error2 = "Input your password";
      else this.error2 = "";

      if(
        this.email.length !== 0 &&
        validator.isEmail(this.email) &&
        this.password.length !== 0
      ){
        this.loading = true

        let self = this

        setTimeout(function(){
          self.signin_user_api(self.email,self.password)
        },1000)
      }
    },
    async signin_user_api(email,password){
      let data = {
        user: {
          email: email,
          password: password
        }
      }

      try {
        let login_user_response = await axios({url: 'https://api-staging.veryfy.net/auth/login', dataType: 'JSON', method: 'POST', data: data})
        let {headers,status} = login_user_response
        let user_token = headers.authorization.slice(6,)
        console.log(user_token)
        if(status === 204){
          this.loading = false
          this.$session.start()
          this.$session.set('user_token', user_token)
          this.$router.push({name: 'UserDashboard'})
        }
      } catch(e) {
          if(e.response.status === 401){
            this.response_err_msg = e.response.data.error
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
