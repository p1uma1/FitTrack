import React from 'react';
import './workoutPage.css';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

interface Workout {
  workoutType: String;
  
  name: string;
  description: string;
  imageURL: string;
  // Add other fields if they exist in your API response
}

const Page: React.FC = () => {
  const [workouts, setWorkouts] = React.useState<Workout[]>([]); // Use the Workout type
  const { Type } = useParams<{ Type: string }>(); // Extract type from route parameters with correct typing

  React.useEffect(() => {
    console.log(Type);
    const fetchWorkouts = async () => {
      try {
        console.log(Type);
        const type = Type?.toLowerCase(); // Convert type to lowercase
        if (type) { // Ensure type is defined before making the request
          const response = await Axios.get<Workout[]>(`http://localhost:3000/api/workouts/${type}`, {
            withCredentials: true,
          });
          setWorkouts(response.data);
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, [Type]);

  return (
    <div className='workout'>
      <h1 className='head1'>Workouts for {Type}</h1>
      <div className='workout_exercises'>
        {workouts.length > 0 ? (
          workouts.map((item, index) => (
            <div key={index} className='workout_exercise'>
              <h3>{index + 1}</h3>
              <div className='workout_exercise_image'>
                <img src={item.imageURL} alt={item.name} />
              </div>
              <div className='workout_exercise_content'>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                {/* Add additional fields as required */}
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
