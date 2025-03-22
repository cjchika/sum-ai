"use server";

import { getDBConnection } from "@/lib/db";
import { generateSummaryFromGeminiAI } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { formattedFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
// import { generateSummaryFromOpenAI } from "@/lib/openai";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePDFSummary(
  uploadReponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadReponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadReponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  let summary;

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    // console.log(pdfText);

    try {
      summary = await generateSummaryFromGeminiAI(pdfText);
      // console.log(summary);
      if (!summary) {
        return {
          success: false,
          message: "Failed to generate summary!",
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
    }

    const formattedFileName = formattedFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully!",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

export async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDBConnection();
    const [savedSummary] = await sql`
		INSERT INTO pdf_summaries (
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
)
VALUES (
    ${userId},
    ${fileUrl},
    ${summary},
    ${title},
    ${fileName}
) RETURNING id, summary_text;
		`;
    return savedSummary;
  } catch (error) {
    console.log("Error saving PDF summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  let savedSummary: any;

  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found!",
        data: null,
      };
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF Summary, try again!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF Summary",
      data: null,
    };
  }

  // Revalidated cache
  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: false,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary.id,
    },
  };
}
