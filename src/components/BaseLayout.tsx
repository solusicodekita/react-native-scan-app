import React, {ReactNode} from 'react';
import BACKGROUND_IMAGE from './BaseBackground';

const BaseLayout = ({children}: {children: ReactNode}) => (
  <>
    {BACKGROUND_IMAGE}
    {children}
  </>
);

export default BaseLayout;
