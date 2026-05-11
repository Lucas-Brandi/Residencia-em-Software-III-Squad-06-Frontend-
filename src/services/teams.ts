import { http } from '@/services/http'
import type { Team, CreateTeamDto, UpdateTeamDto, AddTeamMemberDto } from '@/types/team'

export const teamsService = {
  getAll:      ()                                   => http<Team[]>('/teams'),
  getById:     (id: string)                         => http<Team>(`/teams/${id}`),
  create:      (dto: CreateTeamDto)                 => http<Team>('/teams', { method: 'POST', body: JSON.stringify(dto) }),
  update:      (id: string, dto: UpdateTeamDto)     => http<Team>(`/teams/${id}`, { method: 'PATCH', body: JSON.stringify(dto) }),
  delete:      (id: string)                         => http<void>(`/teams/${id}`, { method: 'DELETE' }),
  addMember:   (id: string, dto: AddTeamMemberDto)  => http<void>(`/teams/${id}/members`, { method: 'POST', body: JSON.stringify(dto) }),
}