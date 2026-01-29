
import React from 'react';

interface MainDisplayProps {
  resultImage: string | null;
  isLoading: boolean;
  error: string | null;
  onDownload: () => void;
}

export const MainDisplay: React.FC<MainDisplayProps> = ({
  resultImage,
  isLoading,
  error,
  onDownload
}) => {
  return (
    <div className="w-full max-w-2xl aspect-[4/5] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-4 border-8 border-pink-100 relative bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-white to-pink-50">
      {isLoading ? (
        <div className="flex flex-col items-center animate-bounce">
          <div className="text-8xl mb-6">🪄</div>
          <p className="text-2xl font-black text-pink-500">귀염 뽀짝 마법 부리는 중...</p>
          <p className="text-pink-300 mt-2 font-medium">조금만 기다려주세요!</p>
        </div>
      ) : resultImage ? (
        <div className="relative w-full h-full flex flex-col items-center">
          <img 
            src={resultImage} 
            alt="Generated 3D Character" 
            className="w-full h-full object-contain drop-shadow-2xl rounded-2xl"
          />
          <button
            onClick={onDownload}
            className="absolute bottom-6 right-6 p-4 bg-pink-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cute-button"
            title="저장하기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      ) : error ? (
        <div className="text-center">
          <div className="text-7xl mb-4">😿</div>
          <p className="text-xl font-bold text-slate-600">{error}</p>
        </div>
      ) : (
        <div className="text-center opacity-40 px-12">
          <div className="text-[120px] mb-4">🍭</div>
          <p className="text-2xl font-bold text-pink-500">사진을 올리고 버튼을 누르면</p>
          <p className="text-lg font-medium text-pink-400">세상에서 가장 귀여운 3D 캐릭터가 나타나요!</p>
        </div>
      )}
    </div>
  );
};
