import pool from "./db";
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise'

export async function safeCallModel<T>(promise: Promise<T>): Promise<[null, T] | [Error, null]> {
  try {
    const result = await promise
    return [null, result]
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null]
  }
}

export type DBResult = RowDataPacket[] | ResultSetHeader

export type QueryResult =
  | RowDataPacket[]
  | RowDataPacket[][]
  | ResultSetHeader

export async function safeQuery<T extends DBResult = DBResult>(
  query: string,
  params: any[] = []
): Promise<[null, T] | [Error, null]> {
  try {
    const [results] = await pool.execute<T>(query, params)
    return [null, results]
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null]
  }
}