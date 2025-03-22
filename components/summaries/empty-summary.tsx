import { FileText } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export const EmptySummaryState = () => {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-3">
        <FileText className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-semibold  text-gray-600">No Summaries</h2>
        <p className="text-gray-500 max-w-md">
          Upload your first PDF to get started with AI-powered summaries
        </p>

        <Button
          variant={"link"}
          className="mt-4 text-white bg-linear-to-r from-rose-500 to-rose-700"
        >
          <Link href={"/upload"}>Upload PDF</Link>
        </Button>
      </div>
    </div>
  );
};
