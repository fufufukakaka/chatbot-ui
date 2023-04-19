import mysql from 'serverless-mysql';
import { MYSQL_HOST, MYSQL_PORT,MYSQL_DATABASE,MYSQL_USER,MYSQL_PASSWORD  } from '@/utils/app/const';

const db = mysql({
  config: {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
  }
});
export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
