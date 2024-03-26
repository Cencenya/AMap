import { CSSProperties, useEffect, useRef, useState, Children, ReactNode, createElement, cloneElement } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

type AMapInstance = typeof window.AMap
export type LoaderConfig = Parameters<typeof AMapLoader.load>[0];
type MapInstanceOptions = Partial<AMap.MapOptions>
interface AMapProps {
    styles: CSSProperties;
    config: LoaderConfig;
    onLoaded: (map: AMapInstance, mapDom: HTMLDivElement) => void;
    children: ReactNode;
    mapOpts: MapInstanceOptions
}
const AMap: React.FC<AMapProps> = (props) => {
    const { styles, config, onLoaded, children, mapOpts } = props;
    const [map, setMap] = useState<null | AMapInstance>(null)
    const mapRef = useRef<null | HTMLDivElement>()
    useEffect(() => {
        if (!mapRef.current) return;
        initMapLoader();
    }, [mapRef]);

    const initMapLoader = async () => {
        const Amap = await AMapLoader.load(config);
        const map = new Amap.Map(mapRef, mapOpts)
        setMap(map);
        onLoaded(map, mapRef.current);
    }
    const renderchildren = () => {
        if (map) return null;
        return Children.map(children, (child) => {
            const childrenElement = child as React.ReactElement<any>;
            if (!child) return childrenElement;
            const { props } = childrenElement;
            if (props && props.preventAmap) return childrenElement;
            return cloneElement(childrenElement, {
                mapIns: map,
                mapDom: mapRef.current
            })
        })
    }
    return <main style={styles} >
        <div ref={mapRef} />
        {renderchildren()}
    </main>
}

export default AMap