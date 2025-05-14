"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the ChatButton component with SSR disabled
const ChatButton = dynamic(() => import('@/components/chatbot/chat-button'), {
  ssr: false,
  loading: () => null,
})

interface ChatButtonProps {
  label?: string;
  showLabel?: boolean;
}

function ChatButtonClient(props: ChatButtonProps) {
  return <ChatButton {...props} />
}

// Wrapper component with Suspense boundary
function ChatButtonClientWrapper(props: ChatButtonProps) {
  return (
    <Suspense fallback={null}>
      <ChatButtonClient {...props} />
    </Suspense>
  )
}

export { ChatButtonClientWrapper } 