import { useState, useEffect } from 'react';

const calcRelativeTime = (timeStamp) => {
  const now = new Date();
  const target = new Date(timeStamp);
  const diffSeconds = Math.floor((now - target) / 1000);

  if (diffSeconds < 60) return `${diffSeconds} sec ago`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

const useRelativeTime = (timeStamp) => {
  const [timeText, setTimeText] = useState(calcRelativeTime(timeStamp));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeText(calcRelativeTime(timeStamp));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeStamp]);

  return timeText;
};

export default useRelativeTime;
