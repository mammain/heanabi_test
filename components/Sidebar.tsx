
import React from 'react';

interface SidebarProps {
  selectedImage: string | null;
  setSelectedImage: (img: string | null) => void;
  age: string;
  setAge: (age: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedImage,
  setSelectedImage,
  age,
  setAge,
  gender,
  setGender,
  onGenerate,
  isLoading
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="w-full md:w-80 bg-white/80 backdrop-blur-md border-r border-pink-100 p-6 flex flex-col gap-8 z-20 shadow-xl">
      <div className="flex flex-col gap-4">
        <label className="text-lg font-bold text-pink-600 flex items-center gap-2">
          📸 이미지 올리기
        </label>
        <div className="relative group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer block w-full aspect-square rounded-2xl border-4 border-dashed border-pink-200 hover:border-pink-400 bg-pink-50/50 flex items-center justify-center overflow-hidden transition-all"
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <span className="text-4xl mb-2 block">💝</span>
                <span className="text-sm font-medium text-pink-400">사진을 클릭해서 업로드!</span>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-lg font-bold text-pink-600">🧸 연령대</label>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 rounded-xl border-2 border-pink-100 bg-white volumetric-input focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          <option value="child">어린이 (귀염폭발)</option>
          <option value="teen">청소년 (상큼발랄)</option>
          <option value="adult">성인 (우아깜찍)</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-lg font-bold text-pink-600">🎀 성별</label>
        <div className="flex gap-2">
          <button
            onClick={() => setGender('female')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              gender === 'female' 
                ? 'bg-pink-500 text-white shadow-lg scale-105' 
                : 'bg-pink-50 text-pink-400 border border-pink-100'
            }`}
          >
            공주님
          </button>
          <button
            onClick={() => setGender('male')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              gender === 'male' 
                ? 'bg-pink-500 text-white shadow-lg scale-105' 
                : 'bg-pink-50 text-pink-400 border border-pink-100'
            }`}
          >
            왕자님
          </button>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={onGenerate}
          disabled={isLoading || !selectedImage}
          className={`w-full py-5 rounded-2xl text-xl font-black text-white cute-button bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:top-0 disabled:shadow-none`}
        >
          {isLoading ? '변신 중... ✨' : '3D 캐릭터 만들기!'}
        </button>
      </div>
    </aside>
  );
};
