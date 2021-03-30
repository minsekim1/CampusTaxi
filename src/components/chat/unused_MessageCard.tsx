import styled from '@emotion/native';
import React, { useState } from 'react';

type Props = {
  isWriter?: boolean;
};
export const MessageCard: React.FC<Props> = ({ children, isWriter }) => {
  return (
    <Container isRight={isWriter}>
      <MessageContainer>
        <MessageText>
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
  width: 100%;
`;

const MessageText = styled.Text``
// const MessageText = styled.Text<{ isRight?: boolean }>`
  
// `;

// width: ${({ isRight }) => (isRight ? '210px' : '180px')};