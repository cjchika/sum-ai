"use server";

import { getDBConnection } from "./db";

export async function getSummaries(userId: string) {
  const sql = await getDBConnection();
  const summaries = await sql`SELECT *
		from pdf_summaries where user_id = ${userId}
		ORDER BY created_at DESC`;

  return summaries;
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDBConnection();

    const [summary] = await sql`SELECT
		id,
		user_id,
		title,
		original_file_url,
		summary_text,
		created_at,
		updated_at,
		status,
		file_name,
		LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ',
		'')) + 1 as word_count
		FROM pdf_summaries where id=${id}`;

    return summary;
  } catch (error) {
    console.log("Error fetching summary by id", error);
  }
}

export async function getUserUploadCount(userId: string) {
  const sql = await getDBConnection();
  try {
    const [result] =
      await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}`;
    return result.count || 0;
  } catch (error) {
    console.error("Error fetching user upload count", error);
    return 0;
  }
}
