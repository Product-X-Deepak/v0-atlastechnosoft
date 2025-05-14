"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the ChatWidget with loading optimization
const ChatWidgetDynamic = dynamic(() => import("./chat-widget"), {
  ssr: false,
  loading: () => (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  ),
});

export default function ClientChatWidget() {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <Suspense fallback={
        <div className="flex h-full w-full items-center justify-center p-8 bg-white rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      }>
        <ChatWidgetDynamic />
      </Suspense>
    </div>
  );
} 