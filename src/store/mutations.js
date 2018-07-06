import * as types from './mutations_type'

// mutation 
export const mutations = {
    // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
    // ES2015 計算属性命名功能: 使用一個常量作為函式名
    [types.INCREASE](state, num) {
        // 在 mutation 改變 state（只有 mutation 可以改變！）
        // 第二個參數是接收 commit 傳遞的值: num
        // 計算邏輯，改變 state
        state.count += num;
        // console.log('INCREASE', num, 'state?', state.count)
    },
    [types.DECREASE](state, num) {
        state.count -= num;
        // console.log('DECREASE', num, 'state?', state.count)
    },
    [types.COUNT_RESET](state) {
        state.count = 0;
        // console.log('COUNT_RESET - state?', state.count)
    },
    [types.KEYTEXT_INIT](state, _keytext) {
        state.keytext = _keytext
        // console.log(state.keytext)
    },
    [types.LANGUAGE_CHANGE](state, _language) {
        state.language = _language
        // console.log(state.language)
    }
}