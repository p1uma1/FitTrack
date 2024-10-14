import  { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomeBanner3.css';
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

  const handleEdit = async(planId: string) => {
    console.log(`Editing plan ${planId}`);
    // Add your edit logic here
  };

  const handleDelete = async(planId: string) => {
    console.log(`Deleting plan ${planId}`);
    try {
   

      const response = await fetch(`http://localhost:3000/api/exercise-plans/${planId}`, { 
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete exercise plan');
      }

      setExercisePlans((prevPlans) => prevPlans.filter(plan => plan._id !== planId));
  }catch (error) {
    console.error('Error deleting exercise plans:', error);
    setError('Failed to delete exercise plan');
  }};

  useEffect(() => {
    getExercisePlans();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className='head1-workouts'>Workout Plans</h1>

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
        <SwiperSlide>
          <div
            className='swiper-slide'
            style={{
              backgroundImage: `url(https://www.shutterstock.com/image-vector/customisation-icon-vector-illustration-600nw-1123362929.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '300px', // Set a height for the slide
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative', // Added to position buttons
            }}
            onClick={() => {
              window.location.href = `/workouts/customWorkout`;
            }}
          >
            <div className='swiper-slide-content'>
              <h2 style={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px' }}>
                Custom Workout Plan
              </h2>
              <button 
                className='edit-btn' 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleEdit('customWorkout'); 
                }}
                style={{ position: 'absolute', top: '10px', right: '60px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}
              >
                Edit
              </button>
              <button 
                className='delete-btn' 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleDelete('customWorkout'); 
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        </SwiperSlide>
        {exercisePlans.map((plan, index) => (
          <SwiperSlide key={index}>
            <div
              className='swiper-slide'
              style={{
                backgroundImage: `url(https://www.elitelifestylecoach.com/cdn/shop/products/4_514c157d-a575-4020-9677-ededaba31911.png?v=1645132427)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px', // Set a height for the slide
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative', // Added to position buttons
              }}
              onClick={() => {
                window.location.href = `/exercise-plans/${plan._id}`;
              }}
            >
              <div className='swiper-slide-content'>
                <h2 style={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px' }}>
                  {plan.name}
                </h2>
                <button 
                  className='edit-btn' 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    window.location.href = `/workouts/customWorkout/${plan._id}`;
                  }}
                  style={{ position: 'absolute', top: '10px', right: '60px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button 
                  className='delete-btn' 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleDelete(plan._id); 
                  }}
                  style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner3;
 