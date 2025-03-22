"use server";
import { getDBConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({
  summaryId,
}: {
  summaryId: string;
}) {
  try {
    const sql = await getDBConnection();

    const user = await currentUser();

    if (!user?.id) {
      throw new Error("User not  found");
    }

    //delete from db
    const result = await sql`
    DELETE FROM pdf_summaries
    WHERE id = ${summaryId} AND user_id = ${user?.id}
    RETURNING id;
    `;

    if (result?.length > 0) {
      revalidatePath("/dashboard");

      return { success: true };
    }

    return { success: false };
  } catch (error) {
    return { success: false };
    console.log(error);
  }
}
