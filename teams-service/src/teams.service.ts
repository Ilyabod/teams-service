import mysql from 'mysql2/promise';

export async function getAggregatedTeams() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const [rows] = await connection.execute(`
    SELECT 
      t.id,
      t.name,
      c.country_name,
      s.sport_name
    FROM teams t
    JOIN countries c ON t.country_id = c.id
    JOIN sports s ON t.sport_id = s.id
  `);

  await connection.end();
  
  return rows;
}
