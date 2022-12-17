import request from '@/utils/request'

export function fetchAsset(params,orgid){
  return request({
    url: '/assetrec/select/'+orgid,
    method: 'get',
    params: params
  })
}

export function fetchUnitAsset(params,orgid,depart){
  return request({
    url: '/assetrec/select/'+orgid+'/'+depart,
    method: 'get',
    params: params
  })
}

export function createAsset(data){
  return request({
    url: '/assetrec/create',
    method: 'post',
    data: data
  })
}

export function updateAsset(data){
  return request({
    url:'/assetrec/update',
    method:'post',
    data: data
  })
}

export function deleteAsset(id){
  return request({
    url:'/assetrec/delete/'+id,
    method:'post'
  })
}
