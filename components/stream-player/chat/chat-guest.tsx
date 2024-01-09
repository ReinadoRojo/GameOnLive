"use client";

import { useState } from "react";

import { cn, delay } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignInButton } from "@clerk/nextjs";

interface ChatGuestFormProps {
  isHidden: boolean;
  misc: {
    isFollowing: boolean;
    isChatFollowersOnly: boolean;
    isChatDelayed: boolean;
  };
}

export const ChatGuestForm = ({ isHidden, misc }: ChatGuestFormProps) => {
  const [dummyValue, setDummyValue] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const isFollowersOnlyAndNotFollowing =
    misc.isChatFollowersOnly && !misc.isFollowing;
  const isDisabled = isHidden || isFollowersOnlyAndNotFollowing;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenModal(true);
  };

  if (isHidden) return null;

  return (
    <form
      className='flex flex-col items-center gap-y-4 p-3'
      onSubmit={onSubmit}
    >
      <div className='w-full'>
        <ChatInfo
          isChatDelayed={misc.isChatDelayed}
          isChatFollowersOnly={misc.isChatFollowersOnly}
        />
        <Input
          onChange={e => setDummyValue(e.target.value)}
          value={dummyValue}
          disabled={isDisabled}
          placeholder='Send a message'
          className={cn(
            "border-white/10",
            misc.isChatFollowersOnly && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className='ml-auto'>
        <Button
          type='submit'
          variant={"primary"}
          size={"sm"}
          disabled={isDisabled}
        >
          Chat
        </Button>
      </div>
      <Dialog open={openModal}>
        <DialogContent>
          <DialogHeader>You must be signed in to chat</DialogHeader>
          <div className='flex justify-between'>
            <DialogClose
              asChild
              onClick={() => setOpenModal(false)}
            >
              <Button variant={"destructive"}>Cancel</Button>
            </DialogClose>
            <SignInButton redirectUrl={window.location.href}>
              <Button variant={"primary"}>Sign In</Button>
            </SignInButton>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export const ChatGuestFormSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-y-4 p-3'>
      <Skeleton className='w-full h-10' />
      <div className='flex items-center gap-x-2 ml-auto'>
        <Skeleton className='h-7 w-7' />
        <Skeleton className='h-7 w-12' />
      </div>
    </div>
  );
};
