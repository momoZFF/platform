
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, Tree, Input } from 'antd';
import $ from 'jquery';
import Imgs from '../Imgs'
import Btns from '../Btns'
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export default class Tags extends Component {
    state = {
        iNow:0,
        bCheck:true
    };
    setInow = (index) => {//核心状态计算工具：依赖定时器进行实时刷新
        if(index!==undefined){//如果参数有内容。
            this.setState({
                iNow:index
            });
        }else{
            var _this=this;
            this.timer=setInterval(function(){
                if(_this.state.bCheck){
                    //console.log(_this.state.bCheck)
                    _this.setState(function(prev){
                        if(prev.iNow==this.props.nums-1){
                            return {
                                iNow:0
                            };
                        }else{
                            return {
                                iNow:prev.iNow+1
                            };
                        }
                    });
                }else{
                    //console.log('该停了!')
                    return false;
                }
            },this.props.timer);
        }
    }
    checkSwitch = () => {
        this.setState((prev) => {
                bCheck:!prev.bCheck
        });
    }
    render(){
        return (
            <div id={this.props.idNames.main}
                style={{width: '100%',
                    height: (document.body.clientHeight-70)+"px",
                    margin: '0',
                    position: 'relative',
                    overflow: 'hidden'}}
              onMouseOver={this.checkSwitch}
              onMouseOut={this.checkSwitch}>

                <Btns iNow={this.state.iNow}
                  setInow={this.setInow}
                  nums={this.props.nums}
                  idNames={this.props.idNames} />

                <Imgs iNow={this.state.iNow}
                nums={this.props.nums}
                idNames={this.props.idNames}
                imgType={this.props.imgType} />

            </div>
        );
    }
};