import AMapLoader from "@amap/amap-jsapi-loader";
import { AMapKey } from '../config/index';
import ReactDOM from "react-dom";
import MarkerInfo from '../components/MarkInfo/index'
import React from "react";
export type LoaderConfig = Parameters<typeof AMapLoader.load>[0]
type MapInstanceOptions = Partial<AMap.MapOptions>

export const AMap = window.AMap || null
function retryOnMissingAMap(retries: number) {

    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (dom: string, options: MapInstanceOptions) {
            console.log('retryOnMissingAMap', window.AMap)
            for (let i = 0; i < retries; i++) {
                if (typeof AMap === 'undefined' && typeof window.AMap === 'undefined') {

                    await new Promise(resolve => setTimeout(resolve, 500));
                } else {
                    return originalMethod.call(this, dom, options);
                }
            }

            throw new Error('Failed to load AMap after ' + retries + ' retries');
        };

        return descriptor;
    };
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

class _AMap {
    map: AMap.Map;
    AMap = window.AMap;
    layer = [];
    marker = [];
    constructor(config?: LoaderConfig) {

    }
    async init(config: LoaderConfig) {
        try {
            const AMap = await AMapLoader.load({
                key: AMapKey,
                ...config
            });
        } catch (error) {
            console.log('init error', error);
        }
    }
    @retryOnMissingAMap(3)
    async createMapInstance(dom: string, options: MapInstanceOptions) {
        try {
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
            this.layer.push(disCountry);
            const map = new window.AMap.Map(dom, {
                zooms: [4, 8],
                center: [105.602725, 37.076636],
                zoom: 4,
                isHotspot: false,
                defaultCursor: 'pointer',
                viewMode: '3D',
                layers: [...this.layer]
            });
            this.map = map;

            this.map.on('click', (event) => {
                console.log('event', event);
                var px = event.pixel;
                // 拾取所在位置的行政区
                // @ts-ignore
                const location = disCountry.getDistrictByContainerPos(px);
                console.log('disCountry', location)
                if (location && location.adcode_pro) {
                    const id = Date.now();

                    const marker = new window.AMap.Marker({
                        position: event.lnglat,
                        content: `<div id="${id}"></div>`

                    })
                    this.map.remove(this.marker)
                    this.map.add(marker);
                    this.marker.push(marker)
                    ReactDOM.render(<MarkerInfo title={location.NAME_CHN} />, document.getElementById(`${id}`))

                    disCountry.setStyles({
                        // @ts-ignore
                        'fill': function (props) {
                            return props.adcode_pro === location.adcode_pro ? 'rgb(255,140,0)' : getColorByDGP(props.adcode_pro)
                            // return getColorByDGP(props.adcode_pro)
                        }
                    })
                }

            })
        } catch (error) {
            console.log('createMapInstance', error);


        }

    }

    createCountryDistrictLayer(ops: AMap.DistrictLayerOptions) {
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
                    console.log('props', props)
                    return getColorByDGP(props.adcode_pro)
                }
            }
        });
        this.layer.push(disCountry);

    }

}


export default _AMap;


