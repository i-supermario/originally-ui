export enum GroupStatus{
  ACTIVE = "Active",
  INACTIVE = "Inactive"
}

export interface MemberI {
  email: string
}

export interface GroupI{
  name: string
  description: string
  status: GroupStatus
  members: MemberI[]
  link: string
}