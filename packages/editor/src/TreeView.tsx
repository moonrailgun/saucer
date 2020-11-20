import React, { useMemo } from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.less';
import { useAST, traverseUpdateTree, isContainerNode } from '@saucer/core';
import type { DataNode } from 'rc-tree/lib/interface';

export const TreeView: React.FC = React.memo(() => {
  const ast = useAST();
  const treeData = useMemo(
    () => [
      traverseUpdateTree<DataNode>(ast, (node) => {
        if (isContainerNode(node)) {
          return {
            key: node.id,
            title: `${node.cupName}(${node.id})`,
            children: node.children,
          };
        } else {
          return {
            key: node.id,
            title: `${node.cupName}(${node.id})`,
          };
        }
      }),
    ],
    [ast]
  );

  return (
    <div className="saucer-editor-treeview">
      <Tree defaultExpandAll={true} treeData={treeData} />
    </div>
  );
});
TreeView.displayName = 'TreeView';
