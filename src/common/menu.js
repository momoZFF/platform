import { isUrl } from '../utils/utils';

const menuData = [
  // {
  //     name: 'Home',
  //     icon: 'dashboard',
  //     path: 'home',
  //     // hideInMenu: true,
  // },
  {
    name: '系统管理',//Third-Party Libraries
    icon: 'crown',
    path: 'libraries',
    children: [
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
    ],
  }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
