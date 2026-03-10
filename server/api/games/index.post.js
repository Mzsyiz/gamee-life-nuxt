import pool from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { title, cover, description, steamId } = body

    // 验证必填字段
    if (!title || !cover) {
      throw createError({
        statusCode: 400,
        message: '标题和封面是必填项'
      })
    }

    // 插入数据
    const [result] = await pool.query(
      'INSERT INTO games (title, cover, description, steam_id) VALUES (?, ?, ?, ?)',
      [title, cover, description || '', steamId || null]
    )

    return {
      success: true,
      id: result.insertId,
      message: '游戏添加成功'
    }
  } catch (error) {
    console.error('添加游戏失败:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '添加游戏失败'
    })
  }
})
