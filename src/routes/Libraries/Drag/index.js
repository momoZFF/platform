import React,{ Component, Fragment } from 'react';
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
  Table,
  Switch,
  Divider,
  Checkbox,
  Popconfirm
} from 'antd';
import moment from 'moment';
const { TreeNode, DirectoryTree } = Tree;
import { connect } from 'dva';
import {render} from 'react-dom';
import Basic from './Basic.js'//DragHandle.js
import Collections from './Collections.js'
import DragHandle from './DragHandle.js'
import StandardTable from 'components/StandardTable';
import styles from '../../List/TableList.less';
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const treeData = [{
  label: '全部',
  value: 'all',
  children:[{
      label: '0-0',
      value: '00',
      children: [{
          label: '0-0-0',
          value: '000',
          children: [
              { label: '0-0-0-0', value: '0000' },
              { label: '0-0-0-1', value: '0001' },
              { label: '0-0-0-2', value: '0002' },
          ],
      }, {
          label: '0-0-1',
          value: '001',
          children: [
              { label: '0-0-1-0', value: '0010' },
              { label: '0-0-1-1', value: '0011' },
              { label: '0-0-1-2', value: '0012' },
          ],
      }, {
          label: '0-0-2',
          value: '002',
      }],
  }, {
      label: '0-1',
      value: '01',
      children: [
          { label: '0-1-0-0', value: '0100' },
          { label: '0-1-0-1', value: '0101' },
          { label: '0-1-0-2', value: '0102' },
      ],
  }, {
      label: '0-2',
      value: '02',
  }]
}];

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
const formStyles={
  width:'360px',
  float:'left'
}
const CreateForm = Form.create()(props => {
  const {modalVisible , onChangeStatus , handleModalVisible , onChangeRole , form , } = props;
  const options = [
    { label: '管理员', value: '0' },
    { label: '普通角色', value: '1' }
  ];
  return (<Modal
    title="添加用户"
    width={770}
    // onOk={okHandle}
      visible={modalVisible}
    onCancel={() => handleModalVisible()}
  >
    <FormItem style={formStyles} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名称">
      {form.getFieldDecorator('desc', {
        rules: [{ required: true, message: 'Please input some description...' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>
    <FormItem style={formStyles} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="归属部门">
      {form.getFieldDecorator('desc', {
        rules: [{ required: true, message: 'Please input some description...' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>
    <FormItem style={formStyles} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
      {form.getFieldDecorator('desc', {
        rules: [{ required: true, message: 'Please input some description...' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>
    <FormItem style={formStyles} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
      {form.getFieldDecorator('desc', {
        rules: [{ required: true, message: 'Please input some description...' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>
    <FormItem style={formStyles} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="登录账号">
      {form.getFieldDecorator('desc', {
        rules: [{ required: true, message: 'Please input some description...' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>
    <FormItem style={formStyles} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="登录密码">
      {form.getFieldDecorator('desc', {
        rules: [{ required: true, message: 'Please input some description...' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>
    <FormItem style={formStyles} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户性别">
      {form.getFieldDecorator('status')(
        <Select placeholder="请选择" style={{ width: '100%' }}>
          <Option value="0">男</Option>
          <Option value="1">女</Option>
        </Select>
      )}
    </FormItem>
    <FormItem style={formStyles} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户状态">
      {form.getFieldDecorator('status')(
        <Switch defaultChecked onChange={onChangeStatus} />
      )}
    </FormItem>
    <FormItem style={formStyles} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="岗位">
      {form.getFieldDecorator('desc', {
        rules: [{ required: true, message: 'Please input some description...' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>
    <FormItem style={formStyles} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
      <Checkbox.Group options={options} defaultValue={['Apple']} onChange={onChangeRole} />
    </FormItem>
    <FormItem style={{width:'360px'}} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注"> 
      <TextArea rows={4} style={{width:'600px'}}/>
    </FormItem>
  </Modal>)
})
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class Drag extends Component {
  constructor(props){
    super(props);
    const expandedKeys = treeData[0].children.map(n => n.value);
    this.state = {
      modalVisible: false,
      treeData,
      selectedRows: [],
      expandedKeys, //默认展开第一级
      autoExpandParent: true,
      // checkedKeys: this.props.checkedKeys,
      // selectedKeys: this.props.selectedKeys,
      // SelectKey: (this.props.checkedKeys.length > 0 && '选中了' + this.props.checkedKeys.length + '项') || '全部',
      searchValue: '',
      isIcon: false,
      // spanName,
      // isShowSearch,
      // treeList,
      // maxHeight
      checkedStatus:true,
    }
  }
  componentDidMount() {
  }

  onSelect = (keys, event) => {
    console.log('Trigger Select', keys, event);
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };

  renderTreeNodes = data => {
    const { searchValue } = this.state;
    return data.map(item => {
      const index = item.label && item.label.indexOf(searchValue);
      const beforeStr = item.label && item.label.substr(0, index);
      const afterStr = item.label && item.label.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.label}</span>
        );
      if (item.children) {
        return (
          <TreeNode title={title} key={item.value}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
        return <TreeNode {...{ title: title, key: item.value }} />;
    });
  };
  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="登录名称">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="手机号码">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="更新日期">
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
  onChangeStatus(checked) {
    console.log(`switch to ${checked}`);
  }
  onChangeRole(checkedValues) {
      console.log('checked = ', checkedValues);
  }
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render() {
    const parentMethods = {
      onChangeStatus: this.onChangeStatus,
      onChangeRole: this.onChangeRole,
      handleModalVisible:this.handleModalVisible
    };
    const { modalVisible } = this.state;

    const rowSelection = {
      type:'checkbox',
      onChange: (selectedRowKeys, selectedRows) => {
        // checkedStatus
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

          console.log(selectedRows.length);
          selectedRows.length == 0 ? this.setState({checkedStatus : true}) : this.setState({checkedStatus : false})
      },
      getCheckboxProps: record => ({
          disabled: record.name === 'Joe Black', // Column configuration not to be checked
          name: record.name,
      }),
    };
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'id',
      },
      {
        title: '登录名称',
        dataIndex: 'loginName',
      },
      {
        title: '用户名称',
        dataIndex: 'userName',
        sorter: true,
      },
      {
        title: '部门',
        dataIndex: 'department',
      },
      {
        title: '手机',
        dataIndex: 'mobile',
      },
      {
        title: '用户状态',
        dataIndex: 'status',
      },
      {
        title: '创建时间',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      // {
      //   title: '操作',
      //   dataIndex: 'action',
      //   render: val => (<div>
      //       <a href="" onClick={this.handleModalVisible(true)}>编辑</a>
      //       <Divider type="vertical" />
      //       <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
      //         <a>删除</a>
      //       </Popconfirm>
      //     </div>)
      // },
      {
        title: '操作',
        dataIndex: 'action',
        render: val => (<div>
            {/* <span onClick={this.handleModalVisible(true)}>编辑</span> */}
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </div>)
      },
    ];

    // const treeProps = {
    //   checkable: multiple,
    //   onExpand: this.onExpand,
    //   expandedKeys: this.state.expandedKeys,
    //   autoExpandParent: this.state.autoExpandParent,
    //   onCheck: this.onCheck,
    //   checkedKeys: this.state.checkedKeys,
    //   selectedKeys: this.state.selectedKeys,
    //   onSelect:this.onSelect
    // };

    return (
      <div>
      <div className={styles.tableListForm}>{this.renderForm()}</div>
      <Row gutter={20}>
          <Col span={5} >
            <Card style={{height:document.body.clientHeight-290+"px",overflow:'auto'}}>
              <DirectoryTree checkStrictly={true} defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
                {this.renderTreeNodes(treeData)}
              </DirectoryTree>
            </Card>
          </Col>
          <Col span={19}>
            <Card>
              <div style={{marginBottom:'10px'}}>
                <Button type="primary" onClick={() => this.handleModalVisible(true)}>新增</Button>
                <Button type="primary" style={{ marginLeft: 8 }} disabled={this.state.checkedStatus}>修改</Button>
                <Button type="primary" style={{ marginLeft: 8 }} disabled={this.state.checkedStatus}>删除</Button>
                {/* <Button type="primary" htmlType="submit">导入</Button>
                <Button type="primary" htmlType="submit">到处</Button> */}
              </div>
              <Table columns={columns} dataSource={data} rowSelection={rowSelection}/>
            </Card>
        </Col>
        </Row>
        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
      </div>
    );
  }
}

