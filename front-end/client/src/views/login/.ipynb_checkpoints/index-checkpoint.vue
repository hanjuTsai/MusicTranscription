<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div style="padding-top: 15%; margin-left: 15%;">
          <img
            src="../../picture/sheet.jpg"
            style="box-shadow: 0px 5px 10px rgb(215, 215, 215);"
          />
        </div>
      </el-col>
      <el-col :span="8" :offset="3">
        <div style=" padding-top: 10%;">
          <div style="color: #4DABED; font-size: 73px;width: 500px">
            Music Converter
          </div>
          <div
            style="padding-left: 2px;color: rgb(215,215,215); font-size: 15px;letter-spacing:3px;margin-top: 3% ;"
          >
            An Efficient Sheet Transform App
          </div>
          <div style="width: 500px; margin-top: 15% ;color: rgb(150,150,150);">
            Music is an inalienable part of modern
            <br />people's life, of which transcribing has <br />always been a
            compulsory part of the music <br />department, and has always been a
            highly <br />technical skill in the music field.
          </div>
          <div style="width: 500px; margin-top: 10px ;color: rgb(150,150,150);">
            Therefore, we hope that through the
            <br />technology of artificial intelligence, <br />music can be
            converted into a notation, <br />thereby reducing the threshold
            requirement <br />for transcribing,
          </div>
          <button @click="signin" id="signinButton" class="google-btn">
            <div style="display: flex; align-items: center;">
              Sign in with Google
              <sheet-icon
                icon="google"
                size="sm"
                style="position: relative; left: 5px"
              ></sheet-icon>
            </div>
          </button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Login',
  beforeMount() {
    if (!this.isLoginCheck) {
      this.$store.dispatch('auth/CheckLoginStatus');
    } else {
      if (!this.isAuthenticated) {
        if (this.$router.history.current.path !== '/') this.$router.push('/');
      }
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      isLoginCheck: state => state.auth.isLoginCheck,
      first_login: state => state.auth.first_login,
    }),
  },
  methods: {
    signin() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          this.isSignIn = this.$gAuth.isAuthorized;
          this.$store.dispatch('auth/UserLogin', { user: GoogleUser });
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  watch: {
    first_login: function(first_login) {
      if (this.isAuthenticated) this.$router.push('/homepage');
      else {
        if (this.$router.history.current.path !== '/') this.$router.push('/');
      }
    },
    isLoginCheck: function(isLoginCheck) {
      if (this.isAuthenticated) this.$router.push('/homepage');
      else {
        if (this.$router.history.current.path !== '/') this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.google-btn {
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  min-width: 167px;
  padding: 19px 35px;
  text-transform: uppercase;
  color: #8692A4;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  border: none;
  background: 0 0;
  margin-top: 15%;
  box-shadow: 0px 5px 10px rgb(215, 215, 215);
}
</style>
