
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, Tree, Input } from 'antd';
import $ from 'jquery';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export default class Btns extends Component {
    componentDidMount(){
        this.props.setInow();
    }
    getIndex=(e)=>{//获取a的父级索引值
        var list=e.target.parentNode.parentNode.childNodes;
        for(var i=0;i<list.length;i++){
            if(list[i]===e.target.parentNode){
                return i;
            }
        }
    }
    changeInow=(e)=>{//回调方法
        //console.log($(e.target).parent().index());
        //console.log(this.getIndex(e));
        var index=this.getIndex(e);
        this.props.setInow(index)
    }

    render(){
        var arr=[];
        for(var i=0;i<this.props.nums;i++){
            var btnsContent=null;
            var index=i;
            if(i==this.props.iNow){
                btnsContent=
                    <li key={i.toString()}>
                        <a onMouseOver={this.changeInow} id={this.props.idNames.active} href="javascript:;"></a>
                    </li>
            }else{
                btnsContent=
                    <li key={i.toString()}>
                        <a  onMouseOver={this.changeInow} href="javascript:;"></a>
                    </li>
            }
            arr.push(btnsContent);
        }

        return (
            <ul id={this.props.idNames.btns} style={{display:'none'}}>{arr}</ul>
        );
    }
};