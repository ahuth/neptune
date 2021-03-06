# Neptune

Minimal [React](https://github.com/facebook/react) testing framework.

## Installation

Install Neptune in your project with

```
npm install --save-dev @ahuth/neptune
```

Also install [react-test-renderer](https://reactjs.org/docs/test-renderer.html). It must match the version of React you're using. So if you're using React v16.9.0, install with

```
npm install --save-dev react-test-renderer@16.9.0
```

## Usage

Import the Neptune functions and render your component. Then use the provided functions to query the result. For example:

```jsx
import MyButton from './MyButton'; // <- Import the component to test
import { render } from '@ahuth/neptune'; // <- Import Neptune

test('it renders a button and executes clicks', () => {
  // Arrange
  const clickHandler = jest.fn();
  const example = render(<MyButton onClick={clickHandler} />);

  // Assert
  expect(example.findAllByType('button')).toHaveLength(1);

  // Act
  example.findByType('button').runCallback('onClick');

  // Assert
  expect(clickHandler).toHaveBeenCalled();
});
```

## Queries and Functions

Available functions on Neptune instances are

- `findByType`

   Find and return a single instance with the given React type. Throws an error if there isn't exactly one result.

   ```js
   const foo = example.findByType(FooComponent);
   ```

- `findAllByType`

   Get an array of all instances matching the given React type.

   ```js
   const links = example.findAllByType('a');
   ```

- `prop`

   Get the specified prop from the instance.

   ```js
   expect(example.prop('disabled')).toEqual(true);
   ```

- `runCallback`

   Finds a prop and executes it if it's a function. Passes additional arguments to the function.

   ```js
   example.runCallback('onClick', 'hello!');

   // Equivalent to
   TestRenderer.act(() => {
     example.prop('onClick')('hello!');
   });
   ```
