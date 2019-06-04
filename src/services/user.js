import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  // return request('/api/currentUser');
  console.log(1111)
  return request('http://47.110.154.150:8080/smUser/login');
}
