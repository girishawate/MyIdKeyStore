import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

interface RegistrationProps {
    onRegistration: (username: string, password: string) => Promise<void>;
    // ... other necessary props
}

const Registration: React.FC<RegistrationProps> = ({ onRegistration }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async () => {
        // Perform any validation if needed

        // Call the onRegistration prop with the provided credentials
        await onRegistration(username, password);
    };

    return (
        <View>
            <Text>Registration Screen</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegistration} />
        </View>
    );
};

export default Registration;