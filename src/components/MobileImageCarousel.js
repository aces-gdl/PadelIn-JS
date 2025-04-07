<<<<<<< Tabnine <<<<<<<
import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';

// Importa los estilos CSS de react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MobileImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    arrows: false, // Desactivamos las flechas para una mejor experiencia en móvil
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} sx={{ width: '100%', height: '100%' }}>
            <img 
              src={image.url} 
              alt={image.alt || `Slide ${index + 1}`} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                maxHeight: '50vh', // Ajusta esto según tus necesidades
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
