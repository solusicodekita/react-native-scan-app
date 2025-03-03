import React from 'react';
import Word from '@components/placeholder/Word';
import Container from '@components/placeholder/Container';
import Paragraph from '@components/placeholder/Paragraph';
import {Spacing} from '@constants/theme';

const Placeholder = () => {
  return (
    <Container style={{gap: Spacing._4}}>
      <Word />
      <Paragraph wordCount={2} />
      <Word />
    </Container>
  );
};

export default Placeholder;
