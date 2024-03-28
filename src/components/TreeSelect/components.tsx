import { ReactElement, ReactNode } from "react"
import styles from './index.module.less';
import AMap from "@/AMap/AMap";
import { Col, Row, Slider } from 'antd';
import cn from 'classnames';
import React from "react";
import { AMapKey } from "@/config";
import { AMapProvider } from "@/store/AmapContext";
interface DataBriefProps {
    data: Array<any>

}
export function DataBrief(props: DataBriefProps) {
    const { data } = props;
    const length = data.length;
    const wrap = length > 6;

    return <CardLayout
        title='数据简报'
    >
        <div className={wrap ? styles.wrapList : styles.list}>
            {props.data.map((item, index) => (
                <div key={index} className={styles.card}>

                    {item.title}
                </div>
            ))}
        </div>

    </CardLayout>
}

interface DataReportsProps {

}
export function DataReports(props: DataReportsProps) {
    return <CardLayout
        title='DataReports'
    >
        DataReports
    </CardLayout>
}

interface StoreStatusProps {

}
export function StoreStatus(props: StoreStatusProps) {
    return <CardLayout
        title='StoreStatus'
    >
        StoreStatus
    </CardLayout>
}

interface StoreMapProps {
    // data: Array<any>
}
function StoreMap_(props: StoreMapProps) {
    console.log('StoreMap_')
    const LoaderConfig = {
        key: AMapKey,
        version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        // plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
    }

    const mapConfig = {
        // zooms: [4, 4] as [number, number],
        zoomEnable: false,
        center: [104.195397, 35.86166] as [number, number],
        zoom: 4,
        isHotspot: false,
        defaultCursor: 'pointer',
        dragEnable: false
        // viewMode: '3D',
    }
    return <AMapProvider>
        <CardLayout
            title='门店地图'
        >
            <main className={styles.storeMap}>
                <AMap
                    config={LoaderConfig}
                    mapOpts={mapConfig}
                />
                <section className={styles.rightMenu}>

                </section>
            </main>


        </CardLayout>
    </AMapProvider>
}
export const StoreMap = React.memo(StoreMap_)

interface ConversionFunnelsProps {
    data: Array<any>
}
export const ConversionFunnels = (props: ConversionFunnelsProps) => {
    return <CardLayout
        title='ConversionFunnels'
    >
        {
            props.data.map((item) => {
                return <section className={styles.card}>
                    {item.title}
                </section>
            })
        }
    </CardLayout>


}

interface CardLayoutProps {
    title: string | ReactNode;
    children: ReactNode | ReactElement
}
export function CardLayout(props: CardLayoutProps) {
    const { title, children } = props;

    return <section className={styles.cardLayout}>
        <header className={styles.header}>{title}</header>
        <section className={styles.container}>{children}</section>
    </section>

}