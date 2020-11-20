import {
  createASTNode,
  findTargetNodeByPath,
  isContainerNode,
  traverseUpdateTree,
} from '../index';
import type { ASTAttrs, ASTContainerNode, ASTNode, ASTType } from '../types';

const cupName = 'testcup';

describe('createASTNode', () => {
  const containerType = 'container' as const;
  const leafType = 'leaf' as const;

  // container
  test.each([
    [
      containerType,
      'testCup',
      {},
      {
        id: expect.any(String),
        type: containerType,
        cupName: 'testCup',
        attrs: {},
        children: [],
      },
    ],
    [
      containerType,
      'testCup2',
      {},
      {
        id: expect.any(String),
        type: containerType,
        cupName: 'testCup2',
        attrs: {},
        children: [],
      },
    ],
    [
      containerType,
      'testCup',
      undefined,
      {
        id: expect.any(String),
        type: containerType,
        cupName: 'testCup',
        attrs: {},
        children: [],
      },
    ],
    [
      containerType,
      'testCup',
      { a: 1, b: 2 },
      {
        id: expect.any(String),
        type: containerType,
        cupName: 'testCup',
        attrs: { a: 1, b: 2 },
        children: [],
      },
    ],
  ])(
    '%s %s %o',
    (type: ASTType, name: string, attrs: ASTAttrs = {}, output: ASTNode) => {
      expect(createASTNode(type, name, attrs)).toMatchObject(output);
    }
  );

  // leaf
  test.each([
    [
      leafType,
      'testCup',
      {},
      {
        id: expect.any(String),
        type: leafType,
        cupName: 'testCup',
        attrs: {},
      },
    ],
    [
      leafType,
      'testCup2',
      {},
      {
        id: expect.any(String),
        type: leafType,
        cupName: 'testCup2',
        attrs: {},
      },
    ],
    [
      leafType,
      'testCup',
      undefined,
      {
        id: expect.any(String),
        type: leafType,
        cupName: 'testCup',
        attrs: {},
      },
    ],
    [
      leafType,
      'testCup',
      { a: 1, b: 2 },
      {
        id: expect.any(String),
        type: leafType,
        cupName: 'testCup',
        attrs: { a: 1, b: 2 },
      },
    ],
  ])(
    '%s %s %o',
    (type: ASTType, name: string, attrs: ASTAttrs = {}, output: ASTNode) => {
      expect(createASTNode(type, name, attrs)).toMatchObject(output);
    }
  );
});

describe('findTargetNodeByPath', () => {
  const testAST: ASTContainerNode = {
    id: '1',
    type: 'container',
    attrs: {},
    cupName,
    children: [
      {
        id: '2',
        type: 'container',
        attrs: {},
        cupName,
        children: [
          {
            id: '4',
            type: 'container',
            attrs: {},
            cupName,
            children: [],
          },
          {
            id: '5',
            type: 'leaf',
            attrs: {},
            cupName,
          },
        ],
      },
      {
        id: '3',
        type: 'leaf',
        attrs: {},
        cupName,
      },
    ],
  };

  test.each([
    ['', '1', '1', 0],
    ['0', '1', '2', 0],
    ['1', '1', '3', 1],
    ['0.0', '2', '4', 0],
    ['0.1', '2', '5', 1],
  ])('%s => %s,%s,%s', (path, findParentId, findTargetId, findTargetIndex) => {
    const findRes = findTargetNodeByPath(testAST, path);
    expect(findRes).not.toBe(false);
    if (findRes === false) {
      throw new Error('Cannot be false');
    }

    expect(findRes.parent.id).toBe(findParentId);
    expect(findRes.target.id).toBe(findTargetId);
    expect(findRes.targetIndex).toBe(findTargetIndex);
  });
});

describe('isContainerNode', () => {
  test('is a container node', () => {
    expect(
      isContainerNode({
        cupName: '',
        type: 'container',
        children: [],
        id: '',
        attrs: {},
      })
    ).toBe(true);
  });

  test('is not a container node', () => {
    expect(
      isContainerNode({
        cupName: '',
        type: 'leaf',
        id: '',
        attrs: {},
      })
    ).toBe(false);
  });
});

describe('traverseUpdateTree', () => {
  const testAST: ASTContainerNode = {
    id: '1',
    type: 'container',
    attrs: {},
    cupName,
    children: [
      {
        id: '2',
        type: 'container',
        attrs: {},
        cupName,
        children: [],
      },
      {
        id: '3',
        type: 'leaf',
        attrs: {},
        cupName,
      },
    ],
  };

  const newTree = traverseUpdateTree(testAST, (node) => ({
    ...node,
    extra: 'extra' + node.id,
  }));

  test('should be not modify origin tree', () => {
    expect(testAST).toMatchObject({
      id: '1',
      type: 'container',
      attrs: {},
      cupName,
      children: [
        {
          id: '2',
          type: 'container',
          attrs: {},
          cupName,
          children: [],
        },
        {
          id: '3',
          type: 'leaf',
          attrs: {},
          cupName,
        },
      ],
    });
  });

  test('should apply updater', () => {
    expect(newTree).toMatchObject({
      id: '1',
      type: 'container',
      attrs: {},
      cupName: 'testcup',
      extra: 'extra1',
      children: [
        {
          id: '2',
          type: 'container',
          attrs: {},
          cupName: 'testcup',
          children: [],
          extra: 'extra2',
        },
        {
          id: '3',
          type: 'leaf',
          attrs: {},
          cupName: 'testcup',
          extra: 'extra3',
        },
      ],
    });
  });
});
