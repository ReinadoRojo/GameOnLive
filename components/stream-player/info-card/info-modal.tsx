"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";
import { Hint } from "@/components/hint";
import { TrashIcon } from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      updateStream({ name })
        .then(() => {
          toast.success("Stream info updated successfully");
          closeRef.current?.click();
        })
        .catch(error => {
          toast.error(error.message);
        });
    });
  };

  const onRemoveThumbnail = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail removed successfully");
          setThumbnailUrl(null);
          closeRef.current?.click();
        })
        .catch(error => {
          console.error(error);
          toast.error("Something went wrong!");
        });
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          className='space-y-14'
        >
          {/* Name */}
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input
              placeholder='Stream name'
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          {/* Thumbnail */}
          {thumbnailUrl ? (
            <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
              <div className='absolute top-2 right-2 z-10'>
                <Hint
                  label='Remove thumbnail'
                  asChild
                  side='left'
                >
                  <Button
                    type='button'
                    disabled={isPending}
                    onClick={onRemoveThumbnail}
                    className='h-auto w-auto p-1.5'
                  >
                    <TrashIcon className='h-4 w-4' />
                  </Button>
                </Hint>
              </div>
              <Image
                fill
                src={thumbnailUrl}
                alt='Thumbnail'
                className='object-cover'
              />
            </div>
          ) : (
            <div className='space-y-2'>
              <Label>Thumbnail</Label>
              <div className='rounded-xl border outline-dashed outline-muted'>
                <UploadDropzone
                  endpoint='thumbnailUploader'
                  appearance={{
                    label: {
                      color: "#ffffff",
                    },
                    allowedContent: {
                      color: "#ffffff",
                    },
                  }}
                  onClientUploadComplete={res => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                    closeRef.current?.click();
                  }}
                />
              </div>
            </div>
          )}
          {/* Actions */}
          <div className='flex justify-between'>
            <DialogClose
              asChild
              ref={closeRef}
            >
              <Button
                type='button'
                variant={"ghost"}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              variant={"primary"}
              disabled={isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
