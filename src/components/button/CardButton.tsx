import styled from '@emotion/native';
import React, { useState, useEffect, ReactNode } from 'react';
import { ToggleButton } from './ToggleButton';
import { Platform } from 'react-native';

type Props = {
    options: string[];
    icon?: ReactNode[];
    color?: string;
    backgroundColor?: string;
    clicked?: boolean;
    onChange?: (option: string) => void;
};

export const CardButton: React.FC<Props> = ({ onChange, children, options, icon, clicked, height, width }) => {

    const [activeoption, setActiveoption] = useState(options[0]);

    return (
        <OptionButtonContainer>
            {options.map((option, index) => (
                <ToggleButton
                    key = {index}
                    elevation = {Platform.OS === 'android' && '6'}
                    backgroundColor={activeoption === option ? '#FFFFFF' :  'rgba(250, 250, 250, 1)'}
                    boxShadow = {'0 3px 6px rgba(0, 0, 0, 0.16)'}
                    borderWidth={1.5}
                    borderColor={activeoption === option ? '#707070' :  'rgba(250, 250, 250, 1)'}
                    icon={icon[index]}
                    height={101}
                    width={103}
                    onPress={() => {
                        setActiveoption(option);
                        onChange(index);
                    }}
                    borderRadius={"8px"}>
                    <ButtonText>{options[index]}</ButtonText>
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
  color: #000000;
  font-size: 11px;
`;