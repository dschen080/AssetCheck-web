import request from '@/utils/request'

export function fetchOrg(params){
  return request({
    url: '/orglisting/select',
    method: 'get',
    params: params
  })
}

export function createOrg(data){
  return request({
    url: '/orglisting/create',
    method: 'post',
    data: data
  })
}

export function updateOrg(data){
  return request({
    url:'/orglisting/update',
    method:'post',
    data: data
  })
}

export function deleteOrg(id){
  return request({
    url:'/orglisting/delete/'+id,
    method:'post'
  })
}
