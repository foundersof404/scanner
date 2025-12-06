import { View, Text, ViewProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface AuthLayoutProps extends ViewProps {
    title: string;
    subtitle?: string;
}

export function AuthLayout({ title, subtitle, children, className, ...props }: AuthLayoutProps) {
    return (
        <StyledView className={`flex-1 items-center justify-center bg-white px-6 ${className}`} {...props}>
            <StyledView className="w-full max-w-sm">
                <StyledText className="text-3xl font-bold text-textDark mb-2 text-center">{title}</StyledText>
                {subtitle && (
                    <StyledText className="text-textMuted text-center mb-8">{subtitle}</StyledText>
                )}
                {children}
            </StyledView>
        </StyledView>
    );
}
