import { http } from '@/services/http';
import type { User, CreateUserDto, UpdateUserDto } from '@/types/user';

export const usersService = {
  getAll: () => http<User[]>('/users'),
  getById: (id: number) => http<User>(`/users/${id}`),
  create: (dto: CreateUserDto) =>
    http<User>('/users', { method: 'POST', body: JSON.stringify(dto) }),
  update: (id: number, dto: UpdateUserDto) =>
    http<User>(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(dto) }),
  delete: (id: number) => http<void>(`/users/${id}`, { method: 'DELETE' }),
};
