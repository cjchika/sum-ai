"use client";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  generatePDFSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";

export default function UploadForm() {
  const router = useRouter();

  const handleSubmit = async (res: any) => {
    // upload the file to uploadthing
    toast.success("File Uploaded Successfully, Processing...");

    // parse the pdf using langchain
    // console.log(`Form Page Upload Result ---`, res);

    const result = await generatePDFSummary(res);
    // console.log(`Form Page Summary Result ---`, result);

    // save summary to database
    const { data = null, message = null } = result || {};

    let storedResult: any;

    if (data?.summary) {
      storedResult = await storePdfSummaryAction({
        fileUrl: res[0].serverData.file.url,
        summary: data?.summary,
        title: data?.title,
        fileName: res[0].serverData.file.name,
      });
    }

    toast.success("Summary generated and saved successfully!");

    router.push(`/summaries/${storedResult.data.id}`);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <div className="flex justify-center items-center gap-1">
        <UploadButton
          endpoint="pdfUploader"
          onClientUploadComplete={handleSubmit}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
}
