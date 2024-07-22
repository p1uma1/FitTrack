import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../HomeBanner2/HomeBanner2.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const HomeBanner3 = () => {


  return (
    <div><h1 className='head1'>Workout Plans</h1>
        <SwiperSlide>
          <div
            className='swiper-slide'
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '300px', // Set a height for the slide
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => {
              window.location.href = `/workouts/customWorkout`;
            }}
          >
            <div className='swiper-slide-content'>
              <h2 style={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px' }}>
                Custom WorkoutPlan
              </h2>
            </div>
          </div>
        </SwiperSlide>
    </div>
  )
}

export default HomeBanner3