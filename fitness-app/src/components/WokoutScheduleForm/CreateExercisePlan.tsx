import React, { useState, useEffect } from 'react';
import './CreateExercisePlan.css';
import { useNavigate } from 'react-router-dom';

interface Workout {
  _id: string;
  workoutType: string;
  name: string;
  description: string;
  imageURL: string;
}

const CreateExercisePlan: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<any[]>([]);
  const [exercisePlanName, setExercisePlanName] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch workouts from the server
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/workouts');
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleAddWorkout = (workout: Workout) => {
    setSelectedWorkouts([...selectedWorkouts, { ...workout, sets: 0, reps: 0 }]);
  };

  const handleSetChange = (index: number, sets: number) => {
    const updatedWorkouts = [...selectedWorkouts];
    updatedWorkouts[index].sets = sets;
    setSelectedWorkouts(updatedWorkouts);
  };

  const handleRepsChange = (index: number, reps: number) => {
    const updatedWorkouts = [...selectedWorkouts];
    updatedWorkouts[index].reps = reps;
    setSelectedWorkouts(updatedWorkouts);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const exercisePlan = {
      name: exercisePlanName,
      workouts: selectedWorkouts.map(workout => ({
        workout: workout._id,
        sets: workout.sets,
        reps: workout.reps
      }))
    };

    try {
      const response = await fetch(`http://localhost:3000/api/exercise-plans`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercisePlan)
      });

      if (!response.ok) {
        throw new Error('Failed to create exercise plan');
      } else {
        console.log('Successfully added');
        navigate('/'); // Navigate to the desired route
      }
    } catch (error) {
      console.error('Error creating exercise plan:', error);
    }
  };

  const filteredWorkouts = workouts.filter(workout => workout.workoutType.includes(filter));

  return (
    <div className="container">
      <h2>Create Exercise Plan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Plan Name:
            <input
              type="text"
              value={exercisePlanName}
              onChange={(e) => setExercisePlanName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Filter Workouts by Type:
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </label>
        </div>
        <div>
          <h3>Available Workouts</h3>
          <ul>
            {filteredWorkouts.map(workout => (
              <li key={workout._id}>
                <div>
                  <img src={workout.imageURL} alt={workout.name} width="50" />
                  <span>{workout.name} ({workout.workoutType})</span>
                  <button type="button" onClick={() => handleAddWorkout(workout)}>
                    Add to Plan
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Selected Workouts</h3>
          <div className="selected-workouts">
            {selectedWorkouts.map((workout, index) => (
              <div key={index}>
                <img src={workout.imageURL} alt={workout.name} width="50" />
                <span>{workout.name} ({workout.workoutType})</span>
                <div>
                  <label>
                    Sets:
                    <input
                      type="number"
                      value={workout.sets}
                      onChange={(e) => handleSetChange(index, parseInt(e.target.value))}
                      required
                    />
                  </label>
                  <label>
                    Reps:
                    <input
                      type="number"
                      value={workout.reps}
                      onChange={(e) => handleRepsChange(index, parseInt(e.target.value))}
                      required
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Create Plan</button>
      </form>
    </div>
  );
};

export default CreateExercisePlan;
