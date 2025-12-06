import { View, Text, Image } from 'react-native';
import { Button } from '@repo/ui';
import { useNavigation } from '@react-navigation/native';

export function WelcomeScreen() {
    const navigation = useNavigation<any>();

    return (
        <View className="flex-1 bg-white items-center justify-center px-6">
            <View className="items-center mb-12">
                <View className="w-24 h-24 bg-primary rounded-2xl mb-6 items-center justify-center">
                    <Text className="text-white text-4xl font-bold">P</Text>
                </View>
                <Text className="text-3xl font-bold text-textDark text-center mb-2">PriceScanner</Text>
                <Text className="text-textMuted text-center text-lg">Find the best prices nearby with AI</Text>
            </View>

            <View className="w-full gap-4">
                <Button title="Login" onPress={() => navigation.navigate('Login')} />
                <Button title="Create Account" variant="outline" onPress={() => navigation.navigate('Signup')} />
            </View>
        </View>
    );
}
