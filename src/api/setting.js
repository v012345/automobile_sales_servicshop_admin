import request from '@/utils/request'

export function fetchList(query) {
  // return request({
  //   url: '/vue-element-admin/article/list',
  //   method: 'get',
  //   params: query
  // })
  return request({
    url: '/vue-admin-template/config/list',
    method: 'get',
    params: query
  })
}

export function updateConfig(data) {
  return request({
    url: '/vue-admin-template/config/update',
    method: 'post',
    data
  })
}

export function updateActivity(data) {
  return request({
    url: '/vue-admin-template/activity/update',
    method: 'post',
    data
  })
}

export function createActivity(data) {
  return request({
    url: '/vue-admin-template/activity/create',
    method: 'post',
    data
  })
}



export function updateUser(data) {
  return request({
    url: '/vue-admin-template/user/update',
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
