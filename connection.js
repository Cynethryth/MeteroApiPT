import mysql from 'mysql2'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"admin",
    database: 'petsitter'
  });
export default connection