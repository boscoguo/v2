import React, { Component, Fragment } from 'react'
import { actionCreators } from './store'
import store from '../store'
import { connect } from 'react-redux'
import touxiangPic from '../statics/touxiang.png'
import {
    Header,
    Sider,
    Content,
    InfoSec,
    TotalNum,
    SpecificGol,
    Weight,
    Photo,
    Height,
    Descrip,
    Unit
} from './style.js'
import { GlobalStyle } from '../statics/iconfont/iconfont'
import 'antd/dist/antd.css'
import { Input } from 'antd';
import { List, Avatar } from 'antd';


const { Search } = Input;

class Page extends Component {

    render() {
        const newList = this.props.list.toJS()
        console.log(newList)
        return (
            <Fragment>
                <Header style={{ position: "relative" }}>

                    <Search
                        value={this.props.inputValue}
                        style={{ width: 400 }}
                        onSearch={(value) => { this.props.handleSearch(value) }}
                        onChange={this.props.handleChange}
                        onFocus={this.props.handleFocus}
                        onBlur={this.props.handleBlur}
                    />
                    <List
                        style={{ width: 400, position: "absolute", left: "50%", top: 40, transform: "translate(-50%,0)", background: "white" }}
                        className={this.props.switchList ? "show" : "hide"}
                        dataSource={newList}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.photo.thumb} />}
                                    title={<a href="https://ant.design">{item.tag_name}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />


                    <GlobalStyle />
                    <div>
                        <i className='iconfont arrow'>&#xe600;</i>
                        <i className='iconfont arrow'>&#xe714;</i>
                    </div>
                </Header>
                <div style={{ display: "flex" }}>
                    <Sider>
                        <InfoSec>
                            <Height>
                                {this.props.height}
                                <Unit>kg</Unit>
                            </Height>
                            <div>
                                <Photo><img alt="" src={touxiangPic}></img></Photo>
                                <Descrip>{this.props.frist} {this.props.last}</Descrip>
                            </div>
                            <Weight>
                                {this.props.weight}
                                <Unit>cm</Unit>
                            </Weight>
                        </InfoSec>
                        <TotalNum>totalNum</TotalNum>
                        <SpecificGol>SpecificGol</SpecificGol>
                    </Sider>
                    <Content>Content</Content>
                </div>

            </Fragment>
        )
    }
    componentDidMount() {

        store.dispatch(actionCreators.test())
    }

}

const mapStateToProps = (state) => {
    return {
        inputValue: state.getIn(["page", "inputValue"]),
        list: state.getIn(["page", "list"]),
        switchList: state.getIn(["page", "switchList"]),
        weight: state.getIn(["page", "weight"]),
        height: state.getIn(["page", "height"]),
        first: state.getIn(["page", "first"]),
        last: state.getIn(["page", "last"])
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        handleChange(e) {
            dispatch(actionCreators.changeInput(e.target.value))
            // dispatch(actionCreators.test())
        },

        handleSearch(value) {
            dispatch(actionCreators.showList())
        },
        handleFocus() {
            dispatch(actionCreators.getSearchList())
            dispatch(actionCreators.changeFocus())
        },
        handleBlur() {
            dispatch(actionCreators.changeBlur())
            dispatch(actionCreators.hideList())
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Page)