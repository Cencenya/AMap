import styles from './index.module.less';
interface MarkerInfoProps {
    title: string;

}

const MarkerInfo = (props: MarkerInfoProps) => {
    const { title } = props
    return <main className={styles.markinfoContainer}>
        <h1>{title}</h1>
        <section>

        </section>
    </main>
}

export default MarkerInfo;