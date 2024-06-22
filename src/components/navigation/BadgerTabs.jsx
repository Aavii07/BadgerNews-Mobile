
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import BadgerPreferencesScreen from '../screens//BadgerPreferencesScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; // this library doesn't cause weird errors

const Tab = createBottomTabNavigator();

function BadgerTabs(props) {

    const screenOptions = ({ route }) => ({

        tabBarIcon: ({ color, size }) => {
          let iconName;
      
          if (route.name === 'News') {
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

            <Tab.Screen name="News" component={BadgerNewsScreen} />
            <Tab.Screen name="Preferences" component={BadgerPreferencesScreen} />

        </Tab.Navigator>
    );
}

export default BadgerTabs;