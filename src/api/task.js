import request from '@/utils/request'

export function createAssetCheckTask(data,keyword,assetdept){
  if(keyword==""){
    keyword="null";
  }
  if(assetdept==""){
    assetdept="null";
  }
  return request({
    url: '/assetchecktask/create/'+keyword+'/'+assetdept,
    method: 'post',
    data: data,
    timeout: 100 * 1000,
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
