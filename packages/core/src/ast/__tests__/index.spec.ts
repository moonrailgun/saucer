import { createASTNode, findTargetNodeByPath, isContainerNode } from '../index';
import type { ASTAttrs, ASTContainerNode, ASTNode, ASTType } from '../types';

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
        childrens: [],
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
        childrens: [],
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
        childrens: [],
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
        childrens: [],
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
  const cupName = 'testcup';
  const testAST: ASTContainerNode = {
    id: '1',
    type: 'container',
    attrs: {},
    cupName,
    childrens: [
      {
        id: '2',
        type: 'container',
        attrs: {},
        cupName,
        childrens: [
          {
            id: '4',
            type: 'container',
            attrs: {},
            cupName,
            childrens: [],
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
        childrens: [],
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
