import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomeBanner2.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';

const HomeBanner2 = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);

  const getWorkouts = async () => {
    let data: any[] = [
      {
        type: 'Chest',
        imageUrl: 'https://cdn.icon-icons.com/icons2/2354/PNG/512/chest_male_icon_143248.png'
      },
      {
        type: 'Back',
        imageUrl: 'https://static.thenounproject.com/png/1861021-200.png'
      },
      {
        type: 'Legs',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4760/4760589.png'
      },
      {
        type: 'Arms',
        imageUrl: 'https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-arm-line-icon-vector-png-image_6682713.png'
      },
      {
        type: 'Shoulders',
        imageUrl: 'https://static.thenounproject.com/png/3826963-200.png'
      },
      {
        type: 'Abs',
        imageUrl: 'https://media.istockphoto.com/id/858902142/vector/muscular-male-torso-icon.jpg?s=612x612&w=0&k=20&c=nYne7thqGNy9DfYr8yfZ8lqzGWNEILCYkrS0oJnUNbc='
      }
    ];
    setWorkouts(data);
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <div>
      <h1 className='head1-workouts'>Workouts</h1>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {workouts.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <div
              className='swiper-slide'
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: '75%', // Set the size to 75% of the container
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '300px', // Keep this height or adjust as needed
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              
              
              onClick={() => {
                window.location.href = `/workouts/${item.type}`;
              }}
            >
              {/* Card header at the top */}
              <div className='card-header' style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                width: '100%',
                textAlign: 'center',
                padding: '10px 0',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}>
                {item.type}
              </div>

              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner2;
