import React, { useEffect, useState } from 'react';
import './UserPage.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        // Fetching user data using email
        const userQuery = query(
          collection(db, "user"),  // Collection path
          where("email", "==", user.email)
        );

        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setUserInfo(doc.data());
          });
        } else {
          console.log('No such document!');
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div className="user-page">
      <h1>User Information</h1>
      <div className="user-info">
        <p><strong>Username:</strong> {userInfo.name ? userInfo.name : 'N/A'}</p>
        <p><strong>Email:</strong> {userInfo.email ? userInfo.email : 'N/A'}</p>
      </div>

      <div className="signout-section">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default UserPage;
