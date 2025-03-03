import React from 'react';
import AppStack from '@routes/app/AppStack';
import AuthStack from '@routes/auth/AuthStack';
import {useSelector} from 'react-redux';
import {isLoggedIn} from '@store/session/selectors';

const Router = () => {
  return useSelector(isLoggedIn) ? <AppStack /> : <AuthStack />;
};

export default Router;
