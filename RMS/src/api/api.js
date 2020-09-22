import request from '@/network/request'
import {
  login,
  list,
  zuo,
  tianjia,
  xiugai,
  remove,
  quanxian,
  juelist,
  quanxian1,
  tjjs,
  xiugaijs,
  remove2,
  //以上是权限管理和用户管理url路径
  //以下是商品管理url路径
  shang,
  shang1,
  shang_id,
  shang_remove,
  shang2,
  shang_fen,
  shang_remove1,
  //
  ding,
  reports

  // quanremove
} from './base'


//订单数据
export function dd(dd) {
  return request({
    url: ding,
    method: 'get',
    params: dd,
    hideloading: false
  })
}

// 查看物流信息
export function kuaidi_xx(params) {
  return request({
    url: `/kuaidi/1106975712662`,
    method: 'get',
    params,
    hideloading: false
  })
}

//折线图
export function getreports(params) {
  return request({
    url: reports,
    method: 'get',
    params,
    hideloading: false
  })
}


//编辑提交信息
export function s9(s9, s99) {
  return request({
    url: s9,
    method: 'delete',
    data: s99,
    hideloading: false
  })
}

//编辑提交信息
export function s8(s8, s88) {
  return request({
    url: s8,
    method: 'put',
    data: s88,
    hideloading: false
  })
}
//添加静态属性，动态属性
export function s7(s7, s77) {
  return request({
    url: s7,
    method: 'get',
    params: s77,
    hideloading: false
  })
}
//添加静态属性，动态属性
export function s6(s6, s66) {
  return request({
    url: s6,
    method: 'post',
    data: s66,
    hideloading: false
  })
}
//参数列表
export function s5(s5, s55) {
  return request({
    url: s5,
    method: 'get',
    params: s55,
    hideloading: false
  })
}

//商品分类删除
export function s4(s4) {
  return request({
    url: shang_remove1 + s4,
    method: 'delete',
    hideloading: false
  })
}

//添加商品分类
export function s3(s3) {
  return request({
    url: shang_fen,
    method: 'post',
    data: s3,
    hideloading: false
  })
}
//根据id编辑商品
export function s2(id, id1) {
  return request({
    url: shang2 + id,
    method: 'put',
    data: id1,
    hideloading: false
  })
}


//根据id删除商品
export function s_r(id) {
  return request({
    url: shang_remove + id,
    method: 'delete',
    hideloading: false
  })
}

//根据id查询数据
export function id(id) {
  return request({
    url: shang_id + id,
    method: 'get',
    hideloading: false
  })
}

//商品列表
export function s1(s1) {
  return request({
    url: shang1,
    method: 'get',
    params: s1,
    hideloading: false
  })
}
//商品分类列表
export function s(info) {
  return request({
    url: shang,
    method: 'get',
    params: info,
    hideloading: false
  })
}

















//以下是权限管理和用户登录封装
// 登录验证
export function lg(lg) {
  return request({
    url: login,
    method: 'post',
    params: lg,
    hideloading: false
  })
}
// 首页数据
export function lt(lt) {
  return request({
    url: list,
    method: 'get',
    params: lt,
    hideloading: false
  })
}

// 左侧
export function z(z) {
  return request({
    url: zuo,
    method: 'get',
    params: z,
    hideloading: false
  })
}
// 添加用户
export function t(t) {
  return request({
    url: tianjia,
    method: 'post',
    data: t,
    hideloading: false
  })
}
// 修改用户
export function x(data) {
  return request({
    url: xiugai + data.id,
    method: 'put',
    data,
    hideloading: false
  })
}

// 删除用户
export function d(d) {
  return request({
    url: remove + d,
    method: 'delete',
    hideloading: false
  })
}
// 权限管理
export function qx() {
  return request({
    url: quanxian,
    method: 'get',
    hideloading: false
  })
}

// 角色列表
export function js() {
  return request({
    url: juelist,
    method: 'get',
    hideloading: false
  })
}
// 删除角色权限
export function qxrm(qxrm) {
  return request({
    url: qxrm,
    method: 'delete',
    hideloading: false
  })
}
// 树状所有权限
export function sz() {
  return request({
    url: quanxian1,
    method: 'get',
    hideloading: false
  })
}

// 角色授权
export function sq(zhi, zhi1) {
  return request({
    url: zhi,
    method: 'post',
    data: zhi1,
    hideloading: false
  })
}

// 分配用户角色
export function fpjs(urll, id) {
  return request({
    url: urll,
    method: 'put',
    data: id,
    hideloading: false
  })
}

// 添加角色
export function tjjue(tjjue) {
  return request({
    url: tjjs,
    method: 'post',
    data: tjjue,
    hideloading: false
  })
}


// 修改角色
export function xg(xg, xg1) {
  return request({
    url: xiugaijs + xg,
    method: 'put',
    data: xg1,
    hideloading: false
  })
}

// 删除角色
export function re(re) {
  return request({
    url: remove2 + re,
    method: 'delete',
    hideloading: false
  })
}