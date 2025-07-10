"use client"

import React, { useEffect } from 'react';
import MainHeader from './main-header';
import DashboardPage from './dashboard';

export default function MainContent() {

  useEffect(() => {
    //loadData();
  }, []);


  return (<>
    {localStorage.getItem('isAuthenticated') !== "yes" ? null : <MainHeader />}
    <DashboardPage />
  </>);
}