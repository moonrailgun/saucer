# Saucer

A Layout Editor for Drag and Drop

## What is Saucer

`Saucer` is a layout editor framework which can help you build your own layout editor. You can design your `DSL`, and let `Saucer` help you to finish other trivial work.

## Why to use Saucer

We know, this world has been lots of layout editor, but those project is work for zero code develop, but `saucer` is make for meta develop, its means `saucer` have mini-size and easy to expand, and the output of `saucer` is more necessary.

## Quick Start

```jsx
import React from 'react';
import ReactDom from 'react-dom';
import { regCup } from '@saucerjs/core';

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

## For Develop

#### First of all, Link dependency

```bash
yarn run bootstrap
```

#### Build it

```bash
yarn run build
```

#### Then, check for demo

```bash
yarn run start
```

## Proper Nouns

- `Saucer`: This framework
- `Cup`: `Saucer` have many cup, you can treat it as template.
- `Tea`: The instance of a `Cup`, every tea have its own attributes.
