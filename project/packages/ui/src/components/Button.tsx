import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({ title, variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
    const baseStyle = "items-center justify-center rounded-md active:scale-95 transition-transform";
    const variants = {
        primary: "bg-primary",
        secondary: "bg-primaryAccent",
        outline: "border border-primary bg-transparent",
    };
    const sizes = {
        sm: "h-8 px-3",
        md: "h-12 px-4",
        lg: "h-14 px-6",
    };
    const textStyles = {
        primary: "text-white font-bold",
        secondary: "text-white font-bold",
        outline: "text-primary font-bold",
    };

    return (
        <StyledTouchableOpacity
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            <StyledText className={textStyles[variant]}>{title}</StyledText>
        </StyledTouchableOpacity>
    );
}
