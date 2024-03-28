import { CSSProperties, useEffect, useRef, useState, Children, ReactNode, createElement, cloneElement, useContext } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import _AMap, { } from '../AMap/index';
import { AMapKey } from '../config/index';
import { AMapContext, AMapProvider } from "@/store/AmapContext";
import useAMapContext from "@/hooks/useAMapContext";
import { DispatchActionTypes } from "@/store/ActionType";
import style from './index.module.less';
import MarkerInfo from "@/components/MarkInfo";
import { createRoot } from "react-dom/client";
import { debounce } from "@/config/utils";
type AMapInstance = typeof window.AMap
export type LoaderConfig = Parameters<typeof AMapLoader.load>[0];
type MapInstanceOptions = Partial<AMap.MapOptions>
interface AMapProps {
    styles?: CSSProperties;
    config: LoaderConfig;
    onLoaded?: (map: AMapInstance, mapDom: HTMLDivElement) => void;
    children?: ReactNode;
    mapOpts: MapInstanceOptions
}

const GDPSpeed = {
    '520000': 10,//贵州
    '540000': 10,//西藏
    '530000': 8.5,//云南 
    '500000': 8.5,//重庆
    '360000': 8.5,//江西
    '340000': 8.0,//安徽
    '510000': 7.5,//四川
    '350000': 8.5,//福建
    '430000': 8.0,//湖南
    '420000': 7.5, //湖北
    '410000': 7.5,//河南
    '330000': 7.0,//浙江
    '640000': 7.5,//宁夏
    '650000': 7.0,//新疆
    '440000': 7.0,//广东
    '370000': 7.0,//山东
    '450000': 7.3,//广西
    '630000': 7.0,//青海
    '320000': 7.0,//江苏
    '140000': 6.5,//山西
    '460000': 7,// 海南
    '310000': 6.5,//上海
    '110000': 6.5, // 北京
    '130000': 6.5, // 河北
    '230000': 6, // 黑龙江
    '220000': 6,// 吉林
    '210000': 6.5, //辽宁
    '150000': 6.5,//内蒙古
    '120000': 5,// 天津
    '620000': 6,// 甘肃
    '610000': 8.5,// 甘肃
    '710000': 2.64, //台湾
    '810000': 3.0, //香港
    '820000': 4.7 //澳门

}
const colors = {};
const randomInteger = Math.floor(Math.random() * 100);
const getColorByDGP = function (adcode) {
    if (!colors[adcode]) {
        var gdp = GDPSpeed[adcode];
        if (!gdp) {
            colors[adcode] = 'rgb(227,227,227)'
        } else {
            var r = 3;
            var g = 180;
            var b = 270;
            var a = gdp / randomInteger;
            colors[adcode] = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
    }
    return colors[adcode] as string
}
const AMap: React.FC<AMapProps> = (props) => {
    const { styles, config, onLoaded, children, mapOpts } = props;
    const [map, setMap] = useState<null | AMapInstance>(null);
    const { AMap, updateAMapLoader, updateMap, destroyMap } = useAMapContext();
    const mapRef = useRef<null | HTMLDivElement>();
    const { state, dispatch } = useContext(AMapContext);
    const [markerList, setMarkerList] = useState([])
    useEffect(() => {
        if (!mapRef.current) return;
        initMapLoader();
        return () => {
            destroyMap()
        }
    }, [mapRef.current]);

    const initMapLoader = async () => {
        try {
            const AMap = await AMapLoader.load({
                key: AMapKey,
                ...config
            });
            updateAMapLoader(AMap);
            await initMapInstance();
        } catch (error) {
            console.log('init error', error);
        }
    }
    const initMapInstance = async () => {
        if (!AMap || !mapRef) return;
        console.log('initMapInstance', AMap, mapRef)
        const disCountry = new window.AMap.DistrictLayer.Country({
            zIndex: 10,
            SOC: 'CHN',
            depth: 1,
            styles: {
                'nation-stroke': '#ff0000',
                'coastline-stroke': '#0088ff',
                'province-stroke': 'grey',
                // @ts-ignore
                'fill': function (props) {
                    // console.log('props',props)
                    return getColorByDGP(props.adcode_pro)
                }
            }
        });
        const map = new AMap.Map(mapRef.current as unknown as HTMLDivElement, { ...mapOpts, layers: [disCountry] });
        updateMap(map);
        const renderMarker = debounce((event, location) => {
            const id = Date.now();
            const marker = new window.AMap.Marker({
                position: event.lnglat,
                content: `<div id="${id}"></div>`

            })
            console.log("markerList", markerList)
            map.clearMap()
            map.add(marker);
            setMarkerList([marker])
            const domNode = document.getElementById(`${id}`);
            const root = createRoot(domNode);
            root.render(<MarkerInfo title={location.NAME_CHN} />)
        }, 50)

        const handleMouseMove = (event) => {
            console.log('event', event);
            var px = event.pixel;
            // 拾取所在位置的行政区
            // @ts-ignore
            const location = disCountry.getDistrictByContainerPos(px);
            console.log('disCountry', location)
            if (location && location.adcode_pro) {
                renderMarker(event, location)
                disCountry.setStyles({
                    // @ts-ignore
                    'fill': function (props) {
                        return props.adcode_pro === location.adcode_pro ? 'rgb(255,140,0)' : getColorByDGP(props.adcode_pro)
                    }
                })
            } else {
                map.clearMap();
                disCountry.setStyles({
                    // @ts-ignore
                    'fill': function (props) {
                        return getColorByDGP(props.adcode_pro)
                    }
                })

            }
        }

        map.on('mousemove', handleMouseMove, 200)
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
    return <main className={style.mapContainer} >
        <div ref={mapRef} id={style.container} />
        {/* {renderchildren()} */}
        {children}
    </main>


}

export default AMap