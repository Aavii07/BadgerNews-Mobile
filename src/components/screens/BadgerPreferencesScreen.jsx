import { useContext } from 'react';
import { Text, View, Switch, StyleSheet } from "react-native";
import { PreferencesContext } from '../contexts/PreferencesContext';

function BadgerPreferencesScreen({ tags }) {
    const { preferences, togglePreference } = useContext(PreferencesContext);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Toggle to Set Article Interests</Text>
            {tags.map(tag => (
                <View key={tag} style={styles.tagContainer}>
                    <View style={styles.verticalView}>
                        <Text style={styles.tagText}>{tag}</Text>
                        <Text style={styles.infoText}>
                            {preferences[tag] ? `Currently showing ${tag} aricles` : `Currently NOT showing ${tag} aricles` }
                        </Text>
                    </View>
                <Switch
                    style={styles.switch}
                    value={preferences[tag] || false}
                    onValueChange={() => togglePreference(tag)}
                />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ebf9fa',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tagText: {
        fontSize: 30,
        padding: 20,
        color: '#555',
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
        marginRight: 20,
    },
    infoText: {
        marginTop: 5,
        fontSize: 14,
        color: '#888',
        marginLeft: 20,
    },
    verticalView: {
        flexDirection: 'column',
    },
});

export default BadgerPreferencesScreen;