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

/**
 * Создание новой команды
 */
export async function createTeam(team: { name: string, country_id: number, sport_id: number }) {
  const connection = await mysql.createConnection(dbConfig);

  const [result] = await connection.execute(
    'INSERT INTO teams (name, country_id, sport_id) VALUES (?, ?, ?)',
    [team.name, team.country_id, team.sport_id]
  );

  await connection.end();
  return { id: (result as any).insertId, ...team };
}

/**
 * Полное обновление команды
 */
export async function updateTeam(id: number, team: { name: string, country_id: number, sport_id: number }) {
  const connection = await mysql.createConnection(dbConfig);

  await connection.execute(
    'UPDATE teams SET name = ?, country_id = ?, sport_id = ? WHERE id = ?',
    [team.name, team.country_id, team.sport_id, id]
  );

  await connection.end();
  return { id, ...team };
}

/**
 * Частичное обновление команды
 */
export async function patchTeam(id: number, fields: Partial<{ name: string, country_id: number, sport_id: number }>) {
  const connection = await mysql.createConnection(dbConfig);

  const sets = Object.entries(fields).map(([key, _]) => `${key} = ?`).join(', ');
  const values = [...Object.values(fields), id];

  await connection.execute(
    `UPDATE teams SET ${sets} WHERE id = ?`,
    values
  );

  await connection.end();
  return { id, ...fields };
}

/**
 * Удаление команды по ID
 */
export async function deleteTeam(id: number) {
  const connection = await mysql.createConnection(dbConfig);

  await connection.execute('DELETE FROM teams WHERE id = ?', [id]);

  await connection.end();
}
