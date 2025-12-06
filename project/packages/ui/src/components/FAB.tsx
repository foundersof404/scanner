import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

export function FAB({ className, ...props }: TouchableOpacityProps) {
    return (
        <StyledTouchableOpacity
            className={`absolute bottom-6 self-center w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg active:scale-95 transition-transform ${className}`}
            {...props}
        >
            <StyledText className="text-white text-3xl font-bold">+</StyledText>
        </StyledTouchableOpacity>
    );
}
