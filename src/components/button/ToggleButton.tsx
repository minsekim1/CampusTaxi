import styled from '@emotion/native';
import React, { ReactNode } from 'react';

type Props = {
    onPress: () => void;
    icon?: ReactNode;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    paddingBottom?: number;
    height?: number;
    width?: number;
    borderWidth?: borderWidth;
    boxShadow?: boxShadow;
    elevation?: elevation;
};

export const ToggleButton: React.FC<Props> = ({
    children,
    onPress,
    icon,
    color,
    backgroundColor,
    borderColor,
    borderRadius,
    paddingBottom,
    height,
    width,
    borderWidth,
    boxShadow,
    elevation,
    }) => {
    return (
        <Box
            onPress={onPress}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            borderRadius={borderRadius}
            paddingBottom={paddingBottom}
            height={height}
            width={width}
            borderWidth={borderWidth}
            boxShadow={boxShadow}
            elevation={elevation}>
            <Container>
                {icon && <IconConatiner>{icon}</IconConatiner>}
                <ChildrenText color={color}>{children}</ChildrenText>
            </Container>
        </Box>
    );
};

type BoxProps = {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    paddingBottom?: number;
    height?: number;
    width?: number;
    borderWidth?: number;
    boxShadow?: boxShadow;
    elevation?: elevation;
};

const Box = styled.TouchableOpacity<BoxProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-color: ${({ borderColor }) => borderColor};
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius ?? `25px`};
  justify-content: center;
  padding-bottom: ${({ paddingBottom }) => paddingBottom && `${paddingBottom}px`};
  height: ${({ height }) => height && `${height}px`};
  width: ${({ width }) => width && `${width}px`};
  borderWidth: ${({ borderWidth }) => borderWidth && `${borderWidth}px`};
  margin-left: 7px;
  margin-right: 7px;
  box-shadow:  ${({ boxShadow }) => boxShadow};
  elevation:  ${({ elevation }) => elevation && `${elevation}`};
  
`;

const Container = styled.View`
  align-items: center;
  // padding-left: 64px;
  // padding-right: 64px;
  // padding-top: 16px;
  // padding-bottom: 16px;
`;

const IconConatiner = styled.View`
  margin-bottom: 10px;
`;

const ChildrenText = styled.Text<{ color?: string }>`
  font-size: 18px;
  color: ${({ color }) => color};
`;
