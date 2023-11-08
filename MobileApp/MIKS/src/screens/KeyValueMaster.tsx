import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

const KeyValueMaster = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Key Value Master {"\n"}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    }
});

export default KeyValueMaster;
