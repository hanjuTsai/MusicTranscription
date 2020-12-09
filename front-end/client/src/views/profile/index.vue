<template>
  <div>
    <div style="height:60px; backgroundColor:white;">
      </div>
    <el-row>
      <el-col :span="9" style="background-color: white;">
        <div style="color:#BFC4CC; float: right; padding: 20px">
          {{ name }}
        </div>
        <div
          style="display: flex; flex-direction: column; justify-content:space-around; align-items: center; margin-top: 100px; height: 500px"
        >
          <div
            style="width: 200px; height: 200px; border-radius: 50%; background-color: #6CC0AF; display: flex; justify-content:center; align-items: center;"
          >
            <!-- <div style="color: white; font-weight: bold; font-size: 40px">
              U
            </div> -->
            <img :src="userPic" style="width: 200px; height: 200px; border-radius: 50%;" />
          </div>
          <div style="font-size: 20px">{{ userName }}</div>
          <div style="color: #A1ACBB">{{ userGroup }}</div>
          <div style="color: #69B8F0">{{ userPosition }}</div>
          <div
            style="color: #8692A4; font-size: 10px; width: 100px; word-break: break-all"
          >
            {{ userDesc }}
          </div>
          <el-button
            style="width: 35px; height: 35px; background-color: #ffffff; display: flex; justify-content: center; align-items: center;"
            icon="el-icon-edit"
            circle
            @click="editProfileVisible = true"
          ></el-button>
        </div>
      </el-col>
      <el-col :span="15" style="background-color: #494949">
        <el-row style="padding: 20px;">
          <el-col :span="24" style="height: 20px; text-align: center; color: #ffffff; font-size: 28px"><b>Uploaded Works</b></el-col>
        </el-row>
        <div class="profile-table-container" style="overflow: auto; display: flex; justify-content: center; padding: 30px 40px 20px 40px">
          <el-table :data="upload_works">
            <el-table-column
              prop="title"
              label="Title"
              width="220"
            ></el-table-column>
            <el-table-column
              prop="description"
              label="Description"
              width="300"
            ></el-table-column>
            <el-table-column label="" align="right">
              <template slot-scope="scope">
                <el-button
                  @click.native="check(scope.$index, scope.row)"
                  size="mini"
                  circle
                >
                  <sheet-icon
                    icon="eye"
                    size="sm"
                    style="position: relative; left: 1px; top: 1px"
                  ></sheet-icon>
                </el-button>
                <el-button
                  @click.native="download(scope.$index, scope.row)"
                  size="mini"
                  circle
                >
                  <sheet-icon
                    icon="download"
                    size="sm"
                    style="position: relative; left: 1px; top: 1px"
                  ></sheet-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <edit-profile :visible.sync="editProfileVisible"></edit-profile>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import EditProfile from './EditProfile.vue';
export default {
  name: 'Profile',
  components: {
    EditProfile,
  },
  data() {
    return {
      name: '',
      userId: '',
      userName: '',
      userGroup: '',
      userPosition: '',
      userPic: '',
      userDesc: '',
      sheetCount: 0,
      editProfileVisible: false,
      uploadWorks: [],
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      isLoginCheck: state => state.auth.isLoginCheck,
      profiles: state => state.profile.profiles,
    }),
    upload_works() {
      return this.profiles.upload_works;
    }
  },
  watch: {
    editProfileVisible(newVal) {
      if (!newVal) window.location.reload();
    },
    profiles(newVal) {
      console.log(newVal);
      this.name = `@${newVal.name}`;
      this.userId = newVal.google_id;
      this.userName = newVal.username;
      this.userDesc = newVal.self_description;
      this.userPosition = newVal.address;
      this.userGroup = newVal.self_tags;
      this.sheetCount = newVal.upload_works.length;
      this.uploadWorks = newVal.upload_works;
      this.userPic = newVal.profile_picture_url;
      // console.log(this.uploadWorks);
    },
    isLoginCheck: function(isLoginCheck) {
      if (!this.isLoginCheck) {
        this.$store.dispatch('auth/CheckLoginStatus');
      } else {
        if (this.isAuthenticated) this.getProfile();
        else this.$router.push('/');
      }
    },
  },
  methods: {
    getProfile() {
      this.$store.dispatch('profile/getAllProfiles');
      // console.log('start');
    },
    check(index, data) {
      this.$store.dispatch('explore/openPortfolio', {
        _id: data._id,
        path: data.pdf_file_path,
      });
    },
    download(index, data) {
      this.$store.dispatch('explore/downloadPortfolio', {
        _id: data._id,
        path: data.pdf_file_path,
      });
    }
  },
  mounted() {
    this.getProfile();
  },
};
</script>
<style lang="stylus" scoped>
.el-col
  height: 100vh
</style>
<style lang="stylus">
.profile-table-container .el-table td
  border-bottom: 1px solid #ffffff
  background-color: #494949

.profile-table-container .el-table th, .profile-table-container .el-table tr
  background-color: #494949

.profile-table-container .el- table::before
  left: 0
  bottom: 0
  width: 100%
  height: 0px

.profile-table-container .el-table thead
  color: #ffffff
  font-weight: 500

.profile-table-container .el-table .cell
  color: #ffffff

.profile-table-container .el-table__body tr:hover>td, .profile-table-container .el-table__body tr.current-row>td
  background-color: transparent !important
</style>
