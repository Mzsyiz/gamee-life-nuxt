import pool from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, message: '缺少日记 ID' })
  }

  try {
    const [rows] = await pool.query(`
      SELECT d.*, g.title as game_title, g.cover as game_cover
      FROM diaries d
      LEFT JOIN games g ON d.game_id = g.id
      WHERE d.id = ?
    `, [id])

    if (rows.length === 0) {
      throw createError({ statusCode: 404, message: '日记不存在' })
    }

    return rows[0]
  } catch (error) {
    console.error('获取日记详情失败:', error)
    throw createError({
      statusCode: 500,
      message: '获取日记详情失败'
    })
  }
})
