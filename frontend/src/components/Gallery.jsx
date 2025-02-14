import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AlbumsPage from './AlbumsPage';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const swiperRef = useRef(null); // Для управления Swiper

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('/api/photocarousel/');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 relative"
    >

      {/* Кнопка "About Me" в верхнем левом углу */}
      <Link
        to="/about-me"
        className="button-49 absolute top-4 left-4 z-10 md:top-6 md:left-6"
      >
        <span className="text">Обо мне</span>
      </Link>

      <h1 className="text-4xl text-h1 mb-8 z-10 text-center">Александра Филина</h1>

      {/* Карусель с фотографиями */}
      <div className="relative w-full max-w-7xl px-4">
        {/* Кнопка "Назад" */}
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="button-left absolute top-1/2 left-4 transform -translate-y-1/2 z-10 md:left-8"
        ></button>

        {/* Кнопка "Вперед" */}
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="button-right absolute top-1/2 right-4 transform -translate-y-1/2 z-10 md:right-8"
        ></button>

        <Swiper
          ref={swiperRef} // Сохраняем ссылку на Swiper
          modules={[Navigation, A11y, Scrollbar]}
          spaceBetween={0} // Расстояние между слайдами
          slidesPerView={1} // Один слайд виден
          centeredSlides={true} // Центрируем активный слайд
          loop={true} // Бесконечная прокрутка
          scrollbar={{ draggable: true }} // Добавляем scrollbar
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className="mySwiper"
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative group overflow-hidden border border-transparent cursor-pointer"
              >
                {/* Изображение */}
                <img
                  src={`${photo.image}`}
                  alt={photo.description}
                  className="w-full h-full object-contain mx-auto transition-transform duration-300"
                  loading="lazy" // Оптимизация загрузки
                  style={{
                    maxWidth: 'calc(100vw - 40px)', // Отступы по ширине
                    maxHeight: 'calc(100vh - 200px)', // Отступы по высоте
                  }}
                />
             
                {/* Оверлей с описанием */}
                <div className="absolute inset-0 via-transparent to-transparent p-4 flex items-end description-overlay">
                  <p className="text-white white-text-with-shadow font-semibold">{photo.description || 'No description'}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AlbumsPage />

    </motion.div>
  );
}

export default Gallery;