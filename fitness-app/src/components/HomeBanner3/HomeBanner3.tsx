import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../HomeBanner2/HomeBanner2.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const HomeBanner3 = () => {
  const [exercisePlans, setExercisePlans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getExercisePlans = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }

      const response = await fetch(`http://localhost:3000/api/exercise-plans/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch exercise plans');
      }

      const result = await response.json();
      console.log(result);
      setExercisePlans(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exercise plans:', error);
      setError('Failed to fetch exercise plans');
      setLoading(false);
    }
  };

  useEffect(() => {
    getExercisePlans();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className='head1'>Workout Plans</h1>
      <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
        <SwiperSlide>
          <div
            className='swiper-slide'
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '300px',
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
                Custom Workout Plan
              </h2>
            </div>
          </div>
        </SwiperSlide>
        {exercisePlans.map((plan, index) => (
          <SwiperSlide key={index}>
            <div
              className='swiper-slide'
              style={{
                backgroundImage: `url(${plan.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                window.location.href = `/exercise-plans/${plan._id}`;
              }}
            >
              <div className='swiper-slide-content'>
                <h2 style={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px' }}>
                  {plan.name}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner3;
