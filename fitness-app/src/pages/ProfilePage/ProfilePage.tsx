
import './ProfilePage.css';

const ProfilePage = () => {
  // Mock user data - replace with real data from API
  const user = {
    email: 'user@example.com',
    age: 25,
    weight: 70,
    gender: 'Male',
    height: 175
  };

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        <h1>User Profile</h1>
      </div>
      <div className='profile-content'>
        <div className='profile-info'>
          <div className='profile-info-item'>
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
          <div className='profile-info-item'>
            <label>Age:</label>
            <p>{user.age}</p>
          </div>
          <div className='profile-info-item'>
            <label>Weight:</label>
            <p>{user.weight} kg</p>
          </div>
          <div className='profile-info-item'>
            <label>Gender:</label>
            <p>{user.gender}</p>
          </div>
          <div className='profile-info-item'>
            <label>Height:</label>
            <p>{user.height} cm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
