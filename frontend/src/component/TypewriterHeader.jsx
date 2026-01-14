import React, { useState, useEffect } from "react";

/**
 * TypewriterHeader
 * Props:
 *  - text: the string to type
 *  - speed: typing speed in ms (optional, default 150)
 */
function TypewriterHeader({ text, speed = 150 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting) {
        // Typing forward
        setDisplayedText(text.slice(0, index + 1));
        setIndex(prev => prev + 1);

        if (index + 1 === text.length) {
          // Pause before deleting
          setTimeout(() => setDeleting(true), 1000);
        }
      } else {
        // Deleting
        setDisplayedText(text.slice(0, index - 1));
        setIndex(prev => prev - 1);

        if (index - 1 === 0) {
          setDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, deleting, text, speed]);

  return <h1 className='text-[#E2E8F0] font-bold text-[19px]'>{displayedText}|</h1>;
}

export default TypewriterHeader;
