import styled from '@emotion/native';
import React, { useState, useEffect, ReactNode } from 'react';
import { ToggleButton } from './ToggleButton';

type Props = {
    options: string[];
    icon?: ReactNode;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    clicked?: boolean;
    height?: number;
    width?: number;
    borderRadius?: string;
    onChange?: (option: string) => void;
    defaultIndex?: number;
};

export const OptionButton: React.FC<Props> = ({ onChange, children, options, icon, borderColor, clicked, height, width, color, backgroundColor, borderRadius, defaultIndex }) => {

    if(defaultIndex === (null || undefined)) return <></>
    const [activeoption, setActiveoption] = useState(options[defaultIndex]);

    return (
        <OptionButtonContainer>
            {options.map((option, index) => (
                <ToggleButton
                    key={index}
                    backgroundColor={activeoption === option ? {backgroundColor} : 'rgba(255, 255, 255, 0)'}
                    borderWidth={1.5}
                    borderColor={activeoption === option ? {borderColor} :  '#B7B7BB'}
                    height={height}
                    width={width}
                    icon={icon}
                    onPress={()=>{
                        setActiveoption(option);
                        onChange(index);
                    }}
                    borderRadius={borderRadius}>
                    <ButtonText
                        color={activeoption === option ? {color} :  '#B7B7BB'}
                        fontSize={11}
                    >
                        {options[index]}
                    </ButtonText>
                </ToggleButton>
            ))}
        </OptionButtonContainer>
    );
};

const OptionButtonContainer = styled.View`
  justify-content: center;
  flex-direction: row;
`;

const ButtonText = styled.Text`
  color: ${({ color }) => color};
  font-size: 11px;
  text-align: center;
`;