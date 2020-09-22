const api = {
  login: 'login',
  list: 'users',
  zuo: 'menus',
  tianjia: 'users', //添加用户
  xiugai: 'users/', //修改
  remove: 'users/', //删除
  remove: 'users/', //所有权限管理
  quanxian: 'rights/list', //所有权限管理
  quanxian1: 'rights/tree', //所有权限管理
  shouquan: 'roles/:roleId/rights',
  juelist: 'roles', //获取角色列表
  tjjs: 'roles', //添加角色
  xiugaijs: 'roles/', //修改角色
  remove2: 'roles/', //删除角色
  //以下是商品列表的api路由
  shang: '/categories', //商品分类列表
  shang1: '/goods', //商品列表，获取直接渲染
  shang_id: '/goods/', //根据id查询数据
  shang_remove:'goods/', //通过id删除商品
  shang2:'goods/',
  shang_fen:'/categories',//添加分类
  shang_remove1:'categories/',//商品分类删除
  //
  ding:'orders',//订单管理
  reports:'reports/type/1', //基于时间统计的折线图
}

module.exports = api