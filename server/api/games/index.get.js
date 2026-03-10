import pool from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM games ORDER BY created_at DESC'
    )
    return rows
  } catch (error) {
    console.error('获取游戏列表失败:', error)
    throw createError({
      statusCode: 500,
      message: '获取游戏列表失败'
    })
  }
})
