import request from '@/utils/request'

export function createAssetCheckTask(data){
  return request({
    url: '/assetchecktask/create',
    method: 'post',
    data: data
  })
}

export function fetchAssetCheckTask(params,orgid){
  return request({
    url: '/assetchecktask/select/'+orgid,
    method: 'get',
    params: params
  })
}
export function deleteAssetCheckTask(taskid){
  return request({
    url: '/assetchecktask/delete/'+taskid,
    method: 'post'
  })
}
