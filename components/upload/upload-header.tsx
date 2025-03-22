import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-rose-50 transition-colors duration-200"
        >
          <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base text-red-600">AI Powered Content Creation</p>
        </Badge>
      </div>

      <div className="text-3xl capitalize  font-bold tracking-tight text-gray-900 sm:text-4xl">
        <h1 className="font-bold py-4 text-center">
          Start Uploading Your{" "}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">PDFs</span>
            <span
              className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
              aria-hidden="true"
            ></span>
          </span>
        </h1>
      </div>
      <div className="mt-1 text-lg leading-8 text-gray-600 max-w-2xl text-center">
        <p>Upload your PDF and let our AI do the magic! </p>
      </div>
    </div>
  );
}
