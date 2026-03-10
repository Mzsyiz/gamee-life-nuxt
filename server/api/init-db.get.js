import pool from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    // 创建 games 表
    await pool.query(`
      CREATE TABLE IF NOT EXISTS games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        cover VARCHAR(500) NOT NULL,
        description TEXT,
        steam_id VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    // 创建 diaries 表
    await pool.query(`
      CREATE TABLE IF NOT EXISTS diaries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        game_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_date (date),
        INDEX idx_game_id (game_id),
        FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    return {
      success: true,
      message: '数据库表创建成功'
    }
  } catch (error) {
    console.error('初始化数据库失败:', error)
    throw createError({
      statusCode: 500,
      message: '初始化数据库失败: ' + error.message
    })
  }
})
