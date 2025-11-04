import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export async function testConnection() {
  try {
    console.log('🔗 Testing database connection...')
    
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT version()`
    console.log('📊 Database version:', result)
    
  } catch (error:any ) {
    console.error('❌ Database connection failed:')
    console.error(error)
    
    // More detailed error information
    if (error.code === 'ETIMEDOUT') {
      console.error('🕒 Connection timeout - check your network/firewall')
    } else if (error.code === 'ENOTFOUND') {
      console.error('🌐 Host not found - check the database host URL')
    } else if (error.message.includes('SSL')) {
      console.error('🔒 SSL connection issue - check SSL configuration')
    } else if (error.message.includes('authentication')) {
      console.error('🔑 Authentication failed - check username/password')
    }
  } finally {
    await prisma.$disconnect()
  }
}

