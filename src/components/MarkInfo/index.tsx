
interface MarkerInfoProps {
    title: string;
}

const MarkerInfo = (props: MarkerInfoProps) => {
    const { title } = props
    return <main>
        {title}
    </main>
}

export default MarkerInfo;