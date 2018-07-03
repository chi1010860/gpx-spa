import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import { mutations } from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,

    // 嚴格模式，禁止直接修改 state
    strict: true
})