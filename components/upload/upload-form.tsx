import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  generatePDFSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";

// import { z } from "zod";

// const schema = z.object({
//   file: z
//     .instanceof(File, { message: "Invalid file" })
//     .refine((file) => file.size <= 20 * 1024 * 1024, {
//       message: "File size must be less than 20MB",
//     })
//     .refine((file) => file.type.startsWith("application/pdf"), {
//       message: "File must be PDF",
//     }),
// });

export default function UploadForm() {
  const router = useRouter();
  // const handleFileChange = (files: File[]) => {
  //   const file = files[0];

  //   // schema with zod
  //   // validate fields
  //   const validatedField = schema.safeParse({ file });

  //   console.log(validatedField);

  //   if (!validatedField.success) {
  //     console.log(
  //       validatedField.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
  //     );
  //     return;
  //   }
  // };

  const handleSubmit = async (res: any) => {
    // Do something with the response

    // upload the file to uploadthing
    // console.log("Files: ", res);
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

    // redirect to the summary page
    // console.log(storedResult);

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
