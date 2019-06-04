import React,{Component} from 'react'
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
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  type:'radio',
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
export default class BasicDemo extends Component {
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
        <Row gutter={{ md: 8}}>
          <Col md={8} sm={24}>
            <FormItem label="部门名称">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="部门状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">所有</Option>
                  <Option value="1">正常</Option>
                  <Option value="2">停用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8}}>
          <Col md={8} sm={24}>
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
        <Card style={{borderRadius:'10px'}}>
            <div  style={{marginBottom:'10px'}}>
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