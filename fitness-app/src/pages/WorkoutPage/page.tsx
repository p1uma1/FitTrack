import React from 'react';
import './workoutPage.css';
import Axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get the route parameters

const Page = () => {
  const [workouts, setWorkouts] = React.useState([]);
  const { Type } = useParams(); // Extract type from route parameters

  React.useEffect(() => {
    console.log(Type);
    const fetchWorkouts = async () => {
      try {
        console.log(Type);
        const type = Type?.toLowerCase(); // Convert type to lowercase
        if (type) { // Ensure type is defined before making the request
          const response = await Axios.get(`http://localhost:3000/api/workouts/${type}`, {
            withCredentials: true, // Correct key for credentials
          });
          setWorkouts(response.data);
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, [Type]); // Dependency array to refetch if type changes

  return (
    <div className='workout'>
      <h1 className='head1'>Workouts for {Type}</h1> {/* Use Type here */}
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
