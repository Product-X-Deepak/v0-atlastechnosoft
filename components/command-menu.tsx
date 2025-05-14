"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import type { DialogProps } from "@radix-ui/react-dialog"
import { File, Search } from "lucide-react"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// Inner component that uses useRouter
function CommandMenuInner({ onOpenChange, ...props }: DialogProps & { onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  // Sync state with parent component
  React.useEffect(() => {
    onOpenChange(open)
  }, [open, onOpenChange])

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={setOpen} 
      {...props}
    >
      <div className="rounded-lg border border-primary/20 shadow-md md:rounded-xl overflow-hidden">
        <CommandInput 
          placeholder="Type a command or search..." 
          className="h-10 xs:h-11 sm:h-12 text-sm xs:text-base border-b border-primary/10"
        />
        <CommandList className="max-h-[60vh] xs:max-h-[65vh] sm:max-h-[70vh] overflow-y-auto">
          <CommandEmpty className="py-6 text-sm xs:text-base text-center">No results found.</CommandEmpty>
          <CommandGroup heading="Links" className="px-1 xs:px-2">
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/"))
              }}
              className="rounded-md aria-selected:bg-primary/10 py-2 xs:py-3 min-h-[44px] flex items-center touch-target-improved"
            >
              <File className="mr-2 h-4 w-4 text-primary/70" />
              <span className="text-sm xs:text-base">Home</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/sap-solutions/business-one"))
              }}
              className="rounded-md aria-selected:bg-primary/10 py-2 xs:py-3 min-h-[44px] flex items-center touch-target-improved"
            >
              <File className="mr-2 h-4 w-4 text-primary/70" />
              <span className="text-sm xs:text-base">SAP Business One</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/ai-automation/rpa-solutions"))
              }}
              className="rounded-md aria-selected:bg-primary/10 py-2 xs:py-3 min-h-[44px] flex items-center touch-target-improved"
            >
              <File className="mr-2 h-4 w-4 text-primary/70" />
              <span className="text-sm xs:text-base">RPA Solutions</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/about"))
              }}
              className="rounded-md aria-selected:bg-primary/10 py-2 xs:py-3 min-h-[44px] flex items-center touch-target-improved"
            >
              <File className="mr-2 h-4 w-4 text-primary/70" />
              <span className="text-sm xs:text-base">About</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push("/contact"))
              }}
              className="rounded-md aria-selected:bg-primary/10 py-2 xs:py-3 min-h-[44px] flex items-center touch-target-improved"
            >
              <File className="mr-2 h-4 w-4 text-primary/70" />
              <span className="text-sm xs:text-base">Contact</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </div>
    </CommandDialog>
  )
}

// Exported component that wraps the inner component with Suspense
function CommandMenu(props: React.ComponentProps<typeof Button>) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="outline"
        className="relative h-10 w-10 xs:h-11 xs:w-11 sm:h-12 sm:w-12 p-0 rounded-full bg-background/80 text-primary hover:bg-primary/10 hover:text-primary focus:ring-2 focus:ring-primary/40 min-h-[44px] min-w-[44px] touch-target-improved"
        onClick={() => setOpen(true)}
        aria-label="Search"
        {...props}
      >
        <Search className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Search</span>
      </Button>
      <Suspense fallback={null}>
        <CommandMenuInner onOpenChange={setOpen} open={open} {...props} />
      </Suspense>
    </>
  )
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function CommandMenuWrapper(props: React.ComponentProps<typeof Button>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <CommandMenu {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { CommandMenuWrapper as CommandMenu };