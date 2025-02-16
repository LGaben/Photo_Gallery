import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SidePanel.css';

function SidePanel() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Открытие/закрытие панели
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="md:hidden"> {/* Показываем только на мобильных устройствах */}
      {/* Кнопка для открытия панели */}
      <button
        onClick={togglePanel}
        className="fixed bottom-4 left-4 z-50 bg-white text-black p-2 rounded shadow-lg"
        >
        <Link
            to="/about-me"
            className="absolute link_about_me_mobile"
            onClick={togglePanel}
          >
            <span className="text">Обо мне</span>
          </Link>
      </button>
    </div>
  );
}

export default SidePanel;