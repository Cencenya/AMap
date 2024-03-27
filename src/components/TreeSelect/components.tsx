import { ReactElement, ReactNode } from "react"
import styles from './index.module.less';
import AMap from "@/AMap/AMap";
import { Col, Row, Slider } from 'antd';
import cn from 'classnames';
import React from "react";
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
    return <CardLayout
        title='门店地图'
    >
        <section>
            <AMap
            />

        </section>
    </CardLayout>
}
export const StoreMap = React.memo(StoreMap_)

interface ConversionFunnelsProps {
    data: Array<any>
}
export function ConversionFunnels(props: ConversionFunnelsProps) {
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