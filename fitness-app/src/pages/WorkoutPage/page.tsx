
import React from 'react';
import './workoutPage.css';
import Axios from 'axios';

const Page = () => {
  const [workouts, setWorkouts] = React.useState([]);

  React.useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await Axios.get('http://localhost:3000/api/workouts');
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className='workout'>
      <h1 className='head1'> Workouts</h1>
      <div className='workout_exercises'>
        {workouts.length > 0 ? (
          workouts.map((item, index) => (
            <div key={index} className='workout_exercise'>
              <h3>{index + 1}</h3>
              <div className='workout_exercise_image'>
                <img src={item.imageURL} alt="" />
              </div>
              <div className='workout_exercise_content'>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                {/* Add additional fields as required, e.g., reps and sets if they exist */}
              </div>
            </div>
          ))
        ) : (
          <p>No workouts found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
