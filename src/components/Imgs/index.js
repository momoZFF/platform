
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, Tree, Input } from 'antd';
import $ from 'jquery';
import first from '../../assets/banner1.jpeg'
import second from '../../assets/banner2.jpeg'
import third from '../../assets/banner3.jpeg'
import fourth from '../../assets/banner4.jpeg'
const TreeNode = Tree.TreeNode;
const Search = Input.Search;


const getStyle = (obj,attr) => {
    if(obj.crrentStyle){
        return obj.currentStyle[attr];
        //兼容IE8以下
    }else{
        return getComputedStyle(obj,false)[attr];
        //参数false已废。照用就好
    }
}

const startMove = (obj,json,fn) => {
    //清理定时器
    if(obj.timer){
        clearInterval(obj.timer);
    }
    obj.timer=setInterval(function(){
        var bStop=false;//如果为false就停了定时器！
        var iCur=0;
        // 处理属性值
        for(var attr in json){
            if(attr=='opacity'){
                iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
            }else{
                iCur=parseInt(getStyle(obj,attr));
            }
            //定义速度值
            var iSpeed=(json[attr]-iCur)/8;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            //检测停止：如果我发现某个值不等于目标点bStop就不能为true。
            if(iCur!==json[attr]){
                bStop=false;
            }
            if(attr=='opacity'){
                obj.style[attr]=(iCur+iSpeed)/100;
                obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
            }else{
                obj.style[attr]=iCur+iSpeed+'px';
            }
        }
        //检测是否停止，是的话关掉定时器
        if(bStop===true){
            if(iCur==json[attr]){
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }
        }
    },30);
}

export default class Imgs extends Component {
    componentDidMount(){//刚开始加载时，就执行动画函数
        var iNow=this.props.iNow;
        var obj=document.getElementById(this.props.idNames.imgs).getElementsByTagName('li')[iNow].childNodes[0];
        startMove(obj,{'opacity':100});
    }
    componentWillReceiveProps=(nextProps)=>{//每当收到新的props就执行动画
        var obj=document.getElementById(this.props.idNames.imgs).getElementsByTagName('li')[nextProps.iNow].childNodes[0];
        //console.log(obj)
        startMove(obj,{'opacity':100});
    }

    render(){
        var arr=[];
        for(var i=0;i<this.props.nums;i++){
            var imgsContent=null;
            // var src=this.props.imgType.url+this.props.imgType.name+(i+1)+'.'+this.props.imgType.type;
            var srcArr=[first,second,third,fourth]
            if(i==this.props.iNow){
                imgsContent=
                    <li key={i.toString()} style={{margin:'0px',listStyle:'none',width:'100%'}}>
                        <img style={{opacity:'0',width:'100%',height:'100%'}} src={srcArr[i]} />
                    </li>
                arr.push(imgsContent);
            }else{
                imgsContent=
                    <li key={i.toString()} style={{margin:'0px',listStyle:'none'}}>
                        <img style={{display:'none',width:'100%'}} src={srcArr[i]} />
                    </li>
                arr.push(imgsContent);
            }
        }

        return (
            <ul id={this.props.idNames.imgs} style={{margin:'0px',listStyle:'none',padding:'0',width:'100%'}}>{arr}</ul>
        )
    }
}