import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/albom_page.css'; // Импортируйте стили
import { motion, AnimatePresence } from 'framer-motion';
import { getDeviceType } from './getDeviceType'

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null); // Выбранный альбом
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null); // Индекс выбранной фотографии
  const device = getDeviceType()

  useEffect(() => {
    // Загружаем все фотографии с бэкенда
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('/api/photos/');
        const photos = response.data;

        // Группируем фотографии по альбомам
        const groupedAlbums = {};
        photos.forEach((photo) => {
          photo.alboms.forEach((album) => {
            if (!groupedAlbums[album.name]) {
              groupedAlbums[album.name] = {
                id: album.name,
                name: album.name,
                photos: [],
              };
            }
            groupedAlbums[album.name].photos.push(photo);
          });
        });

        // Преобразуем объект в массив
        setAlbums(Object.values(groupedAlbums));
      } catch (error) {
        console.error('Ошибка при загрузке фотографий:', error);
      }
    };

    fetchPhotos();
  }, []);

  // Закрытие модального окна
  const closeModal = () => {
    setSelectedAlbum(null);
    setSelectedPhotoIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">

      {/* Заголовок */}
      { device === true ? 
        <p className="p_size text-4xl text-h1 mb-8 z-10 text-center">Альбомы</p>
        : <h1 className="text-4xl text-h1 mb-8 z-10 text-center">Альбомы</h1>
      }
      

      {/* Список альбомов */}
        <div className="grid1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
          {albums.map((album) => (
            <motion.div
            key={album.id}
            initial={{ scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }} // Анимация масштабирования при наведении
            transition={{ duration: 0.5 }} // Плавность анимации
            onClick={() => setSelectedAlbum(album)}
            className="relative group1 overflow-hidden border border-transparent cursor-pointer"
            >
              <Link
                className="relative"
              >
                {/* Изображение альбома */}
                <img
                  src={album.photos[0]?.image} // Первая фотография из альбома
                  alt={album.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Оверлей с названием альбома */}
                <div className={`absolute inset-0 via-transparent to-transparent p-4 flex items-end 
                  ${ device === true ? 'description-overlay_mobile' : 'description-overlay'}`}>
                  <p className="text-white white-text-with-shadow font-semibold">{album.name}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Модальное окно для альбома */}
        <AnimatePresence>
          {selectedAlbum && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-75 z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gray-100 rounded-lg max-w-4xl max-h-full overflow-auto w-full md:w-11/12 lg:w-3/4 xl:w-2/3"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Кнопка закрытия */}
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
  
                {/* Заголовок альбома */}
                <h2 className="text-2xl font-bold text-center mt-4">{selectedAlbum.name}</h2>
  
                {/* Список фотографий в альбоме */}
                <div className="grid1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4 p-6">
                  {selectedAlbum.photos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedPhotoIndex(index)} // Открываем большую версию фото
                      className="relative group1 overflow-hidden border border-transparent"
                    >
                      <img
                        src={photo.image}
                        alt={photo.description}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
  
                {/* Модальное окно для большой фотографии */}
                <AnimatePresence>
                  {selectedPhotoIndex !== null && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="fixed inset-0 flex items-center justify-center bg-black z-50"
                      onClick={() => setSelectedPhotoIndex(null)}
                    >
                      <motion.img
                        src={selectedAlbum.photos[selectedPhotoIndex]?.image}
                        alt={selectedAlbum.photos[selectedPhotoIndex]?.description}
                        className="max-w-full max-h-full object-contain mx-auto my-8"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}

export default AlbumsPage;