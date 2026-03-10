import pool from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { date, title, description, gameId } = body

  // 验证必填字段
  if (!date || !title) {
    throw createError({ statusCode: 400, message: '日期和标题是必填项' })
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO diaries (date, title, description, game_id) VALUES (?, ?, ?, ?)',
      [date, title, description || '', gameId || null]
    )

    return {
      success: true,
      id: result.insertId,
      message: '日记添加成功'
    }
  } catch (error) {
    console.error('添加日记失败:', error)
    throw createError({
      statusCode: 500,
      message: '添加日记失败: ' + error.message
    })
  }
})
