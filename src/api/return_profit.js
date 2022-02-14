import request from '@/utils/request'

export function fetchList(query) {
  // return request({
  //   url: '/vue-element-admin/article/list',
  //   method: 'get',
  //   params: query
  // })
  return request({
    url: '/vue-admin-template/return_profit/list',
    method: 'get',
    params: query
  })
}

export function fetchActivities() {
  return request({
    url: '/vue-admin-template/activities/id-title',
    method: 'get'
  })
}

export function updateOrder(data) {
  return request({
    url: '/vue-admin-template/return_profit/update',
    method: 'post',
    data
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
