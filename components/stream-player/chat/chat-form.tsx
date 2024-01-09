"use client";

import { useState } from "react";

import { cn, delay } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
  onSubmit: (value: string) => Promise<void>;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  misc: {
    isFollowing: boolean;
    isChatFollowersOnly: boolean;
    isChatDelayed: boolean;
  };
}

export const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  misc,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing =
    misc.isChatFollowersOnly && !misc.isFollowing;
  const isDisabled =
    isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (misc.isChatDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      // Submit value
      onSubmit(value)
        .then(() => {
          // On send, trigger this fn
          delay(3000) // Delays 3 seconds
            .then(_ => setIsDelayBlocked(false)); // And then, after 3 seconds allow another message
        })
        .catch(_ => setIsDelayBlocked(false)); // If error (no message published), allow try again ;)
    } else {
      onSubmit(value);
    }
  };

  if (isHidden) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center gap-y-4 p-3'
    >
      <div className='w-full'>
        <ChatInfo
          isChatDelayed={misc.isChatDelayed}
          isChatFollowersOnly={misc.isChatFollowersOnly}
        />
        <Input
          onChange={e => onChange(e.target.value)}
          value={value}
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
    </form>
  );
};

export const ChatFormSkeleton = () => {
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
