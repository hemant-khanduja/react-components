import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Wrapper } from '../../components/globals';
import { Header } from '../../../src';

function Demo(args: any) {
  console.log(args);
  return (
    <Wrapper>
      <Header>hello from header</Header>
    </Wrapper>
  );
}

storiesOf('Header', module).add('Basic', () => <Demo onSelectAll={action('onSelectAll')} />);
