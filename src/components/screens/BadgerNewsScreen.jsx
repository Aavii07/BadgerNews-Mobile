import { Text, View, ScrollView, ActivityIndicator } from "react-native";
// can use activity indicator instead of loading text (gives a spinning circle)
import { useState, useEffect } from "react";
import { Card, Title } from 'react-native-paper';
import CS571 from '@cs571/mobile-client'

function BadgerNewsScreen(props) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true); // used to toggle the activity indicator

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
    },[]);

    return (
        <ScrollView>
            {loading ? (
                <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
            ) : (
                articles.map((article) => (
                    <Card key={article.fullArticleId} style={{ margin: 10 }}>
                        <Card.Cover source={{ uri: "https://raw.githubusercontent.com/CS571-SU24/hw8-api-static-content/main/" + article.img }}/>
                        <Card.Content style={{ padding: 10 }}>
                            <Title>{article.title}</Title>
                        </Card.Content>
                    </Card>
                ))
            )}
        </ScrollView>
    );

    /**return <View>
        <Text style={{paddingTop: 128}}>When I get to Step 3, I will need to be inside a nested stack navigator!</Text>
    </View>  */
}

export default BadgerNewsScreen;