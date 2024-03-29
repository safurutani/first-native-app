import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import TabOneScreen from '.';
import TabTwoScreen from './two';
import { ArchivedHeader } from '@/components/ArchivedHeader';
import { loadState } from '../storage';
import store from '../store';

const Tab = createBottomTabNavigator();


export default function TabLayout() {
  
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = "archive";

        if (route.name === 'index') {
          iconName = 'plus-square';
        }

        return <FontAwesome name={iconName as any} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.light.tint,
      headerTitleAlign: 'center',
      headerTitleStyle:{fontFamily: 'OxygenMono'}
    })}>
      <Tab.Screen name="index" component={TabOneScreen} options={{ title: 'New WordSmith'}} />
      <Tab.Screen name="two" component={TabTwoScreen} options={{ title: 'Archived Games' , headerTitle: () => <ArchivedHeader /> }} />
    </Tab.Navigator>
  );
}
