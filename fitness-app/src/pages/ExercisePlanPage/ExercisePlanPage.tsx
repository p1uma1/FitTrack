import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import '../WorkoutPage/workoutPage.css';

const ExercisePlanPage = () => {
  const { planId } = useParams<{ planId: string }>();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getWorkouts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/exercise-plans/workouts/${planId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }

      const result = await response.json();
      setWorkouts(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError('Failed to fetch workouts');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (planId) {
      getWorkouts();
    }
  }, [planId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='workout'>
      <h2>Workouts for Plan {planId}</h2>
      {workouts.length > 0 ? (
        workouts.map((item, index) => (
          <div key={index} className='workout_exercise'>
            <h3>Exercise {index + 1}</h3>
            <div className='workout_exercise_image'>
              <img src={item.workout.imageURL} alt={item.workout.name} />
            </div>
            <div className='workout_exercise_content'>
              <h2>{item.workout.name}</h2>
              <p>{item.sets} x {item.reps}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No workouts found for this plan</p>
      )}
    </div>
  );
};

export default ExercisePlanPage;
