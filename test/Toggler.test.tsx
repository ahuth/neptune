import React from 'react';
import { render } from '../src/neptune';
import Toggler from './Toggler';

function getExample(overrides = {}) {
  return render(<Toggler {...overrides} />);
}

test('rendering a button', () => {
  const example = getExample();
  expect(example.findAllByType('button')).toHaveLength(1);
});

test('toggling with default labels', () => {
  const example = getExample();
  const button = example.findByType('button');
  expect(button.prop('children')).toEqual('off');
  button.runCallback('onClick');
  expect(button.prop('children')).toEqual('on');
});

test('toggling with custom labels', () => {
  const example = getExample({ onLabel: 'yes', offLabel: 'no' });
  const button = example.findByType('button');
  expect(button.prop('children')).toEqual('no');
  button.runCallback('onClick');
  expect(button.prop('children')).toEqual('yes');
});
