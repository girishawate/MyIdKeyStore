import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Registration from './screens/Registration';
import Login from './screens/Login';
import Home from './screens/Home';
import KeyValueMaster from './screens/KeyValueMaster';
import KeyValueSearch from './screens/KeyValueSearch';
import ExportImportData from './screens/ExportImportData';

import { initializeDatabase, registerUser, loginUser } from './db/dbSQL';

const Stack = createNativeStackNavigator();

function App() {

  const [isRegistered, setIsRegistered] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // Check if the Users table exists when the app starts
    initializeDatabase();
  }, []);

  const handleRegistration = async (username: string, password: string) => {
    const success = await registerUser(1, username, password);
    setIsRegistered(success);
  };

  const handleLogin = async (username: string, password: string) => {
    const success = await loginUser(username, password);
    setIsRegistered(success);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isRegistered ? 'Login' : 'Registration'}>
        <Stack.Screen name="Registration">
          {(props) => <Registration {...props} onRegistration={handleRegistration} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => <Login {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="KeyValueMaster" component={KeyValueMaster} />
        <Stack.Screen name="KeyValueSearch" component={KeyValueSearch} />
        <Stack.Screen name="ExportImportData" component={ExportImportData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
