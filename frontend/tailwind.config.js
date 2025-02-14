/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // Путь к вашим компонентам React
    ],
    theme: {
      extend: {
        colors: {
          primary: '#007bff', // Основной цвет (синий)
          secondary: '#6c757d', // Вторичный цвет (серый)
          success: '#28a745', // Зеленый для успеха
          danger: '#dc3545', // Красный для ошибок
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'], // Используем шрифт Inter
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      darkMode: 'class', // Поддержка темной темы через класс
    },
    plugins: [],
  };