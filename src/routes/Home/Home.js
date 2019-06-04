import React,{Component} from 'react';
import { Row , Card , Col , Icon , List ,Avatar} from 'antd';
import styles from './Home.less'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import PropTypes from "prop-types";

@connect()
export default class Home extends Component {
    static contextTypes = {
      router: PropTypes.object
    }
    constructor(props,context){
        super(props,context);
        this.state = {
            active: false,
            tabListKey:['/home'],
            activeKey:'/home',
            data:[
                'Racing car sprays burning fuel into crowd.',
                'Japanese princess to wed commoner.',
                'Australian walks 100km after outback crash.',
                'Man charged over missing wedding girl.',
                'Los Angeles battles huge wildfires.',
                'Los Angeles battles huge wildfires.',
                'Racing car sprays burning fuel into crowd.',
            ]
        };
    }
    componentDidMount() {
        // this.props.history.push({ pathname : '/'  })
    }
    handleClick = (e)=>{ 
        // console.log(typeof e)
      const { onHandlePage } = this.props;
      onHandlePage(e)
    }
    getShortcut(){
        const me = this;
        const info = [
            {
              name: '用户管理',
              path: 'drag',
            },
            {
              name: '角色管理',
              path: 'braft-editor',
            },
            {
              name: '部门管理',
              path: 'department',
            },
            {
              name: '系统设置',
              path: 'parameter',
            },
            {
              name: '登录日志管理',
              path: 'login-log',
            },
            {
              name: '操作日志管理',
              path: 'action-log',
            }
        ]
        const { form, dispatch, data } = this.props;
        console.log(dispatch)
        const onValidateForm = (value) => {
        //     console.log(111)
        //   info((err, values) => {
        //       dispatch({
        //         type: '/libraries/drag',
        //         payload: values,
        // //       });
        // me.props.onHandlePage(value)
        me.setState({activeKey: value});
        me.handleClick({key:value})
        me.props.history.push({ pathname : value})
        dispatch({
            type: '/libraries/drag',
            payload: {
                key: '22222',
            }
        })
              dispatch(routerRedux.push(value));
            // console.log(this.propsactiveKey)
        //   });
        };
        return info.map((item,index)=>{
                return <span className={styles.spanIcon} key={index} 
                        onClick={()=>{
                            // dispatch(routerRedux.push(`/libraries/${item.path}`))
                            onValidateForm(`/libraries/${item.path}`)
                        }}>
                    <Icon type="file-search" /><br/>{item.name}
                </span>
            })

            // <span onClick={onValidateForm}>
            //     <Icon type="file-search" /><br/>测试
            // </span>
        
    }
    render() {
        const homeHeight = document.body.clientHeight-120
        const cardHeight = homeHeight/2 - 25
        return (
            <div style={{height:homeHeight+"px",overflow:'auto'}}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card headStyle={{height:'40px',lineHeight:'20px'}} title="统一平台" bordered={true} style={{marginBottom:'20px',borderRadius:'10px'}}>
                            {/* <span className={styles.spanIcon}><Icon type="file-search" /><br/>公正影像查询</span>
                            <span className={styles.spanIcon}><Icon type="pie-chart" /><br/>平台数据统计</span>
                            <span className={styles.spanIcon}><Icon type="radar-chart" /><br/>家族式普数据</span>
                            <span className={styles.spanIcon}><Icon type="control" /><br/>平台数据监控</span>
                            <span className={styles.spanIcon}><Icon type="cluster" /><br/>公证数据管理</span>
                            <span className={styles.spanIcon}><Icon type="box-plot" /><br/>征信数据应用</span> */}
                            {this.getShortcut()}
                        </Card>
                    </Col>
                    <Col span={12}> 
                        <Card headStyle={{height:'40px',lineHeight:'20px'}} title="待办任务" bordered={true} style={{marginBottom:'20px',borderRadius:'10px'}}>
                            <List 
                                style={{height:'278px',overflow: 'auto'}}
                                dataSource={this.state.data}
                                renderItem={(item,index) => (
                                    <List.Item key={index}>
                                        <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<a href="https://ant.design">{item}</a>}
                                        description={item}
                                        />
                                        <div>Content</div>
                                    </List.Item>
                                )}
                            >
                            </List>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card headStyle={{height:'40px',lineHeight:'20px'}} title="我的申请" bordered={true} style={{borderRadius:'10px'}}>
                            <List 
                                style={{height:'278px',overflow: 'auto'}}
                                dataSource={this.state.data}
                                renderItem={(item,index) => (
                                    <List.Item key={index}>
                                        <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<a href="https://ant.design">{item}</a>}
                                        description={item}
                                        />
                                        <div>Content</div>
                                    </List.Item>
                                )}
                            >
                            </List>
                        </Card>
                    </Col>
                    <Col span={12}> 
                        <Card headStyle={{height:'40px',lineHeight:'20px'}} title="已办任务" bordered={true} style={{borderRadius:'10px'}}>
                            <List 
                                style={{height:'278px',overflow: 'auto'}}
                                dataSource={this.state.data}
                                renderItem={(item,index) => (
                                    <List.Item key={index}>
                                        <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<a href="https://ant.design">{item}</a>}
                                        description={item}
                                        />
                                        <div>Content</div>
                                    </List.Item>
                                )}
                            >
                            </List>
                        </Card>
                    </Col>
                </Row>
        </div>
        );
    }
}

