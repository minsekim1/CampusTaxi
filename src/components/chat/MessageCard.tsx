import styled from '@emotion/native';
import React, { useState } from 'react';
import { MessageCardBackground } from './MessageCardBackground';

type Props = {
  isWriter?: boolean;
};
export const MessageCard: React.FC<Props> = ({ children, isWriter }) => {
  const [length, setLength] = useState(1);
  return (
    <Container isRight={isWriter}>
      <MessageContainer>
        <MessageCardBackground isRight={isWriter} length={length} />
        <MessageText
          isRight={isWriter}
          onTextLayout={(event) => {
            setLength(event.nativeEvent.lines.length);
          }}>
          {children}
        </MessageText>
      </MessageContainer>
    </Container>
  );
};
const Container = styled.View<{ isRight?: boolean }>`
  display: flex;
  margin-top: 24px;
  align-items: ${({ isRight }) => (isRight ? 'flex-end' : 'flex-start')};
`;

const MessageContainer = styled.View`
  display: flex;
  min-height: 36px;
  justify-content: center;
  align-items: center;
`;
const MessageText = styled.Text<{ isRight?: boolean }>`
  width: ${({ isRight }) => (isRight ? '210px' : '180px')};
  position: absolute;
  justify-content: center;
  align-self: center;
  text-align: left;
  line-height: 18px;
`;
