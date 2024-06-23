import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BadgerNewsStack from './BadgerNewsStack';
import BadgerPreferencesScreen from '../screens//BadgerPreferencesScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function BadgerTabs(props) {

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
      
          if (route.name === 'BadgerNews') {
            iconName = "newspaper-o"
          } else if (route.name === 'Preferences') {
            iconName = "cogs"
          }
      
          return (
            <Icon name={iconName} size={size} color={color}/>
          );
        },
      });

    return (
        <Tab.Navigator screenOptions={screenOptions}>

            <Tab.Screen name="BadgerNews" component={BadgerNewsStack} options={{headerShown: false}}/>
            <Tab.Screen name="Preferences" component={BadgerPreferencesScreen} />

        </Tab.Navigator>
    );
}

export default BadgerTabs;