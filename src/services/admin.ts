import { http } from '@/services/http';

export interface AdminMetrics {
  totalPRsAnalyzed: number;
  timeSavedHours: number;
  timeSavedFormatted: string;
  avgHealthScore: number;
  approvalRate: number;
  statusBreakdown: {
    approved: number;
    rejected: number;
    pending: number;
  };
  totalUsers: number;
  totalActiveRules: number;
}

export const adminDashboardService = {
  getMetrics: () => http<AdminMetrics>('/dashboard/metrics'),
};
