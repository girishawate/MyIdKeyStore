import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registration from './screens/Registration'; // Adjust the paths
import KeyValueMaster from './screens/KeyValueMaster'; // Adjust the paths
import KeyValueSearch from './screens/KeyValueSearch'; // Adjust the paths
import ExportData from './screens/ExportData'; // Adjust the paths

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="KeyValueMaster" component={KeyValueMaster} />
        <Stack.Screen name="KeyValueSearch" component={KeyValueSearch} />
        <Stack.Screen name="ExportData" component={ExportData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
