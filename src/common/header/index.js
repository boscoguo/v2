import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Button,
    SearchWrapper,
    SearchInfor,
    SearchInforTitle,
    SearchInforSwitch,
    SearchInforItem,
    SearchInforList
} from './style'
import { actionCreators } from './store'

import { GlobalStyle } from '../../statics/iconfont/iconfont'

class Header extends Component {

    getListArea() {
        const { focused, list, page, totalPage, mouseIn, handleMouseEnter,handleMouseLeave, handleChangePage } = this.props
        const newList = list.toJS()
        const pageList = []

        if (newList.length) {
            for (let i = (page - 1) * 10; i <= page * 10; i++) {
                    pageList.push(
                        <SearchInforItem key={ newList[i] }>{ newList[i] }</SearchInforItem>
                    )
                }
        }
        if (focused || mouseIn) {
            return (
                <SearchInfor 
                    onMouseEnter= {handleMouseEnter}
                    onMouseLeave= {handleMouseLeave}
                >
                   <SearchInforTitle>
                      热门搜索
                      <SearchInforSwitch onClick = {() => handleChangePage(page, totalPage, this.spinIcon)}>
                          <i ref={(icon) => {this.spinIcon = icon}} className = 'iconfont spin'>&#xe613;</i>
                          换一批
                      </SearchInforSwitch>
                   </SearchInforTitle>
                   <SearchInforList>
                        {pageList}
                   </SearchInforList>
                </SearchInfor>
            )
        } else {
            return null
        }
    }


    render() {
        const { focused, list,handleInputFocus, handleInputBlur, } = this.props
        return (
            <HeaderWrapper>
              <Logo href="/"/>
              <Nav>
                  <NavItem className = 'left active'>首页</NavItem>
                  <NavItem className = 'left'>下载App</NavItem>
                  <NavItem className = 'right'>登陆</NavItem>
                  <NavItem className = 'right'>
                  <GlobalStyle/>
                  <i className = 'iconfont'>&#xe636;</i>
                  </NavItem>
                  <Sea0rchWrapper>
                      <CSSTransition
                        in= { focused }
                        timeout = {200}
                        classNames = "slide"
                      >
                          <NavSearch
                              className = {focused ? 'focused' : ''}
                              onFocus = {() =>handleInputFocus(list)}
                              onBlur = { handleInputBlur }
                          ></NavSearch>
                      </CSSTransition>
                      
                      <i className = {focused ? 'focused iconfont zoom' : 'iconfont zoom'}>
                          &#xe6b3;
                      </i>
                      {this.getListArea()}
                  </SearchWrapper>    
              </Nav>
              <Addition>
                  <Button className = "writting">
                  <i className = "iconfont">&#xe616;</i>
                  写文章
                  </Button>
                  <Button className = "reg">注册</Button>
              </Addition>
          </HeaderWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        /// focused : state.header.focused
        // focused : state.get("header").get("focused")
        focused: state.getIn(["header", "focused"]),
        mouseIn: state.getIn(["header", "mouseIn"]),
        list: state.getIn(["header", "list"]),
        page: state.getIn(["header", "page"]),
        totalPage: state.getIn(["header","totalPage"])
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            // actionCreators.getList()
            (list.size === 0) && dispatch(actionCreators.getList())
            dispatch(actionCreators.searchFocus())
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur())
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter())
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave())
        },
        handleChangePage(page,totalPage,spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'')
            if (originAngle) {
              originAngle = parseInt(originAngle)
            }else {
              originAngle = 0;
            }
            spin.style.transform = 'rotate('+(originAngle + 360) + 'deg)'
            if (page < totalPage) {
             dispatch(actionCreators.changePage(page+1)) 
            }else {
              dispatch(actionCreators.changePage(1))
            }
            // dispatch(actionCreators.changePage())
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(Header)