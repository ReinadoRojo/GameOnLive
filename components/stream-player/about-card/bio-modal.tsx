"use client";

import { ElementRef, useRef, useState, useTransition } from "react";

import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
  initialValue: string | null;
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();
  const [bio, setBio] = useState<string | null>(initialValue);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (bio?.length == 0) setBio(null);
    startTransition(() => {
      updateUser({ bio })
        .then(() => {
          toast.success("User bio updated successfully");
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error("We were unable to update the user bio");
          closeRef.current?.click();
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          size={"sm"}
          className='ml-auto'
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          className='space-y-4'
        >
          <Textarea
            placeholder='User bio'
            onChange={e => setBio(e.target.value)}
            value={bio || ""}
            disabled={isPending}
            className='resize-none'
          />
          {/* Actions */}
          <div className='flex justify-between'>
            <DialogClose
              asChild
              ref={closeRef}
            >
              <Button
                type='button'
                variant='ghost'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              type='submit'
              variant={"primary"}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
