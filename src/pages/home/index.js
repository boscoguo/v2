import React, { Component } from 'react';
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { 
	HomeWrapper,
	HomeLeft,
	HomeRight 
} from "./style.js"

class Home extends Component {
	render() {
		return (
 		   <HomeWrapper>
 				<HomeLeft>
 					<img className="banner-img" src="https://image-static.segmentfault.com/129/279/1292791996-5d6f85c595a65" />		
 					<Topic />
 					<List />
 				</HomeLeft>
 				<HomeRight>
					<Recommend />
 					<Writer />
 				</HomeRight>		
 		   </HomeWrapper>		
		)
	}
}
export default Home;