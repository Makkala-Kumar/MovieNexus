import React, { useEffect, useState } from 'react';
import './UserPage.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [watchlistStats, setWatchlistStats] = useState({
    watching: 0,
    completed: 0,
    dropped: 0,
    planToWatch: 0,
    allMovies: 0,
  });
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

    // Fetch the watchlist from localStorage and compute stats
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const watchlistStats = {
      watching: savedWatchlist.filter(movie => movie.status === 'Watching').length,
      completed: savedWatchlist.filter(movie => movie.status === 'Completed').length,
      dropped: savedWatchlist.filter(movie => movie.status === 'Dropped').length,
      planToWatch: savedWatchlist.filter(movie => movie.status === 'Plan to Watch').length,
      allMovies: savedWatchlist.length,
    };

    setWatchlistStats(watchlistStats);
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

      <div className="watchlist-stats">
        <h2>Your Watchlist Summary</h2>
        <div className="watchlist-grid">
          <div className="watchlist-grid-item">
            <strong>All Movies:</strong> {watchlistStats.allMovies}
          </div>
          <div className="watchlist-grid-item">
            <strong>Watching:</strong> {watchlistStats.watching}
          </div>
          <div className="watchlist-grid-item">
            <strong>Completed:</strong> {watchlistStats.completed}
          </div>
          <div className="watchlist-grid-item">
            <strong>Dropped:</strong> {watchlistStats.dropped}
          </div>
          <div className="watchlist-grid-item">
            <strong>Plan to Watch:</strong> {watchlistStats.planToWatch}
          </div>
        </div>
      </div>

      <div className="signout-section">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default UserPage;
