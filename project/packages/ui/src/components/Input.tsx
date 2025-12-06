import { TextInput, TextInputProps, View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledTextInput = styled(TextInput);
const StyledView = styled(View);
const StyledText = styled(Text);

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
    return (
        <StyledView className="w-full mb-4">
            {label && <StyledText className="text-textDark mb-1 font-medium">{label}</StyledText>}
            <StyledTextInput
                className={`w-full h-12 px-4 bg-white border rounded-md text-textDark ${error ? 'border-error' : 'border-gray-200 focus:border-primary'
                    } ${className}`}
                placeholderTextColor="#6B7A90"
                {...props}
            />
            {error && <StyledText className="text-error text-sm mt-1">{error}</StyledText>}
        </StyledView>
    );
}
