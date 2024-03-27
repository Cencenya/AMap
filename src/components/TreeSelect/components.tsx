import { ReactElement, ReactNode } from "react"
import styles from './index.module.less'
interface DataBriefProps {
    data: Array<any>

}
export function DataBrief(props: DataBriefProps) {
    return <CardLayout
        title='数据简报'
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
export function StoreMap(props: StoreMapProps) {
    return <CardLayout
        title='门店地图'
    >
        StoreMap
    </CardLayout>
}

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