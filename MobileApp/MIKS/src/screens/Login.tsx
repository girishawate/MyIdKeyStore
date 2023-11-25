import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

interface LoginProps {
    onLogin: (username: string, password: string) => Promise<void>;
    // ... other necessary props
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Perform any validation if needed

        // Call the onLogin prop with the provided credentials
        await onLogin(username, password);
    };

    return (
        <View>
            <Text>Login Screen</Text>
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
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default Login;
