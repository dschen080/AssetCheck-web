const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  username4unit: state => state.user.username4unit,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,
  fullname: state => state.user.fullname,
  orgid: state => state.user.orgid,
  sectname: state => state.user.sectname
}
export default getters
