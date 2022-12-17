import request from '@/utils/request'

export function fetchHis(params,taskid){
    return request({
      url: '/assetcheckhis/select/'+taskid,
      method: 'get',
      params: params
    })
}

export function fetchHis2(params){
  return request({
    url: '/assetcheckhis/select5',
    method: 'get',
    params: params
  })
}

export function deleteHis(taskid){
    return request({
      url: '/assetcheckhis/delete/'+taskid,
      method: 'post'
    })
}
