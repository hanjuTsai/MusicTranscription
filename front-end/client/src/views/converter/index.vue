<template>
  <div>
    <div style="height:60px; backgroundColor:white;">
    </div>
    <el-form  :model="form" label-width="80px">
      <el-row>
        <el-col :span="12">
          <div
            style="backgroundColor:#444444; height:600px; margin-right:12px; z-index: 0; "
          >
            <el-row>
              <el-col :span="4">
                <div
                  style="backgroundColor:#444444; width:100%; height:100px"
                ></div>
              </el-col>
              <el-col :span="16">
                <div
                  style="fontSize:50px; color:white; text-align:center; margin:24px"
                >
                  Upload File
                </div>
                <div>
                    <label align="center" for="file-upload" style="outline: none; cursor: pointer;">
                      <input
                        @change="fileChange"
                        id="file-upload"
                        type="file"
                        name="file"
                        accept=".wav, .mp3"
                      />
                      <div>
                        <img src="../../picture/uploadPic.jpeg" style="width:300px; height:300px">
                      </div>
                    </label>
                  </div>
                  <div style="fontSize: 20px; color: gray; text-align:center; margin-top:3px" v-if="existFile === 'red'">
                    click to upload
                  </div>
                  <div style="fontSize: 20px; color: gray; text-align:center; margin-top:3px" v-else>
                    {{uploadName}}
                  </div>
                  <div
                    style="fontSize: 15px; color: white; margin-top:12px"
                    slot="tip"
                  >
                    .wav and .mp3 only
                  </div>
                <div style="text-align:center">
                  <el-button
                    circle
                    id="fileCircle"
                    v-bind:style="{ backgroundColor: greenOrRed }"
                  >
                  </el-button>
                </div>
              </el-col>
              <el-col :span="4">
                <div
                  style="backgroundColor:#444444; width:100%; height:100px"
                ></div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="backgroundColor:#444444; height:600px; z-index: 0; ">
            <el-col :span="4"
              ><div
                style="backgroundColor:#444444; width:100%; height:100px"
              ></div
            ></el-col>
            <el-col :span="16" style="margin-top:40px">
              <div style="margin: 20px 0; color: white; fontSize: 30px">
                File Name :
              </div>
              <el-input
                type="text"
                placeholder=""
                v-model="form.fileTitle"
                maxlength="30"
                show-word-limit
              >
              </el-input>
              <div style="margin: 20px 0; color: white; fontSize: 30px">
                File Description :
              </div>
              <el-input
                type="textarea"
                placeholder=""
                v-model="form.fileDescrip"
                maxlength="100"
                show-word-limit
                rows="5"
              >
              </el-input>
              <el-row style="margin-top: 20px;">
                <el-col :span="4">
                  <el-switch
                    v-model="form.isSeparate"
                    active-color="#13ce66"
                    inactive-color="#888888"
                    style="margin-top:9px;"
                  >
                  </el-switch>
                </el-col>
                <el-col :span="8">
                  <div style="color: white; fontSize: 25px;">Separate</div>
                </el-col>
                <el-col :span="12">
                  <!-- <el-button
                    icon="el-icon-search"
                    circle
                    size="mini"
                    style="background-color:gray; color:white; margin-top:6px"
                    disabled
                  >
                  </el-button> -->
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-switch
                    v-model="form.isPublic"
                    active-color="#13ce66"
                    inactive-color="#888888"
                    style="margin-top:9px;"
                  >
                  </el-switch>
                </el-col>
                <el-col :span="8">
                  <div style="color: white; fontSize: 25px;">Public</div>
                </el-col>
                <el-col :span="12">
                  <!-- <el-button
                    icon="el-icon-search"
                    circle
                    size="mini"
                    style="background-color:gray; color:white; margin-top:6px"
                  >
                  </el-button> -->
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-switch
                    v-model="form.wantToTransform"
                    active-color="#13ce66"
                    inactive-color="#888888"
                    style="margin-top:9px;"
                  >
                  </el-switch>
                </el-col>
                <el-col :span="8">
                  <div style="color: white; fontSize: 25px;">Transcribe</div>
                </el-col>
                <el-col :span="12">
                  <!-- <el-button
                    icon="el-icon-search"
                    circle
                    size="mini"
                    style="background-color:gray; color:white; margin-top:6px"
                  >
                  </el-button> -->
                </el-col>
              </el-row>
              <el-button class="homepage_button_1" @click="onSubmit"
                ><div style="margin-top:-9px">Submit</div></el-button
              >
              <el-button class="homepage_button_1" @click="clear"
                ><div style="margin-top:-9px">Clear</div></el-button
              >
            </el-col>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Converter',
  data() {
    return {
      form: {
        fileTitle: '',
        fileDescrip: '',
        isSeparate: false,
        isPublic: false,
        wantToTransform: false,
        formData: null,
      },
      existFile: 'red',
      uploadName: '',
    };
  },
  created() {
    window.addEventListener('resize', this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  beforeMount() {
    if (!this.isLoginCheck) {
      this.$store.dispatch('auth/CheckLoginStatus');
    } else {
      if (this.isAuthenticated) {
        if (this.$router.history.current.path !== '/converter')
          this.$router.push('/converter');
      }
    }
  },
  computed: {
    ...mapState({
      file_path: state => state.converter.file_path,
      file_name: state => state.converter.file_name,
      isAuthenticated: state => state.auth.isAuthenticated,
      isLoginCheck: state => state.auth.isLoginCheck,
    }),
    greenOrRed: function() {
      return this.existFile;
    },
  },
  watch: {
    isLoginCheck: function(isLoginCheck) {
      if (this.isAuthenticated) {
        if (this.$router.history.current.path !== '/converter')
          this.$router.push('/converter');
      } else this.$router.push('/');
    },
  },
  methods: {
    onSubmit() {
      let success = false
      let fillInAll = false
      const converting = new Promise(async (resolve, reject) => {
        if (this.form.fileTitle !== '' && this.form.fileDescrip !== '' && this.existFile === "green"){ 
          fillInAll = true;
          if (this.form.isSeparate === true || this.form.wantToTransform === true){
            let result = await this.$store.dispatch('converter/save_music_file', this.form.formData);
            resolve(result);
          }
          else{
            alert('have to choose either separation or transcription');
            reject();
          }
        }
        else
          reject();
      })

      converting
      .then(async res => {
        if (res.file_path !== '' && res.file_name !== '') {
          let save_res = await this.$store.dispatch('converter/save_music_information', {
            title: this.form.fileTitle,
            description: this.form.fileDescrip,
            ispublic: this.form.isPublic,
            isseparate: this.form.isSeparate,
            isconvert: this.form.wantToTransform,
            file_path: res.file_path,
            file_name: res.file_name,
          });

          if (save_res === true){
            alert('succesful!!');
            this.$router.push('/profile');
          }
          else {
            if (fillInAll === false)
              alert('failed. You need to fill in all blocks');
          }
        }
        else
          return 0;
      })
      .catch(err => {
        console.error(err)
      })
    },
    clear() {
      this.form.fileTitle = '';
      this.form.fileDescrip = '';
      this.form.formData = null
      this.existFile = 'red';
    },
    fileChange(e) {
      this.existFile = 'green';
      // console.log(e.target.files[0])
      this.form.formData = e.target.files[0];
      this.uploadName = e.target.files[0].name;
      console.log(e.target.files[0].name)
    },
  },
};
</script>
<style lang="stylus" scoped>
.keyboard {
  width : 100%
  height: 75px
}
.homepage_button_1 {
  background-color: gray
  color: white
  font-size : 30px
  width:150px
  height:40px
  margin-top: 20px
}
#fileCircle {
  margin-top:20px
  margin-right:0%
}
input[type='file']
  display none
</style>
