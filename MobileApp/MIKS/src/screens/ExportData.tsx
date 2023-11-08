import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';

const ExportData = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Export Data {"\n"}</Text>
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

export default ExportData;
