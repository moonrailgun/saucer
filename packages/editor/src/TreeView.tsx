import React, { useCallback, useMemo } from 'react';
import Tree, { TreeProps } from 'rc-tree';
import 'rc-tree/assets/index.less';
import {
  useAST,
  traverseUpdateTree,
  isContainerNode,
  useCurrentTeaId,
  useCurrentTeaAction,
  useASTDispatchAction,
  getNextPath,
  resetPathLastIndex,
} from '@saucerjs/core';
import type { DataNode, EventDataNode, Key } from 'rc-tree/lib/interface';
import type { ASTType } from '@saucerjs/core';

interface SaucerTreeNodeData extends DataNode {
  path: string;
  type: ASTType;
}

interface SaucerTreeEventDataNode extends EventDataNode {
  path: string;
  type: ASTType;
}

export const TreeView: React.FC = React.memo(() => {
  const ast = useAST();
  const currentSelectedTeaId = useCurrentTeaId();
  const { setCurrentTeaId } = useCurrentTeaAction();
  const { dispatchMoveNodeByPath } = useASTDispatchAction();
  const selectedKeys = useMemo(() => {
    if (currentSelectedTeaId === null) {
      return [];
    }
    return [currentSelectedTeaId];
  }, [currentSelectedTeaId]);
  const treeData = useMemo(
    () => [
      traverseUpdateTree<SaucerTreeNodeData>(ast, (node, { path }) => {
        if (isContainerNode(node)) {
          return {
            key: node.id,
            title: `${node.cupName}(${node.id})`,
            path,
            children: node.children,
          };
        } else {
          return {
            key: node.id,
            title: `${node.cupName}(${node.id})`,
            path,
          };
        }
      }),
    ],
    [ast]
  );

  const handleSelect = useCallback(
    (selectedKeys: Key[]) => {
      if (typeof selectedKeys[0] === 'string') {
        setCurrentTeaId(selectedKeys[0]);
      } else {
        setCurrentTeaId(null);
      }
    },
    [setCurrentTeaId]
  );

  const handleDrop: TreeProps['onDrop'] = (info) => {
    const dragNode: SaucerTreeEventDataNode = info.dragNode as any;
    const node: SaucerTreeEventDataNode = info.node as any;
    const { dropToGap, dropPosition } = info;

    if (Array.isArray(node.children) && dropToGap === false) {
      // Drop into container
      let targetPath = `${node.path}.0`;
      if (node.path === '') {
        targetPath = '0';
      }

      dispatchMoveNodeByPath(dragNode.path, targetPath);
      return;
    }

    if (dropToGap === true) {
      dispatchMoveNodeByPath(
        dragNode.path,
        resetPathLastIndex(node.path, dropPosition)
      );
      return;
    }

    if (node.dragOverGapTop === true) {
      dispatchMoveNodeByPath(dragNode.path, node.path);
    } else if (node.dragOver === true || node.dragOverGapBottom === true) {
      dispatchMoveNodeByPath(dragNode.path, getNextPath(node.path));
    }
  };

  return (
    <div className="saucer-editor-treeview">
      <Tree
        defaultExpandAll={true}
        selectedKeys={selectedKeys}
        treeData={treeData}
        draggable={true}
        onSelect={handleSelect}
        onDrop={handleDrop}
      />
    </div>
  );
});
TreeView.displayName = 'TreeView';
