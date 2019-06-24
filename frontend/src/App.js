import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={null} />
      <Route path='/auth' component={null} />
      <Route path='/events' component={null} />
      <Route path='/bookings' component={null} />
    </BrowserRouter>
  );
}

export default App;
