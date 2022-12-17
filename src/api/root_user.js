import request from '@/utils/request'

export function fetchUser(params,orgid){
  return request({
    url: '/userlistingRoot/select/'+orgid,
    method: 'get',
    params: params
  })
}

export function fetchUser5(params){
  return request({
    url: '/userlistingRoot/select5',
    method: 'get',
    params: params
  })
}

export function createUser(data){
  return request({
    url: '/userlistingRoot/create',
    method: 'post',
    data: data
  })
}

export function updateUser(data){
  return request({
    url:'/userlistingRoot/update',
    method:'post',
    data: data
  })
}

export function createUser3(data){
  return request({
    url: '/userlistingRoot/create3',
    method: 'post',
    data: data
  })
}

export function updateUser3(data){
  return request({
    url:'/userlistingRoot/update3',
    method:'post',
    data: data
  })
}

export function createUser5(data){
  return request({
    url: '/userlistingRoot/create5',
    method: 'post',
    data: data
  })
}

export function updateUser5(data){
  return request({
    url:'/userlistingRoot/update5',
    method:'post',
    data: data
  })
}

export function deleteUser(username){
  return request({
    url:'/userlistingRoot/delete/'+username,
    method:'post'
  })
}
