export interface TeamMember {
  user: {
    id: number;
    username: string;
    email?: string;
    githubUsername?: string;
    avatarUrl?: string;
    role?: string;
  };
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  leaderId?: number;
  leader?: {
    id: number;
    username: string;
    email?: string;
  };
  createdAt?: string;
  members?: TeamMember[];
  repositories?: unknown[];
}

export interface CreateTeamDto {
  name: string;
  description?: string;
  leaderId?: number;
  initialMemberIds?: number[];
}

export interface UpdateTeamDto {
  name?: string;
}

export interface AddTeamMemberDto {
  userId: number;
}
