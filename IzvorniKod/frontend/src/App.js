import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PosterScreen from './screens/PosterScreen';
import PhotoScreen from './screens/PhotoScreen';
import LiveVideoScreen from './screens/LiveVideoScreen';
import PromoScreen from './screens/PromoScreen';
import VoteScreen from './screens/VoteScreen';
import HomeScreen from './screens/HomeScreen';
import EnterCodeScreen from './screens/EnterCodeScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/entercode' element={<EnterCodeScreen />} />
        <Route
          path='/login'
          element={<AuthenticationScreen viewType='login' />}
        />
        <Route
          path='/register'
          element={<AuthenticationScreen viewType='register' />}
        />
        <Route path='/posteri' element={<PosterScreen />} />
        <Route path='/glasanje' element={<VoteScreen />} />
        <Route path='/foto' element={<PhotoScreen />} />
        <Route path='/live' element={<LiveVideoScreen />} />
        <Route path='/promo' element={<PromoScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
