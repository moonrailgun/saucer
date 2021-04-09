# `@saucerjs/xml`

## Install

```
npm install @saucerjs/xml
```

OR

```
yarn add @saucerjs/xml
```

## Usage

```javascript
import { serializeToXML } from '@saucerjs/xml';

const xml = serializeToXML(ast);
```

## Special Attrs

`@saucerjs/xml` will ignore attrs which start with '_'

And have some special logic for those attrs.

- `_childrenText`: This attrs will serialize to xml children text. Its useful for a saucer `leaf` node to render children text
