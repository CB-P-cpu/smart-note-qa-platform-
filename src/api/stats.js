import request from '@/utils/request'

export function getActivityStats(params) { return request.get('/stats/activity', { params }) }
export function getNoteTrend(params) { return request.get('/stats/notes-trend', { params }) }
