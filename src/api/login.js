import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/userlisting/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/userlisting/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/userlisting/logout',
    method: 'post'
  })
}

export function getOrgname(orgid) {
  return request({
    url: '/userlisting/name/'+orgid,
    method: 'get',
  })
}

