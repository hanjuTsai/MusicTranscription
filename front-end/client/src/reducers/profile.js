import agent from './agent';

const Profile = {
  namespaced: true,
  state: {
    profiles: {},
  },
  mutations: {
    GETPROFILE(state, payload) {
      state.profiles = payload;
    },
  },
  actions: {
    getAllProfiles({ commit }) {
      agent
        .get(`profile/get_profile`)
        .then(res => {
          commit('GETPROFILE', res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    editProfile(
      { commit },
      { user_name, self_tags, self_description, address }
    ) {
      agent
        .post('profile/edit_profile', {
          username: user_name,
          self_tags: self_tags,
          self_description: self_description,
          address: address,
        })
        .then(res => {
          console.log(res.status);
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  getters: {},
};

export default Profile;
