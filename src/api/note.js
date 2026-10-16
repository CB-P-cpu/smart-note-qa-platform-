import request from '@/utils/request'

//分类
export function getCategoryList() { return request.get('/categories') }
export function addCategory(data) { return request.post('/categories', data) }
export function updateCategory(id, data) { return request.put(`/categories/${id}`, data) }
export function delCategory(id) { return request.delete(`/categories/${id}`) }

//标签
export function getTagList() { return request.get('/tags') }
export function addTag(data) { return request.post('/tags', data) }
export function delTag(id) { return request.delete(`/tags/${id}`) }

//笔记
export function getNoteList(params) { return request.get('/notes', { params }) }
export function createNote(data) { return request.post('/notes', data) }
export function getNoteDetail(id) { return request.get(`/notes/${id}`) }
export function updateNote(id, data) { return request.put(`/notes/${id}`, data) }
export function deleteNote(id) { return request.delete(`/notes/${id}`) }

//评论
export function getNoteComments(noteId) { return request.get(`/notes/${noteId}/comments`) }
export function addComment(noteId, data) { return request.post(`/notes/${noteId}/comments`, data) }
export function delComment(commentId) { return request.delete(`/comments/${commentId}`) }

//点赞
export function likeNote(noteId) { return request.post(`/notes/${noteId}/like`) }
export function cancelLike(noteId) { return request.delete(`/notes/${noteId}/like`) }

//收藏
export function collectNote(noteId) { return request.post(`/notes/${noteId}/favorite`) }
export function cancelCollect(noteId) { return request.delete(`/notes/${noteId}/favorite`) }
export function getMyFavorite() { return request.get('/favorites') }
