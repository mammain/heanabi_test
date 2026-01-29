
import React from 'react';

const emojis = ['💖', '✨', '🍭', '🧸', '🎀', '🎈', '🍓', '🍰', '🌈', '🍦'];

export const BackgroundEmojis: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="emoji-float text-4xl md:text-6xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        >
          {emojis[i % emojis.length]}
        </div>
      ))}
    </div>
  );
};
