import Vue from 'vue'
import mutations from './mutations'

// 引入 mutations_type (引用同一個key)
import * as types from './mutations_type'

export const actionIncrease = ({ commit }, num) => {
    /*
        第二個參數是接收 Vue 傳遞的 value: num
        template 上面我們是這們寫的:
        @click="actionIncrease(num)"
   */

    // 不調用parseInt 會變成字串相加, 奇怪bug
    num = parseInt(num)
    console.log('actionIncrease', num)
    commit(types.INCREASE, num)
}

export const actionDecrease = ({ commit }, num) => {
    num = parseInt(num)
    console.log('actionDecrease', num)
    commit(types.DECREASE, num)
}

export const actionCountReset = ({ commit }) => {
    console.log('actionCountReset')
    commit(types.COUNT_RESET)
}

export const actionKeytextInit = ({ commit }, keytext) => {
    console.log('actionKeytextInit')
    commit(types.KEYTEXT_INIT, keytext)
}

export const actionLanguageChange = ({ commit }, language) => {
    console.log('actionLanguageChange')
    commit(types.LANGUAGE_CHANGE, language)
}