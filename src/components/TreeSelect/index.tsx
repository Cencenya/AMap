import React, { useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import styles from './index.module.less'
import { Container } from './SelectView';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MapKey, fetchTreeDataSource, initMap } from './useData';
import { ConversionFunnels, DataBrief, DataReports, StoreMap, StoreStatus } from './components';
import useIsFirstRender from '@/hooks/useIsFirstRender';
const x = 3;
const y = 2;
const z = 1;
const defaultData: TreeDataNode[] = [];

const generateData = (_level: number, _preKey?: React.Key, _tns?: TreeDataNode[]) => {
    const preKey = _preKey || '0';
    const tns = _tns || defaultData;

    const children: React.Key[] = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);
const treeData = fetchTreeDataSource()

export const isSameLevel = (a, b) => {
    const aLevel = a.props.pos.split('-').length;
    const bLevel = b.props.pos.split('-').length;

    return aLevel === bLevel;
};

const isSameParent = (a, b) => {
    const aLevel = a.props.pos.split('-');
    const bLevel = b.props.pos.split('-');
    aLevel.pop();
    bLevel.pop();
    return aLevel.join('') === bLevel.join('');
};

const isDropToFirst = (a, b) => {
    const aLevel = a.props.pos.split('-');
    const bLevel = b.props.pos.split('-');
    aLevel.pop();
    return aLevel.join('') === bLevel.join('');
};

function intersection<T>(arr1: T[], arr2: T[]): T[] {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    const result = [...set1].filter((x) => set2.has(x));

    return result;
}
const initialMap = initMap()
const HomePageConfiguration: React.FC = () => {
    const [gData, setGData] = useState(treeData);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0', '0-0-0', '0-0-0-0']);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
    const [dataSource, updateDataSource] = useState(initialMap);
    const isfirstRender = useIsFirstRender();
    const onDragEnter: TreeProps['onDragEnter'] = (info) => {
        // console.log(info);
        // expandedKeys, set it when controlled is needed
        // setExpandedKeys(info.expandedKeys)
    };
    const onExpand = (expandedKeysValue: React.Key[]) => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue: React.Key[], info: any) => {
        const map = {

        }
        checkedKeysValue.forEach((item) => {
            const keyPos = (item as string).split('-');
            const mapKey = keyPos[0];
            if (keyPos.length > 1) {
                if (map[mapKey]) {
                    map[mapKey].push(item)
                } else {
                    map[mapKey] = [item]
                }
            } else {
                map[mapKey] = []
            }
            // console.log('keyPos', keyPos)
        })
        console.log('map', map)
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue: React.Key[], info: any) => {

        setSelectedKeys(selectedKeysValue);
    };
    const onDrop: TreeProps['onDrop'] = (info) => {

        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

        const canDrop = (isDropToFirst(info.dragNode, info.node)
            || (isSameParent(info.dragNode, info.node) && isSameLevel(info.dragNode, info.node)) && info.dropToGap);
        console.log('canDrop', canDrop)
        if (!canDrop) return;
        const loop = (
            data: TreeDataNode[],
            key: React.Key,
            callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
        ) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children!, key, callback);
                }
            }
        };

        const data = [...gData];

        // Find dragObject
        let dragObj: TreeDataNode;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
                item.children.unshift(dragObj);
            });
        } else {
            let ar: TreeDataNode[] = [];
            let i: number;
            loop(data, dropKey, (_item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                // Drop on the top of the drop node
                ar.splice(i!, 0, dragObj!);
            } else {
                // Drop on the bottom of the drop node
                ar.splice(i! + 1, 0, dragObj!);
            }
        }
        setGData(data);
    };

    return (
        <main className={styles.container}>
            <Tree
                checkable
                draggable
                blockNode
                className={styles.tree}
                defaultExpandedKeys={expandedKeys}
                expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                checkedKeys={checkedKeys}
                onDragEnter={onDragEnter}
                onDrop={onDrop}
                onExpand={onExpand}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                onSelect={onSelect}
                treeData={gData}
                titleRender={(nodeData: any) => {
                    return <span >{nodeData.title}</span>

                }}
            />
            {/* <DndProvider backend={HTML5Backend}>
                <Container />
            </DndProvider> */}
            <article className={styles.content}>
                {
                    gData.map((item) => {
                        if (item.key === MapKey.DataBrief) {
                            const data = item.children.filter((item) => checkedKeys.includes(item.key))
                            if (data.length === 0) return null;
                            return <DataBrief data={data} />;
                        }
                        if (item.key === MapKey.ConversionFunnels) {
                            const data = item.children.filter((item) => checkedKeys.includes(item.key));
                            if (data.length === 0) return null;
                            return <ConversionFunnels data={data} />;
                        }
                        if (item.key === MapKey.DataReports) return <DataReports />;
                        if (item.key === MapKey.StoreMap) {
                            const show = checkedKeys.includes(item.key)
                            if (!show) return;
                            return <StoreMap />;
                        }
                        if (item.key === MapKey.StoreStatus) return <StoreStatus />;
                    })
                }
            </article>
        </main>

    );
};

export default HomePageConfiguration;