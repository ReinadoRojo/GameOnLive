"use client";

import { useMediaQuery } from "usehooks-ts";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";

import { ChatVariant, useChatSidebar } from "@/store/user-chat-sidebar";

import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";
import { useAuth } from "@clerk/nextjs";
import { ChatGuestForm } from "./chat-guest";

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const { isSignedIn } = useAuth();

  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSidebar(state => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = async () => {
    if (!send) return;

    await send(value.trim());
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
      <ChatHeader />
      {variant === ChatVariant.CHAT && isSignedIn && (
        <>
          <ChatList
            messages={reversedMessages}
            isHidden={isHidden}
          />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            misc={{
              isFollowing,
              isChatFollowersOnly,
              isChatDelayed,
            }}
          />
        </>
      )}
      {variant === ChatVariant.CHAT && !isSignedIn && (
        <>
          <ChatList
            messages={reversedMessages}
            isHidden={isHidden}
          />
          <ChatGuestForm
            isHidden={isHidden}
            misc={{
              isFollowing,
              isChatFollowersOnly,
              isChatDelayed,
            }}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className='flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2'>
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
