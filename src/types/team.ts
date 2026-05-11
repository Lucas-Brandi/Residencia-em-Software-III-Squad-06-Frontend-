export interface Team {
  id: string
  name: string
}

export interface CreateTeamDto {
  name: string
}

export interface UpdateTeamDto {
  name?: string
}

export interface AddTeamMemberDto {
  userId: number
}