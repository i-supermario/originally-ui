import {  GroupI, GroupStatus  } from "../types/group";


export const mockGroups: GroupI[] = [
  {
    name: "Team Alpha",
    description: "Core product engineering team",
    status: GroupStatus.ACTIVE,
    members: [
      { email: "alice@example.com" },
      { email: "bob@example.com" },
      { email: "charlie@example.com" },
    ],
    link: "https://app.originally.com/groups/team-alpha"
  },
  {
    name: "Design Guild",
    description: "Group for all things UI/UX and visual design",
    status: GroupStatus.ACTIVE,
    members: [
      { email: "dana@example.com" },
      { email: "ellen@example.com" },
    ],
    link: "https://app.originally.com/groups/design-guild"
  },
  {
    name: "Beta Testers",
    description: "Community group for early access testers",
    status: GroupStatus.INACTIVE,
    members: [
      { email: "frank@example.com" },
      { email: "grace@example.com" },
      { email: "hank@example.com" },
    ],
    link: "https://app.originally.com/groups/beta-testers"
  },
  {
    name: "Leadership Circle",
    description: "Private group for executive syncs",
    status: GroupStatus.ACTIVE,
    members: [
      { email: "ceo@example.com" },
      { email: "cto@example.com" },
    ],
    link: "https://app.originally.com/groups/leadership-circle"
  },
  {
    name: "Archived Group",
    description: "Former collaboration space - no longer active",
    status: GroupStatus.INACTIVE,
    members: [],
    link: "https://app.originally.com/groups/archived-group"
  }
];
