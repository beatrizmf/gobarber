import React from 'react';

import { View, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
