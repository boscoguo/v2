import * as constants from './constants'
import { fromJS } from 'immutable'
import axios from 'axios'

export const changeFocus = () => ({
	type: constants.CHANGE_FOCUS
})
export const changeBlur = () => ({
	type: constants.CHANGE_BLUR
})
export const changeInput = (value) => ({
	type: constants.CHANGE_INPUT,
	value: value
})
export const showList = () => ({
	type: constants.SHOW_LIST
})

export const hideList = () => ({
	type: constants.HIDE_LIST
})

export const getSearchList = () => {
	return (dispatch) => {
		axios.get('https://trackapi.nutritionix.com/v2/search/instant?query=cheese', {
			headers: {
				'x-app-id': 'dd895124',
				'x-app-key': '4956f3a095fc23e51b8b2be56956eeba',
			}
		})
			.then(function (response) {
				const data = response.data
				console.log(data)
				dispatch(changeSearchList(data.common, data.branded))
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export const changeSearchList = (common, branded) => ({
	type: constants.CHANGE_SEARCH_LIST,
	common: fromJS(common),
	branded: fromJS(branded)
})

export const test = () => {
	return (dispatch) => {
		axios.get('/api/mockData.json').then((res) => {
			const data = res.data;
			console.log(data);
			dispatch(initialInfor(data.weight_kg,data.height_cm,data.first_name,data.last_name));   
		}).catch((e) => {
			console.log(e)
		})
	}
}

export const initialInfor = (weight,height,first,last) => ({
	type: constants.INITIAL_INFOR,
	weight:fromJS(weight),
	height:fromJS(height),
	first:fromJS(first),
	last:fromJS(last)
})
// export const searchFocus = () => ({
// 	type: constants.SEARCH_FOCUS
// })

// export const searchBlur = () => ({
// 	type: constants.SEARCH_BLUR
// })
// export const mouseEnter = () => ({
// 	type:constants.MOUSE_ENTER
// })
// export const mouseLeave = () => ({
// 	type:constants.MOUSE_LEAVE
// })
// export const changePage = (page) => ({
// 	type:constants.CHANGE_PAGE,
// 	page:page
// })
// export const getList = () => {
// 	return (dispatch) => {
//          axios.get('/api/headerList.json').then((res) => {
//          	   const data = res.data;
//                dispatch(changeList(data.data))
//          }).catch(() => {
//          	console.log("error")
//          })
// 	}
// }

// const changeList = (data) => ({
// 	type:constants.CHANGE_LIST,
// 	data:fromJS(data),
// 	totalPage: Math.ceil(data.length/10)
// })