import pool from '../server/utils/db.js'

async function initDatabase() {
  try {
    console.log('开始初始化数据库...')

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

    console.log('✓ 数据库表创建成功')
    process.exit(0)
  } catch (error) {
    console.error('✗ 初始化数据库失败:', error.message)
    process.exit(1)
  }
}

initDatabase()
