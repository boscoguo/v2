import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    inputValue: "Search food",
    list: [],
    switchList: false,
    weight: '',
    height: '',
    first: '',
    last: ''
})
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.SHOW_LIST:
            return state.set('switchList', "true")
        case constants.HIDE_LIST:
            return state.set('switchList', "false")
        case constants.CHANGE_FOCUS:
            return state.set('inputValue', " ")
        case constants.CHANGE_BLUR:
            return state.set('inputValue', "Search food")
        case constants.CHANGE_INPUT:
            return state.set('inputValue', action.value)
        case constants.CHANGE_SEARCH_LIST:
            let arr = [...action.common, ...action.branded]
            arr = fromJS(arr)
            // console.log(arr)
            return state.set("list", arr)
        case constants.INITIAL_INFOR:
            return state.merge({
                weight:action.weight,
                height:action.height,
                first:action.first,
                last:action.last
            })
        default:
            return state;
    }
}