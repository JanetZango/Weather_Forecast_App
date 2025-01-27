const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import CurrentWeather from "./screens/CurrentWeather";
import SearchSave from "./screens/SearchSave";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);


  
  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="SearchSave"
              component={SearchSave}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CurrentWeather"
              component={CurrentWeather}
              options={{ headerShown: false }}
            />





          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
