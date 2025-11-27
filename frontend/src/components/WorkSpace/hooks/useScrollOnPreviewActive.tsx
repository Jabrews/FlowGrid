import { useEffect, useState } from 'react'

export default function useScrollOnPreviewActive({
  isMobile,
  isActive,
  scrollTargetRef,
  scrollTo, 
}: {
  isMobile: boolean;
  isActive: boolean;
  scrollTargetRef: React.RefObject<HTMLElement | null>;
  scrollTo?: { top: number; left: number };
}) {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    if (!isMobile) return

    if (isActive && !hasScrolled && scrollTargetRef.current) {
      scrollTargetRef.current.scrollTo({
        ...scrollTo,
        behavior: 'smooth',
      })
      setHasScrolled(true)
    }

    if (!isActive && hasScrolled) {
      setHasScrolled(false)
    }
  }, [isActive, isMobile, hasScrolled, scrollTo, scrollTargetRef])
}
