import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CreateExercisePlan.css';

interface Workout {
  _id: string;
  workoutType: string;
  name: string;
  description: string;
  imageURL: string;
}

interface SelectedWorkout {
  _id: string;
  workoutType: string;
  name: string;
  description: string;
  imageURL: string;
  sets: number;
  reps: number;
}

const UpdateExercisePlan: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<SelectedWorkout[]>([]);
  const [exercisePlanName, setExercisePlanName] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!planId) {
      console.error('No planId provided');
      return;
    }

    const fetchExercisePlan = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/exercise-plans/details/${planId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        console.log(data, " exercise plan data");

        setExercisePlanName(data.name);
        setSelectedWorkouts(data.workouts.map((workout: any) => ({
          _id: workout.workout,
          workoutType: '', // Add the workoutType if available in your backend response
          name: '', // Add the name if available in your backend response
          description: '', // Add the description if available in your backend response
          imageURL: '', // Add the imageURL if available in your backend response
          sets: workout.sets,
          reps: workout.reps,
        })));
      } catch (error) {
        console.error('Failed to fetch exercise plan:', error);
      }
    };

    fetchExercisePlan();
  }, [planId]);

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
    const userId = localStorage.getItem('userId');
    const exercisePlan = {
      userId,
      name: exercisePlanName,
      workouts: selectedWorkouts.map(workout => ({
        workout: workout._id,
        sets: workout.sets,
        reps: workout.reps,
      })),
    };

    try {
      const response = await fetch(`http://localhost:3000/api/exercise-plans/${planId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercisePlan),
      });

      if (!response.ok) {
        throw new Error('Failed to update exercise plan');
      }

      console.log('Successfully updated');
      navigate('/'); // Redirect to home or any other page
    } catch (error) {
      console.error('Error updating exercise plan:', error);
    }
  };

  const filteredWorkouts = workouts.filter(workout => workout.workoutType.includes(filter));

  return (
    <div className="container">
      <h2>Update Exercise Plan</h2>
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
        <button type="submit">Update Plan</button>
      </form>
    </div>
  );
};

export default UpdateExercisePlan;
