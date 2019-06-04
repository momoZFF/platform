import React,{Component,Fragment} from 'react'
import 'braft-editor/dist/index.css'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Tree,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Table
} from 'antd';
import moment from 'moment';
const { TreeNode, DirectoryTree } = Tree;
import { connect } from 'dva';
import {render} from 'react-dom';
import styles from '../List/TableList.less';
const FormItem = Form.Item;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const columns = [
  {
    title: '访问编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '登录名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '登录地址',
    dataIndex: 'power',
    key: 'power',
  },
  {
    title: '登录地点',
    dataIndex: 'sort',
    key: 'sort',
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    key: 'browser',
  },
  {
    title: '操作系统',
    dataIndex: 'actionSys',
    key: 'actionSys',
  },
  {
    title: '登录状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作信息',
    dataIndex: 'actionStatus',
    key: 'actionStatus',
  },
  {
    title: '登录时间',
    dataIndex: 'updatedAt',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
];

const data = [
{
  key: 0,
  disabled: true,
  href: '#',
  avatar: [
    'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
    'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
  ],
  no: 'TradeCode1',
  title: '一个任务名称1',
  owner: '曲丽丽',
  description: '这是一段描述',
  callNo: Math.floor(Math.random() * 1000),
  status: Math.floor(Math.random() * 10) % 4,
  updatedAt: 2019/5/31,
  createdAt: 2019/5/31,
  progress: 10
},
{
  key: 1,
  disabled: true,
  href: '#',
  avatar: [
    'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
    'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
  ],
  no: 'TradeCode1',
  title: '一个任务名称1',
  owner: '曲丽丽',
  description: '这是一段描述',
  callNo: Math.floor(Math.random() * 1000),
  status: Math.floor(Math.random() * 10) % 4,
  updatedAt: 2019/5/31,
  createdAt: 2019/5/31,
  progress: 10
},
{
  key: 2,
  disabled: true,
  href: '#',
  avatar: [
    'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
    'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
  ],
  no: 'TradeCode1',
  title: '一个任务名称1',
  owner: '曲丽丽',
  description: '这是一段描述',
  callNo: Math.floor(Math.random() * 1000),
  status: Math.floor(Math.random() * 10) % 4,
  updatedAt: 2019/5/31,
  createdAt: 2019/5/31,
  progress: 10
},
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  type:'checkbox',
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

@Form.create()
export default class BraftEditor extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="登录地址">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="登录名称">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="登录状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">所有</Option>
                  <Option value="1">成功</Option>
                  <Option value="0">失败</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="登录时间">
              {getFieldDecorator('date')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
          </Col>
        </Row>
      </Form>
    );
  }
  render () {
    return (
      <div>
        <div className={styles.tableListForm}>{this.renderForm()}</div>
        <Card>
            <div style={{marginBottom:'10px'}}>
              <Button type="primary" htmlType="submit">新增</Button>
              <Button type="primary" htmlType="submit"style={{ marginLeft: 8 }} >修改</Button>
              <Button type="primary" htmlType="submit"style={{ marginLeft: 8 }} >删除</Button>
              {/* <Button type="primary" htmlType="submit">导入</Button>
              <Button type="primary" htmlType="submit">到处</Button> */}
            </div>
          <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
        </Card>
      </div>
    )

  }

}