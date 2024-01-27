"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const TextAnimate = ({ children, className }) => {
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [animationPercentage, setAnimationPercentage] = useState(0);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const scrollWidth = textElement.scrollWidth;
      const clientWidth = textElement.clientWidth;
      // add class name if text is overflowing
      textElement.classList.toggle("text-animation", scrollWidth > clientWidth);

      if (scrollWidth > clientWidth) {
        const overflowAmount = scrollWidth - clientWidth;
        const animationRange = 150; // Adjust the range of animation
        const translatePercentage = parseFloat(
          (overflowAmount / scrollWidth) * animationRange
        );
        setAnimationPercentage(translatePercentage);
      } else {
        setAnimationPercentage(0);
      }
    }
  }, [children]);

  return (
    <p
      ref={textRef}
      className={cn("text-neutral-400 text-nowrap", className)}
      style={{ "--translateX-value": -animationPercentage + "11%" }}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};
