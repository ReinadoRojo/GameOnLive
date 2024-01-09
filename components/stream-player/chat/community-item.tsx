"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircleIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = async () => {
    if (!participantName || isSelf || !isHost) {
      return;
    }

    if (participantName.startsWith("guest#")) {
      // is guest
      startTransition(() => {
        onBlock(participantIdentity)
          .then(() => {
            toast.success(`${participantName} has been blocked!`);
          })
          .catch(err => {
            if (err.message === "User not found") {
              toast.info(
                "Guest user cannot chat neither block them. Chill, they will not be able to disturb.",
                {
                  dismissible: true,
                }
              );
            }
          });
      });
      return;
    }

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => {
          toast.success(`${participantName} has been blocked!`);
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "cursor-not-allowed opacity-50"
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label='Block'>
          <Button
            variant={"ghost"}
            disabled={isPending}
            onClick={handleBlock}
            className='h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition'
          >
            <MinusCircleIcon className='h-4 w-4 text-muted-foreground' />
          </Button>
        </Hint>
      )}
    </div>
  );
};
