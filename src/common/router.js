import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

import Home from '../routes/Home/Home';
// 系统管理
import Drag from '../routes/Libraries/Drag/index';
import BraftEditor from '../routes/Libraries/BraftEditor';
import Menu from '../routes/Libraries/Menu';
import Department from '../routes/Libraries/Department';
import Dictionary from '../routes/Libraries/Dictionary';
import Parameter from '../routes/Libraries/Parameter';
import LoginLog from '../routes/Libraries/LoginLog';
import ActionLog from '../routes/Libraries/ActionLog';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
      '/home': {
          component: dynamicWrapper(app, ['chart'], () => import('../routes/Home/Home')),
          content: <Home />,
      },
    '/libraries/drag': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Libraries/Drag/index')),
      content: <Drag />,
    },
    '/libraries/braft-editor': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Libraries/BraftEditor')),
      content: <BraftEditor />,
    },
    '/libraries/menu': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Libraries/Menu')),
      content: <Menu />,
    },
    '/libraries/department': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Libraries/Department')),
      content: <Department />,
    },
    '/libraries/dictionary': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Libraries/Dictionary')),
      content: <Dictionary />,
    },
    '/libraries/parameter': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Libraries/Parameter')),
      content: <Parameter />,
    },
    '/libraries/action-log': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Libraries/ActionLog')),
      content: <ActionLog />,
    },
    '/libraries/login-log': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Libraries/LoginLog')),
      content: <LoginLog />,
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
  };
  const menuData = getFlatMenuData(getMenuData());

  const routerData = {};
  Object.keys(routerConfig).forEach(path => {
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
