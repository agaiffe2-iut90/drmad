import vue from 'vue';
import vuex from 'vuex';

import bank from './bank';
import shop from './shop';

vue.use(vuex);

export default new vuex.Store({
  modules: {
    bank,
    shop,
  },
});