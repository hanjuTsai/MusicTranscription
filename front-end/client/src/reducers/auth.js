import agent from './agent';

const Auth = {
  namespaced: true,
  state: {
    isLoginCheck: false,
    isAuthenticated: false,
    first_login: false,
    user: {},
    error: false,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload.user;
      state.isAuthenticated = !!payload.user;
      state.first_login = true;
      state.error = false;
    },
    CHECK_LOGIN_STATUS(state, payload) {
      state.user = payload.user;
      state.isAuthenticated = !!payload.user;
      state.isLoginCheck = true;
      state.error = false;
    },
    ERROR_OCCUR(state) {
      state.error = true;
    },
    LOGOUT(state) {
      state.isLoginCheck = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = false;
    },
    NOT_LOGIN(state) {
      state.isLoginCheck = true;
    },
  },
  actions: {
    UserLogin({ commit }, { user }) {
      agent
        .post('login/google', { user: user })
        .then(res => {
          commit('SET_USER', res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    CheckLoginStatus({ commit }) {
      agent
        .get('login/check_status')
        .then(res => {
          if (res.data.type === 'success') {
            commit('CHECK_LOGIN_STATUS', res.data);
          } else {
            commit('NOT_LOGIN');
          }
        })
        .catch(err => {
          console.error(err);
          commit('ERROR_OCCUR');
        });
    },
    Logout({ commit }, history) {
      agent
        .get('logout')
        .then(res => {
          commit('LOGOUT');
          history.push('/');
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  getters: {},
};

export default Auth;
