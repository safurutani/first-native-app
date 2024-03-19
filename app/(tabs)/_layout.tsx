import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import TabOneScreen from '.';
import TabTwoScreen from './two';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = 'plus-square';
          } else if (route.name === 'two') {
            iconName = 'archive';
          }

          return <FontAwesome name='archive' size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.light.tint,
      })}>
      <Tab.Screen name="index" component={TabOneScreen} options={{ title: 'New WordSmith' }} />
      <Tab.Screen name="two" component={TabTwoScreen} options={{ title: 'Archived Games' }} />
    </Tab.Navigator>
  );
}
