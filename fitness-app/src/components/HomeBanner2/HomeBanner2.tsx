'use client';
import React, {  useState,useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomeBanner2.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const HomeBanner2 = () => {
  const [Workouts, setWorkouts] = React.useState<any[] | null>(null);
  const [customPlans, setCustomPlans] = useState<any[]>([]);
  const [form, setForm] = useState({ type: '', imageUrl: '', days: '' });

  const getWorkouts = async () => {
    let data: any[] = [
      {
        type: 'Chest',
        imageUrl: 'https://media.istockphoto.com/id/998035336/photo/muscular-man-standing-in-the-gym.jpg?s=1024x1024&w=is&k=20&c=q5L2hdYrd8fHPN7TmaEWRKedyLDjCTef_T7GjoTmxfY='
      },
      {
        type: 'Back',
        imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFjayUyMGd5bXxlbnwwfHwwfHx8MA%3D%3D'
      },
      {
        type: 'Legs',
        imageUrl: 'https://media.istockphoto.com/id/804548536/photo/leg-press-exercise.webp?b=1&s=170667a&w=0&k=20&c=bAPniA10tsD7RwuqVjGdxKCTK3fnGUluyP_7vfLO-eY='
      },
      {
        type: 'Arms',
        imageUrl: 'https://media.istockphoto.com/id/602331216/photo/bulking-up-those-muscles.webp?b=1&s=170667a&w=0&k=20&c=jv-4k2oEjeej7mzvnw8w1cYWLjmKpnX0QhYpTvPhYiw='
      },
      {
        type: 'Shoulders',
        imageUrl: 'https://media.istockphoto.com/id/931505816/photo/asian-woman-doing-exercise-with-dumbbell-at-gym.jpg?s=1024x1024&w=is&k=20&c=lGvvh-2g4VYAsjK3gMZuZ9PtspPyrgILPfsaicmROMY='
      },
      {
        type: 'Abs',
        imageUrl: 'https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlc3QlMjB3b3Jrb3V0fGVufDB8fDB8fHww'
      }
    ];
    setWorkouts(data);
  };

  useEffect(() => {
    getWorkouts();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCustomPlan = () => {
    const { type, imageUrl, days } = form;
    if (type && imageUrl && days) {
      const newPlan = { type, imageUrl, days: parseInt(days) };
      setCustomPlans([...customPlans, newPlan]);
      setForm({ type: '', imageUrl: '', days: '' });
    }
  };

  return (
    <div>
      <h1 className='head1'>Workouts</h1>
      <div className="form-container">
        <input
          type="text"
          name="type"
          placeholder="Workout Type"
          value={form.type}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <input
          type="number"
          name="days"
          placeholder="Rest Days"
          value={form.days}
          onChange={handleChange}
        />
        <button onClick={addCustomPlan}>Add Custom Plan</button>
      </div>

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
        {Workouts && Workouts.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <div
                className='swiper-slide'
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '300px', // Set a height for the slide
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={()=>{
                  window.location.href = `/workouts/(${item.type})`;
                }}
              >
                <div className='swiper-slide-content'>
                  <h2 style={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px' }}>
                    {item.type}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HomeBanner2;
