"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { Suspense } from "react"

interface TypewriterEffectProps {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}

function TypewriterEffectComponent({
  words,
  className,
  cursorClassName,
}: TypewriterEffectProps) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true)

      const typewriter = async () => {
        await animate(
          "span",
          {
            display: "inline-block",
            opacity: 1,
          },
          {
            duration: 0.3,
            delay: stagger(0.1),
            ease: "easeInOut",
          },
        )

        await animate(
          ".cursor",
          {
            opacity: 0,
          },
          {
            duration: 0.5,
            ease: "easeInOut",
            repeat: 0,
          },
        )
      }

      typewriter()
    }
  }, [isInView, animate, started, words])

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {words.map((word, idx) => {
          return (
            <span key={`${word.text}-${idx}`} className="inline-block">
              {word.text.split("").map((char, charIdx) => (
                <motion.span
                  initial={{ opacity: 0, display: "none" }}
                  key={`${char}-${charIdx}`}
                  className={cn(word.className)}
                >
                  {char}
                </motion.span>
              ))}
              {idx < words.length - 1 && (
                <motion.span initial={{ opacity: 0, display: "none" }} key={`space-${idx}`}>
                  &nbsp;
                </motion.span>
              )}
            </span>
          )
        })}
        <motion.span
          initial={{ opacity: 1 }}
          className={cn("cursor inline-block h-4 w-[2px] translate-y-1 bg-primary", cursorClassName)}
        />
      </motion.div>
    )
  }

  return <div className={cn("text-base font-bold sm:text-xl md:text-3xl lg:text-5xl", className)}>{renderWords()}</div>
}

// Wrapper component to ensure proper Suspense boundaries
export function TypewriterEffect(props: TypewriterEffectProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <TypewriterEffectComponent {...props} />
    </Suspense>
  );
}