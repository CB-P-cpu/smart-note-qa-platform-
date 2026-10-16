import request from '@/utils/request'

export function aiAsk(data) { return request.post('/ai/ask', data) }
export function aiSummarize(data) { return request.post('/ai/summarize', data) }
export function getQaHistory() { return request.get('/qa/history') }
