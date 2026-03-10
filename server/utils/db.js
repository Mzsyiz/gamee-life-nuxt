import mysql from 'mysql2/promise'

// 创建数据库连接池
const pool = mysql.createPool({
  host: '49.233.0.178',
  user: 'gamelife',
  password: 'ezem4yWPJxkKhh8c',
  database: 'gamelife',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool
