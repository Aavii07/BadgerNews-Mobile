import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import ArticleScreen from '../screens/ArticleScreen';

const Stack = createStackNavigator();

function BadgerNewsStack() {

    return (
        <Stack.Navigator initialRouteName="News">
            <Stack.Screen name="News" component={BadgerNewsScreen} />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    );
}

export default BadgerNewsStack;
  