import React, { useCallback, useMemo } from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.less';
import {
  useAST,
  traverseUpdateTree,
  isContainerNode,
  useCurrentTeaId,
  useSetCurrentTea,
} from '@saucer/core';
import type { DataNode, Key } from 'rc-tree/lib/interface';

export const TreeView: React.FC = React.memo(() => {
  const ast = useAST();
  const currentSelectedTeaId = useCurrentTeaId();
  const setCurrentTea = useSetCurrentTea();
  const selectedKeys = useMemo(() => {
    if (currentSelectedTeaId === null) {
      return [];
    }
    return [currentSelectedTeaId];
  }, [currentSelectedTeaId]);
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

  const handleSelect = useCallback(
    (selectedKeys: Key[]) => {
      if (typeof selectedKeys[0] === 'string') {
        setCurrentTea(selectedKeys[0]);
      } else {
        setCurrentTea(null);
      }
    },
    [setCurrentTea]
  );

  return (
    <div className="saucer-editor-treeview">
      <Tree
        defaultExpandAll={true}
        selectedKeys={selectedKeys}
        treeData={treeData}
        onSelect={handleSelect}
      />
    </div>
  );
});
TreeView.displayName = 'TreeView';
