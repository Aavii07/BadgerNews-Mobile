import { ScrollView, ActivityIndicator, TouchableOpacity, Text } from "react-native";
// can use activity indicator instead of loading text (gives a spinning circle)
import { useState, useEffect, useContext } from "react";
import { Card, Title } from 'react-native-paper';
import CS571 from '@cs571/mobile-client'
import { useNavigation } from '@react-navigation/native';
import { PreferencesContext } from '../contexts/PreferencesContext';

function BadgerNewsScreen(props) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true); // used to toggle the activity indicator
    const { preferences } = useContext(PreferencesContext);

    url = "https://cs571api.cs.wisc.edu/rest/su24/hw8/articles"

    useEffect(() =>{
        fetch(url, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId() 
            }
        })
        .then(response => response.json())
        .then(data => {
            setArticles(data);
            setLoading(false);
        })
        .catch(error => console.error('Error fetching data:', error));
        setLoading(false);
    },[]);

    const navigation = useNavigation();

    const handleCardPress = (articleId, title, img) => {
        navigation.navigate('Article', { articleId, title, img });
    };

    const filteredArticles = articles.filter(article => 
        article.tags.some(tag => preferences[tag])
      );

    return (
        <ScrollView>
            {loading ? (
                <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
            ) : (
                filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <TouchableOpacity key={article.id} onPress={() => handleCardPress(article.fullArticleId, article.title, article.img)}>
                            <Card style={{ margin: 10 }}>
                                <Card.Cover source={{ uri: "https://raw.githubusercontent.com/CS571-SU24/hw8-api-static-content/main/" + article.img }}/>
                                <Card.Content style={{ padding: 10 }}>
                                    <Title>{article.title}</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{ 
                        marginTop: 40,
                        textAlign: 'center',
                        fontSize: 20 }}> 
                        No available articles, {"\n"} please adjust preferences.
                    </Text>
                )
            )}
        </ScrollView>
    );
}

export default BadgerNewsScreen;