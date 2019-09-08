import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as pageReducer } from '../pages/store/';
// import headerReducer from '../common/header/store/reducer'
const reducer = combineReducers({
    header:headerReducer,
    page:pageReducer
})

export default reducer
