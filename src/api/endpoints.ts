export const ENDPOINTS = {
  user: {
    signup: "/user/sign-up",
    login: "/user/login",
    logout: "/user/logout"
  },
  session: {
    userSessionInfo: "/session/user-info"
  },
  group: {
    create: "/group/create",
    add: (groupId: string) => `/group/${groupId}/add`,
    remove: (groupId: string) => `/group/${groupId}/remove`,
  }
}