'use client';

import { useEffect, useState } from 'react';

export default function Counter({
  title,
  end,
  duration = 2000,
  suffix = '',
}: {
  title: string;
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); // assumes ~60fps
    const step = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    step();
  }, [end, duration]);

  return (
    <div className="space-y-2">
      <p className="text-4xl font-bold text-blue-700">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}
