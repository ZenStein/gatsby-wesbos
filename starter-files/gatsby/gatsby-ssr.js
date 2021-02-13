import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  console.log('wrap called');
  return <Layout {...props}>{element}</Layout>;
}
