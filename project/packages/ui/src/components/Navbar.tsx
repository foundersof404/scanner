import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export function Navbar() {
    return (
        <StyledView className="w-full h-16 bg-white/80 backdrop-blur-md shadow-sm flex-row items-center justify-between px-8 sticky top-0 z-50">
            <StyledText className="text-primary text-xl font-bold">PriceScanner</StyledText>
            <StyledView className="flex-row gap-6">
                <StyledTouchableOpacity><StyledText className="text-textDark hover:text-primary">Home</StyledText></StyledTouchableOpacity>
                <StyledTouchableOpacity><StyledText className="text-textDark hover:text-primary">Scan</StyledText></StyledTouchableOpacity>
                <StyledTouchableOpacity><StyledText className="text-textDark hover:text-primary">History</StyledText></StyledTouchableOpacity>
            </StyledView>
            <StyledTouchableOpacity className="bg-primary px-4 py-2 rounded-md">
                <StyledText className="text-white font-bold">Login</StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );
}
