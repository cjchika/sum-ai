import React from "react";
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-gray-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

export interface SummaryType {
  id: string;
  file_name: string;
  original_file_url: string;
  title: string;
  status: string;
  summary_text: string;
  user_id: string;
  created_at: string;
}

const SummaryCard = ({ summary }: { summary: SummaryType }) => {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link className="block p-4 sm:p-6" href={`summaries/${summary.id}`}>
          <div className="flex flex-col gap-2 sm:gap-4">
            <div className="flex items-start gap-2 sm:gap-4">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
                  {summary.title || formatFileName(summary.file_name)}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(summary?.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>

            <p className="text-sm line-clamp-2 sm:text-base pl-2 text-gray-600">
              {summary?.summary_text}
            </p>

            <div className="flex justify-between items-center mt-2 sm:mt-4">
              <StatusBadge status={summary?.status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default SummaryCard;
