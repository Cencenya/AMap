import styles from './index.module.less';
interface MarkerInfoProps {
    title: string;
}

const MarkerInfo = (props: MarkerInfoProps) => {
    const { title } = props
    return <main className={styles.markinfoContainer}>
        {title}
    </main>
}

export default MarkerInfo;