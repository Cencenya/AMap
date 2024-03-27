import styles from './index.module.less';
interface MarkerInfoProps {
    title: string;

}

const MarkerInfo = (props: MarkerInfoProps) => {
    const { title } = props
    return <main className={styles.markinfoContainer}>
        <title>{title}</title>
        <section>

        </section>
    </main>
}

export default MarkerInfo;