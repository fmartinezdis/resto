import mysql from 'mysql2'
import keys from './keys'

const pool =  mysql.createPool(keys.database) 

export default pool.promise();