import React from 'react';
import { useAuthContext, MoveNavProps } from '../contexts/AuthContext';
import { LoginNavigation } from './notab/login/LoginNavigation';
import { TabNavigation } from './tab/TabNavigation';
import { NoTabNavigation } from './notab/NoTabNavigation';

export const RootScreen = () => {
  const { isLoggedIn } = useAuthContext();
  const { MoveNav } = useAuthContext();

  return isLoggedIn ? getNavigationObject(MoveNav) : <LoginNavigation />;
};

const getNavigationObject = (props:MoveNavProps) => {
  if (props.istab === "NoTab") return <NoTabNavigation />
  return <TabNavigation />
};

