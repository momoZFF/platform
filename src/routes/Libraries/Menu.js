import React,{Component} from 'react'
import 'braft-editor/dist/index.css'
import { Card } from 'antd';

export default class BasicDemo extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount () {
    this.isLivinig = true
    // 3秒后更改编辑器内容
    // setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  render () {

    return (
      <Card>
      菜单名称
      </Card>
    )

  }

}