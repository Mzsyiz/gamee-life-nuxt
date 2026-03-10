import pool from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = getRouterParam(event, 'id')

  if (method === 'PUT') {
    const body = await readBody(event)
    const { date, title, description, gameId } = body

    if (!id) {
      throw createError({ statusCode: 400, message: '缺少日记 ID' })
    }

    if (!date || !title) {
      throw createError({ statusCode: 400, message: '日期和标题是必填项' })
    }

    try {
      await pool.query(
        'UPDATE diaries SET date = ?, title = ?, description = ?, game_id = ? WHERE id = ?',
        [date, title, description || '', gameId || null, id]
      )

      return { success: true, message: '日记更新成功' }
    } catch (error) {
      console.error('更新日记失败:', error)
      throw createError({
        statusCode: 500,
        message: '更新日记失败: ' + error.message
      })
    }
  }

  if (method === 'DELETE') {
    if (!id) {
      throw createError({ statusCode: 400, message: '缺少日记 ID' })
    }

    try {
      await pool.query('DELETE FROM diaries WHERE id = ?', [id])
      return { success: true, message: '日记删除成功' }
    } catch (error) {
      console.error('删除日记失败:', error)
      throw createError({
        statusCode: 500,
        message: '删除日记失败: ' + error.message
      })
    }
  }
})
