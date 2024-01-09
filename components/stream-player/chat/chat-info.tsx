"use client";

import { useMemo } from "react";
import { InfoIcon } from "lucide-react";

import { Hint } from "@/components/hint";

interface ChatInfoProps {
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const ChatInfo = ({
  isChatDelayed,
  isChatFollowersOnly,
}: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isChatFollowersOnly && !isChatDelayed) {
      return "Chat is only available to followers";
    }

    if (isChatDelayed && !isChatFollowersOnly) {
      return "Delay for message are applied (3 seconds)";
    }

    if (isChatDelayed && isChatFollowersOnly) {
      return "Chat only for followers. Messages are delayed (3 seconds)";
    }

    return "";
  }, [isChatDelayed, isChatFollowersOnly]);

  const label = useMemo(() => {
    if (isChatFollowersOnly && !isChatDelayed) {
      return "Followers only";
    }

    if (isChatDelayed && !isChatFollowersOnly) {
      return "Slow mode";
    }

    if (isChatDelayed && isChatFollowersOnly) {
      return "Followers only and Slow mode";
    }

    return "";
  }, [isChatDelayed, isChatFollowersOnly]);

  if (!isChatDelayed && !isChatFollowersOnly) return null;

  return (
    <div className='p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2'>
      <Hint label={hint}>
        <InfoIcon className='h-4 w-4' />
      </Hint>
      <p>{label}</p>
    </div>
  );
};
