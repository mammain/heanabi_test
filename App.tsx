
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainDisplay } from './components/MainDisplay';
import { BackgroundEmojis } from './components/BackgroundEmojis';
import { generate3DCharacter } from './services/geminiService';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [age, setAge] = useState<string>('child');
  const [gender, setGender] = useState<string>('female');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedImage) {
      alert('이미지를 먼저 업로드해주세요! ✨');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const base64Data = selectedImage.split(',')[1];
      const result = await generate3DCharacter(base64Data, age, gender);
      if (result) {
        setResultImage(result);
      } else {
        setError('캐릭터 생성에 실패했어요. 다시 시도해주세요. 😿');
      }
    } catch (err) {
      console.error(err);
      setError('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `my-3d-character-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row relative overflow-hidden text-slate-800">
      <BackgroundEmojis />
      
      {/* Sidebar - Settings & Upload */}
      <Sidebar 
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />

      {/* Main Content - Results */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 z-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-pink-500 mb-2 drop-shadow-sm">
            마이 3D 캐릭터 ✨
          </h1>
          <p className="text-pink-400 font-medium">당신만을 위한 가장 귀여운 3D 변신!</p>
        </header>

        <MainDisplay 
          resultImage={resultImage}
          isLoading={isLoading}
          error={error}
          onDownload={handleDownload}
        />
      </main>
    </div>
  );
};

export default App;
