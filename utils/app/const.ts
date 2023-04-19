export const DEFAULT_SYSTEM_PROMPT =
  process.env.DEFAULT_SYSTEM_PROMPT || "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.";

export const OPENAI_API_HOST =
  process.env.OPENAI_API_HOST || 'https://api.openai.com';

export const LOCAL_API_HOST =
  process.env.LOCAL_API_HOST || 'http://127.0.0.1:8002';

// MYSQL_HOST, MYSQL_PORT,MYSQL_DATABASE,MYSQL_USER,MYSQL_PASSWORD

export const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
export const MYSQL_PORT = Number(process.env.MYSQL_PORT) || 3306;
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'chatbot';
export const MYSQL_USER = process.env.MYSQL_DATABASE || 'root';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
