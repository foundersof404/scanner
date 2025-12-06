import { View, ViewProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

export function Card({ children, className, ...props }: ViewProps) {
    return (
        <StyledView
            className={`bg-card rounded-md shadow-subtle p-4 ${className}`}
            {...props}
        >
            {children}
        </StyledView>
    );
}
