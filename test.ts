import { Pool } from 'pg'

const pool = new Pool({
  connectionString: 'postgresql://rest_api_node_typescript_5nus_user:xB5j1EmnJNXyeSjw6BwtT0dHA3UZ1q9Y@dpg-d5skuklactks73bl8bhg-a.singapore-postgres.render.com/rest_api_node_typescript_5nus',
  ssl: { rejectUnauthorized: false } // esto asegura que Node.js acepte el certificado de Render
})

async function testConnection() {
  try {
    const client = await pool.connect()
    console.log('Conectado a la base de datos!')
    client.release()
  } catch (err) {
    console.error('Error de conexión:', err)
  } finally {
    await pool.end()
  }
}

testConnection()
