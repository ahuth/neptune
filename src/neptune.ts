import React from 'react';
import TestRenderer from 'react-test-renderer';

export function render(element: React.ReactElement, options?: TestRenderer.TestRendererOptions) {
  const testRenderer = TestRenderer.create(element, options);
  const root = testRenderer.root;
  return create(root);
}

function create(instance: TestRenderer.ReactTestInstance) {
  return Object.freeze({
    findByType(type: React.ElementType) {
      return create(instance.findByType(type));
    },

    findAllByType(type: React.ElementType) {
      return instance.findAllByType(type).map(create);
    },

    prop(name: string): unknown {
      return instance.props[name];
    },

    runCallback(propName: string, ...args: Array<unknown>): void {
      TestRenderer.act(() => {
        const callback = instance.props[propName];
        return typeof callback === 'function' && callback(...args);
      });
    },
  });
}

function capitalize(string: string): string {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}
