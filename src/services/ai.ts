import { http } from '@/services/http';
import type { TestAiDto, AiAnalysisResult } from '@/types/ai';

export const aiService = {
  test: (dto: TestAiDto) =>
    http<AiAnalysisResult>('/ai/test', {
      method: 'POST',
      body: JSON.stringify(dto),
    }),
};
