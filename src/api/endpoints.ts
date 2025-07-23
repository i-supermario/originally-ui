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
    add: (groupId: string) => `/group/${groupId}/add-member`,
    remove: (groupId: string, memberId: string) => `/group/${groupId}/remove-member/${memberId}`,
    getAll: (userId: string) => `/group/get-all/${userId}`,
  }
}