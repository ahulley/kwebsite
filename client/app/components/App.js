import React, { Component } from 'react';

import Header from '../containers/Header/HeaderContainer';
import Footer from '../containers/Footer/Footer';

const App = ({ children }) => (
  <>
    <Header />

    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;
