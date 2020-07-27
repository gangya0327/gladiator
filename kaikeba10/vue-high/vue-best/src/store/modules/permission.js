import { asyncRoutes, constRoutes } from '@/router'

/*
根据路由meta.role判断是否当前用户有访问权限
@roles 用户拥有角色
@route 待判定路由
 */

function hasPermission(roles, route) {
  // 如果当前路由有roles字段则需要判断用户访问权限
  if (route.meta && route.meta.roles) {
    // 若用户拥有的角色中有被包含的待判定路由角色表中的则有访问权限
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 没有设置roles则无需判断即可访问
    return true
  }
}

/*
递归过滤asyncRoutes路由表
@routes 待过滤路由表，首次传入的是asyncRoutes
@roles 用户拥有角色
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    // 复制一份
    const tmp = { ...route }
    // 如果用户有访问权限则加入结构路由表
    if (hasPermission(roles, tmp)) {
      // 如果存在子路由则递归
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [], // 完整路由表
  addRoutes: [] // 用户可访问路由表
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    // addRoutes是用户可以访问的权限页面
    state.addRoutes = routes
    // 可访问的完整路由
    state.routes = constRoutes.concat(routes)
  }
}

const actions = {
  // 路由生成，在得到用户角色后第一时间调用
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 如果用户是管理员则拥有完整访问权限
      if (roles.includes('addmin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        // 否则需要根据角色做过滤处理
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}