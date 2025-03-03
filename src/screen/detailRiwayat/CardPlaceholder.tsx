import React from 'react';
import {Spacing} from '@constants/theme';
import Paragraph from '@components/placeholder/Paragraph';
import Word from '@components/placeholder/Word';
import Container from '@components/placeholder/Container';

const CardPlaceholder = () => {
  return (
    <Container>
      <Word style={{marginBottom: Spacing._4}} />
      <Paragraph />

      <Word style={{marginTop: Spacing._8, marginBottom: Spacing._4}} />
      <Paragraph />

      <Word style={{marginTop: Spacing._8, marginBottom: Spacing._4}} />
      <Paragraph />
    </Container>
  );
};

export default CardPlaceholder;
