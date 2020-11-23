# Saucer

*WIP: its a project which is work in progress*

A Layout Editor for Drag and Drop

## What is Saucer

`Saucer` is a layout editor framework which can help you build your own layout editor. You can design your `DSL`, and let `Saucer` help you to finish other trivial work.

## Quick Start

```jsx
import React from 'react';
import ReactDom from 'react-dom';
import { regCup } from '@saucer/core';

regCup({
  name: 'Button',
  displayName: 'Button Component',
  desc: 'This is a Button',
  type: 'leaf',
  render: () => {
    return <button>Click it!</button>;
  },
});

ReactDom.render(
  <div style={{ height: '100vh' }}>
    <SaucerEditor />
  </div>,
  document.querySelector('#app')
);
```

## Proper Nouns

- `Saucer`: this framework
- `Cup`: `Saucer` have many cup, you can treat it as template.
- `Tea`: the instance of a `Cup`, every tea have its own attributes.
