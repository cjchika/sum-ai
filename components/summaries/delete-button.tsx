"use client";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteSummaryAction } from "@/actions/summary-action";
import { toast } from "sonner";

// interface DeleteButtonProps {
//   summaryId: string;
// }

export default function DeleteButton({ summaryId }: { summaryId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummaryAction({ summaryId });
      if (!result.success) {
        toast.error("Unable to delete summary");
      }

      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-500/2"
          size={"icon"}
          variant={"ghost"}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Delete Summary</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete this summary? <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            className=" bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
            variant={"ghost"}
          >
            Cancel
          </Button>

          <Button
            disabled={isPending}
            onClick={handleDelete}
            className=" bg-gray-900 hover:bg-gray-600 "
            variant={"destructive"}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
