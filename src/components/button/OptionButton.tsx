import styled from '@emotion/native';
import React, { useState, useEffect, ReactNode } from 'react';
import { ToggleButton } from './ToggleButton';

type Props = {
    options: string[];
    icon?: ReactNode;
    color?: string;
    backgroundColor?: string;
    clicked?: boolean;
    height?: number;
    width?: number;
    borderRadius?: string;
    onChange?: (option: string) => void;
    defaultIndex?: number;
};

export const OptionButton: React.FC<Props> = ({ onChange, children, options, icon, clicked, height, width, borderRadius, defaultIndex }) => {

    const [activeoption, setActiveoption] = useState(options[defaultIndex]);

    return (
        <OptionButtonContainer>
            {options.map((option, index) => (
                <ToggleButton
                    key={index}
                    backgroundColor={activeoption === option ? '#FFFFFF' :  'rgba(255, 255, 255, 0)'}
                    borderWidth={1.5}
                    borderColor={activeoption === option ? '#000000' :  '#B7B7BB'}
                    color="white"
                    height={height}
                    width={width}
                    icon={icon}
                    onPress={()=>{
                        setActiveoption(option);
                        onChange(index);
                    }}
                    borderRadius={borderRadius}>
                    <ButtonText
                        color={activeoption === option ? '#000000' :  '#B7B7BB'}
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
`;