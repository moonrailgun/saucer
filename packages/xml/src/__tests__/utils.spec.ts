import type { ASTNode } from '@saucerjs/core';
import { serializeToXML, transformToXMLAST } from '../utils';
import type { Element as XMLElement } from 'xml-js';

describe.each([
  [
    'Blank AST',
    {
      id: 'root',
      type: 'container' as const,
      cupName: 'root',
      attrs: {},
      children: [],
    },
    {
      type: 'element',
      name: 'root',
      attributes: {},
      elements: [],
    },
    '',
  ],

  [
    'Simple AST',
    {
      id: 'root',
      type: 'container' as const,
      cupName: 'root',
      attrs: {},
      children: [
        {
          id: 'ufBrwa1b3',
          type: 'leaf' as const,
          cupName: 'Input',
          attrs: {},
        },
      ],
    },
    {
      type: 'element',
      name: 'root',
      attributes: {},
      elements: [
        {
          type: 'element',
          name: 'Input',
          attributes: {},
          elements: [],
        },
      ],
    },
    '<Input/>',
  ],

  [
    'Attributes',
    {
      id: 'root',
      type: 'container' as const,
      cupName: 'root',
      attrs: {},
      children: [
        {
          id: 'ufBrwa1b3',
          type: 'leaf' as const,
          cupName: 'Input',
          attrs: {
            string: 'text',
            number: 1,
          },
        },
      ],
    },
    {
      type: 'element',
      name: 'root',
      attributes: {},
      elements: [
        {
          type: 'element',
          name: 'Input',
          attributes: { string: 'text', number: 1 },
          elements: [],
        },
      ],
    },
    '<Input string="text" number="1"/>',
  ],

  [
    'More Element',
    {
      id: 'root',
      type: 'container' as const,
      cupName: 'root',
      attrs: {},
      children: [
        {
          id: 'oQUGhOqD7',
          type: 'leaf' as const,
          cupName: 'Button',
          attrs: {},
        },
        {
          id: 'eSfhJCr9o',
          type: 'leaf' as const,
          cupName: 'Input',
          attrs: {},
        },
        {
          id: '821w-Aagp',
          type: 'leaf' as const,
          cupName: 'Input',
          attrs: {},
        },
      ],
    },
    {
      type: 'element',
      name: 'root',
      attributes: {},
      elements: [
        { type: 'element', name: 'Button', attributes: {}, elements: [] },
        { type: 'element', name: 'Input', attributes: {}, elements: [] },
        { type: 'element', name: 'Input', attributes: {}, elements: [] },
      ],
    },
    '<Button/><Input/><Input/>',
  ],

  [
    'Nested Element',
    {
      id: 'root',
      type: 'container' as const,
      cupName: 'root',
      attrs: {},
      children: [
        {
          id: 'sWrkBlhT-',
          type: 'container' as const,
          cupName: 'Container',
          attrs: {},
          children: [
            {
              id: 'Zj-mzqGE5',
              type: 'leaf' as const,
              cupName: 'Input',
              attrs: {},
            },
            {
              id: 'Au2edISnx',
              type: 'leaf' as const,
              cupName: 'Input',
              attrs: {},
            },
          ],
        },
      ],
    },
    {
      type: 'element',
      name: 'root',
      attributes: {},
      elements: [
        {
          type: 'element',
          name: 'Container',
          attributes: {},
          elements: [
            { type: 'element', name: 'Input', attributes: {}, elements: [] },
            { type: 'element', name: 'Input', attributes: {}, elements: [] },
          ],
        },
      ],
    },
    '<Container><Input/><Input/></Container>',
  ],
])('%s', (name, ast: ASTNode, intermediate: XMLElement, xml: string) => {
  test('transformToXMLAST', () => {
    expect(transformToXMLAST(ast)).toEqual(intermediate);
  });

  test('serializeToXML', () => {
    expect(serializeToXML(ast)).toBe(xml);
  });
});
