import { CSSProperties, useEffect, useRef, useState, Children, ReactNode, createElement, cloneElement } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import _AMap, { } from '../AMap/index';
import { AMapKey } from '../config/index';
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

    const initMap = async () => {
        const newMap = new _AMap();
        await newMap.init({
            key: AMapKey,
            version: "2.0",
            plugins: ['AMap.Scale']
        },)
        const lnglat = new window.AMap.LngLat(106.122082, 33.719192);
        // newMap.createCountryDistrictLayer({
        //   zIndex: 10,
        //   SOC: 'CHN',
        //   depth: 1,
        //   styles: {
        //     'nation-stroke': '#ff0000',
        //     'coastline-stroke': '#0088ff',
        //     'province-stroke': 'grey',
        //   }
        // })
        await newMap.createMapInstance('container', {
            zooms: [4, 8],
            center: [105.602725, 37.076636],
            zoom: 4,
            isHotspot: false,
            defaultCursor: 'pointer',
            viewMode: '3D',
        })
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