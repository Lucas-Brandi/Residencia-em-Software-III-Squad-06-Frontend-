export interface TestAiDto {
  codeSnippet: string
  rules: string[]
}

export interface AiAnalysisResult {
  feedback: string
  score?: number
}