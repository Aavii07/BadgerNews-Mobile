import { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BadgerNewsStack from './BadgerNewsStack';
import BadgerPreferencesScreen from '../screens//BadgerPreferencesScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CS571 from '@cs571/mobile-client'
import { PreferencesContext } from '../contexts/PreferencesContext';

const Tab = createBottomTabNavigator();

function BadgerTabs(props) {

    const { preferences, togglePreference, initializePreferences } = useContext(PreferencesContext);
    const [tags, setTags] = useState([]);
    url = "https://cs571api.cs.wisc.edu/rest/su24/hw8/articles"

    useEffect(() => {
        fetch(url, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId() 
            }
        })
        .then(response => response.json())
        .then(data => {
            // extract tags
            const allTagsWithDuplicates = [];
            data.forEach(article => {
                article.tags.forEach(tag => {
                    allTagsWithDuplicates.push(tag);  
                });
            });
            // filter duplicates
            uniqueTags = [...new Set(allTagsWithDuplicates)]
            initializePreferences(uniqueTags);
            setTags(uniqueTags);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

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
            <Tab.Screen name="Preferences">
                {() => <BadgerPreferencesScreen tags={tags} />}
            </Tab.Screen>

        </Tab.Navigator>
    );
}

export default BadgerTabs;