//19 урок Outlet лучше смотреть и это связано с App.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
const MainLayout:React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
