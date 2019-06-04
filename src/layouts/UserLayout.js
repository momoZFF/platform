import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import Tabs from '../components/Tags'
import styles from './UserLayout.less';
import logo from '../assets/logo.png';
import { getRoutes } from '../utils/utils';
import first from '../assets/banner1.jpeg';
import second from '../assets/banner2.jpeg';
import third from '../assets/banner3.jpeg';
import fourth from '../assets/banner4.jpeg';

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '苏州公证大数据应用服务平台';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 苏州公证大数据应用服务平台`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <img alt="logo" className={styles.logo} src={logo} />
            <span className={styles.desc}>苏州公证大数据应用服务平台</span>
          </div>
          <div className={styles.tabs}>
            <Tabs
              nums={4}
              timer={2000}
              idNames={
                  {
                      main:"tabs",
                      btns:"btns",
                      imgs:"imgs",
                      active:"btn-active"
                  }
              }
              imgType={
                  {
                      type:"jpeg",
                      url:"src/assets/",
                      name:"banner"
                  }
              }
              />
          </div>
          <div className={styles.content}>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
