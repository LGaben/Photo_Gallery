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
          Здравствуйте! Меня зовут Александра Филина, я портретный фотограф.
        </p>
        <p>
          Я внимательно слушаю пожелания и идеи каждого клиента, чтобы создать атмосферу доверия и понимания.
          Стараюсь сделать процесс съемки расслабляющим и веселым, чтобы вы могли быть самими собой и чувствовать себя комфортно перед камерой.
          Мой опыт позволяет мне уверенно направлять вас во время съемки, что помогает избежать лишнего напряжения и стресса.
          Эти аспекты помогают создать уникальную атмосферу, в которой каждый может раскрыться и насладиться процессом.
        </p>
        <p>
          Я верю, что фотография — это искусство, способное сохранять мгновения.
        </p>
        <p>
          Вы можете написать мне и узнать подробнее о съемке.
        </p>
        <p className="mb-6">
          Буду рада познакомиться и воплотить ваши идеи в реальность!
        </p>

        {/* Ссылки */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="https://t.me/Alex_Filina"
            target="_blank"
            rel="noopener noreferrer"
            className="page_about_me"
          >
            <span class="text">Telegram</span>
          </a>
          <a
            href="https://www.instagram.com/alexandra.filina"
            target="_blank"
            rel="noopener noreferrer"
            className="page_about_me"
          >
            <span class="text">Instagram</span>
          </a>
          <button
            onClick={copyEmailToClipboard}
            className="page_about_me"
          >
            <span class="text">Copy Email</span>
          </button>
        </div>
      </div>

      {/* Кнопка перехода на страницу галереи */}
      <Link to="/" className="mt-8 page_about_me">
        <span class="text">На главную</span>
      </Link>
    </div>
  );
}

export default AboutMe;