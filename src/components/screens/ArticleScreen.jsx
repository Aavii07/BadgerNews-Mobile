import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView , TouchableOpacity, Linking, Animated} from 'react-native';
import CS571 from '@cs571/mobile-client'

function ArticleScreen({ route }) {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const fadeInAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (route.params && route.params.articleId && route.params.title && route.params.img) {
            const { articleId, title, img } = route.params;
            setTitle(title);
            setImage(img);
            fetchArticle(articleId);
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            Animated.timing(fadeInAnim, {
                toValue: 1,
                duration: 1000, 
                useNativeDriver: true, 
            }).start();
        }
    }, [loading]);

    const fetchArticle = (articleId, title, img) => {
        const url = `https://cs571api.cs.wisc.edu/rest/su24/hw8/article?id=${articleId}`;
        
            fetch(url, {
                headers: {
                    "X-CS571-ID": CS571.getBadgerId() 
                }
            })
            .then(response => response.json())
            .then(data => {
                setArticle(data);
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching article:', error);
                setLoading(false); 
            });
      };

      const openUrl = () => {
        if (article && article.url) {
          Linking.openURL(article.url);
        }
      };

      return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading ? ( 
                <View style={styles.articleContainer}> 
                    <Image 
                        source={{ uri: `https://raw.githubusercontent.com/CS571-SU24/hw8-api-static-content/main/${image}` }} 
                        style={styles.image}/>
                    <Text style={styles.title}>{title}</Text>

                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="blue" />
                        <Text style={{marginTop: 10}}>Loading article content...</Text>
                    </View>
                </View>
        ) : (
            <View style={styles.articleContainer}>
                <Image 
                    source={{ uri: `https://raw.githubusercontent.com/CS571-SU24/hw8-api-static-content/main/${image}` }} 
                    style={styles.image}/>
                <Text style={styles.title}>{title}</Text>
                <Animated.View style={[styles.articleContainer, { opacity: fadeInAnim }]}>
                    <TouchableOpacity onPress={openUrl}>
                        <Text style={styles.url}>
                            See full article here
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.authorDate}> {`By ${article.author} | ${article.posted}`} </Text>
                    {article.body.map((paragraph, index) => (
                        <Text 
                            style={styles.bodyText}
                            key={index}>
                                {paragraph}
                        </Text>
                    ))}
                </Animated.View>
            </View>
        )}
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    articleContainer: {
        width: '100%',
    },
    image: {
        width: '100%',
        height: 200,
        arginBottom: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        arginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    authorDate: {
        fontSize: 20,
        color: 'gray',
        marginBottom: 10,
    },
    bodyText: {
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 10,
    },
    url: {
        fontsize: 12,
        color: 'blue',
        textDecorationLine: 'underline',
        marginBottom: 20,
        marginTop: 10
    },
  });

export default ArticleScreen;