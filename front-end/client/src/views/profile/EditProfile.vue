<template>
  <el-dialog
    :visible.sync="dialogVisible"
    center
    height="210px"
    top="109px"
    width="456px"
  >
    <div class="dialog-title">Edit Profile</div>
    <div class="edit">
      <div>Your User Name:</div>
      <el-input v-model="editUserName"></el-input>
    </div>
    <div class="edit">
      <div>Your Group: ( ex: A Cappella )</div>
      <el-input v-model="editUserGroup"></el-input>
    </div>
    <div class="edit">
      <div>Your Description:</div>
      <el-input v-model="editUserDesc"></el-input>
    </div>
    <div class="edit">
      <div>Your Address:</div>
      <el-input v-model="editUserAddr"></el-input>
    </div>
    <div
      style="width:228px;display:flex; justify-content:flex-end;margin:auto;margin-top:16px;"
    >
      <el-button style="position: relative; right: 55px;" @click="editProfile">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditProfiles',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: this.visible,
      editUserName: '',
      editUserGroup: '',
      editUserDesc: '',
      editUserAddr: '',
    };
  },
  watch: {
    dialogVisible(newVal) {
      this.$emit('update:visible', newVal);
    },
    visible() {
      this.dialogVisible = this.visible;
    },
    // editUserName(newVal) {
    //   console.log(newVal);
    // },
  },
  methods: {
    editProfile() {
      this.$store.dispatch('profile/editProfile', {
        user_name: this.editUserName,
        self_tags: this.editUserGroup,
        self_description: this.editUserDesc,
        address: this.editUserAddr,
      });
      this.dialogVisible = false;
    },
    getProfile() {
      this.$store.dispatch('profile/getAllProfiles');
    },
  },
};
</script>

<style lang="stylus" scoped>
.dialog-title {
  text-align: center;
  font-size: 16px;
}

.edit {
  margin-top: 10px;
}
</style>
