import Vue from 'vue';
import Vuex from 'vuex';
import Homepage from '../src/reducers/homepage';
import Profile from '../src/reducers/profile';
import Converter from '../src/reducers/converter';
import Explore from '../src/reducers/explore';
import Auth from '../src/reducers/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    homepage: Homepage,
    profile: Profile,
    converter: Converter,
    explore: Explore,
    auth: Auth,
  },
});
