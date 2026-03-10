import pool from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.*, g.title as game_title, g.cover as game_cover
      FROM diaries d
      LEFT JOIN games g ON d.game_id = g.id
      ORDER BY d.date DESC, d.created_at DESC
    `)
    return rows
  } catch (error) {
    console.error('获取日记列表失败:', error)
    throw createError({
      statusCode: 500,
      message: '获取日记列表失败'
    })
  }
})
