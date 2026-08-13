import { useState, useEffect } from 'react';
import { fetchFromApi } from '../api/config';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/api/workouts');
        setWorkouts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <div className="alert alert-warning">No workouts found</div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <div className="mb-3">
                    <span className="badge bg-info">Difficulty: {workout.difficulty}</span>
                  </div>
                  <div>
                    <strong>Exercises:</strong>
                    <ul>
                      {workout.exercises && workout.exercises.length > 0 ? (
                        workout.exercises.map((exercise, idx) => (
                          <li key={idx}>{exercise}</li>
                        ))
                      ) : (
                        <li>No exercises</li>
                      )}
                    </ul>
                  </div>
                  <small className="text-secondary">
                    Created: {new Date(workout.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
