import React from 'react';
import { withRoutePage } from '@/utils/enhanceUtils';

export default withRoutePage(({ match }) => {
  const { params } = match;
  return (
    <>
      <h1>name: {params.name || '-'}</h1>
      <h1>gender: {params.gender || '-'}</h1>
    </>
  );
});
