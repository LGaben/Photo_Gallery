import React from 'react';
import { Link } from 'react-router-dom';

function AboutMe() {
  // Функция для копирования email в буфер обмена
  const copyEmailToClipboard = () => {
    const email = 'your_email@example.com'; // Замените на ваш реальный email
    navigator.clipboard
      .writeText(email)
      .catch((error) => {
        console.error('Не удалось скопировать email:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      {/* Фон */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-600 to-purple-700 pointer-events-none"
        style={{
          backgroundAttachment: 'fixed',
          zIndex: -1,
        }}
      ></div>

      {/* Заголовок */}
      <h1 className="text-4xl font-bold text-h1 mb-8 z-10 text-center">Обо мне</h1>

      {/* Описание */}
      <div className="rounded-lg p-8 max-w-3xl w-full text-center">
        <p className="text-gray-700 text-lg mb-6">
        Extract the HTML and CSS of elements and all its child elements (as whole components).
You can save these Codepen snippets on the cloud and start your collection of beautiful elements that you can use on your projects from today on. 
        </p>

        {/* Ссылки */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="https://t.me/your_telegram"
            target="_blank"
            rel="noopener noreferrer"
            className="button-48"
          >
            <span class="text">Telegram</span>
          </a>
          <a
            href="https://instagram.com/your_instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="button-48"
          >
            <span class="text">Instagram</span>
          </a>
          <button
            onClick={copyEmailToClipboard}
            className="button-48"
          >
            <span class="text">Copy Email</span>
          </button>
        </div>
      </div>

      {/* Кнопка перехода на страницу галереи */}
      <Link to="/" className="mt-8 button-48">
        <span class="text">На главную</span>
      </Link>
    </div>
  );
}

export default AboutMe;