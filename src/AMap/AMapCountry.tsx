import MarkerInfo from "@/components/MarkInfo";
import { debounce } from "@/config/utils";
import useAMapContext from "@/hooks/useAMapContext";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

interface AMapCountry {

}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const GDPSpeed = {
    '520000': 11,//贵州
    '540000': 20,//西藏
    '530000': 17,//云南 
    '500000': 20,//重庆
    '360000': 26,//江西
    '340000': 19,//安徽
    '510000': 18,//四川
    '350000': 44,//福建
    '430000': 34,//湖南
    '420000': 45, //湖北
    '410000': 29,//河南
    '330000': 50,//浙江
    '640000': 16,//宁夏
    '650000': 14,//新疆
    '440000': 56,//广东
    '370000': 27,//山东
    '450000': 13.3,//广西
    '630000': 7.0,//青海
    '320000': 54,//江苏
    '140000': 6.5,//山西
    '460000': 7,// 海南
    '310000': 67,//上海
    '110000': 60, // 北京
    '130000': 6.5, // 河北
    '230000': 6, // 黑龙江
    '220000': 6,// 吉林
    '210000': 6.5, //辽宁
    '150000': 12,//内蒙古
    '120000': 5,// 天津
    '620000': 9,// 甘肃
    '610000': 19,// 甘肃
    '710000': 28, //台湾
    '810000': 45, //香港
    '820000': 33 //澳门

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
            var a = random(5, 50) / randomInteger;
            colors[adcode] = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
    }
    return colors[adcode] as string
}


function gradientBlueColor(adcode) {
    var r = 3;
    var g = 180;
    var b = 270;
    var a = random(10, 40) / randomInteger;
    colors[adcode] = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function AMapCountry(props: AMapCountry) {
    const { map, AMap, updateAMapLoader, updateMap, destroyMap } = useAMapContext();
    const [disCountry, setDisCountry] = useState([])
    useEffect(() => {
        if (!map) return;
        initDistrictLayer()
    }, [map])

    const renderMarker = debounce((lnglat, info) => {
        const id = Date.now();
        console.log('event.lnglat', lnglat)
        const marker = new window.AMap.Marker({
            position: lnglat,
            content: `<div id="${id}"></div>`,
            offset: new AMap.Pixel(5, 5),

        })
        // new window.AMap.Polygon({

        // })
        map.clearMap();
        map.add(marker);
        // setMarkerList([marker])
        const domNode = document.getElementById(`${id}`);
        const root = createRoot(domNode);
        root.render(<MarkerInfo title={info.NAME_CHN} />)
    }, 100);


    const handleCountryMouseMove = (event, disCountry) => {
        const px = event.origin.pixel;
        const lnglat = event.origin.lnglat;
        // 拾取所在位置的行政区
        // @ts-ignore
        // console.log('handleCountryMouseMove', disCountry)
        const location = disCountry.getDistrictByContainerPos(px);

        if (location && location.adcode_pro) {
            renderMarker(lnglat, location)
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

    const handleProvinceMouseMove = (event, disProvince) => {
        const px = event.origin.pixel;
        const lnglat = event.origin.lnglat;

        // 拾取所在位置的行政区
        // @ts-ignore

        if (!px) return;
        const location = disProvince.getDistrictByContainerPos(px);
        console.log('location', location);
        if (location && location.adcode_pro) {
            renderMarker(lnglat, location)
            disProvince.setStyles({
                // @ts-ignore
                'fill': function (props) {
                    return props.adcode === location.adcode ? 'rgb(255,140,0)' : getColorByDGP(props.adcode)
                }
            })
        } else {
            map.clearMap();
            disProvince.setStyles({
                // @ts-ignore
                'fill': function (props) {
                    return getColorByDGP(props.adcode)
                }
            })

        }
    }

    const handleDbClick = (event, disCountry) => {
        var px = event.pixel;
        // 拾取所在位置的行政区
        // @ts-ignore
        const location = disCountry.getDistrictByContainerPos(px);
        if (location && location.adcode) {
            createProvinceLayer(location.adcode, 2);
            console.log('location', location, event);
            map.panTo([event.lnglat.lng, event.lnglat.lat])
            map.setCity(location.NAME_CHN,);
        }
    }
    const initDistrictLayer = () => {
        map.setCenter([104.195397, 35.86166]);
        map.setZoom(4);
        const disCountry = new AMap.DistrictLayer.Country({
            // zIndex: 10,
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
        setDisCountry([disCountry])
        // map.setLayers([disCountry]);
        // disCountry.on('mousemove', (event) => handleCountryMouseMove(event, disCountry));
        map.on('dblclick', (event) => handleDbClick(event, disCountry));

        // map.on('mouseout', removeMarker);
    }
    const createProvinceLayer = (code, dep) => {
        map.clearMap();
        map.remove([...disCountry]);
        map.off('dblclick', (event) => handleDbClick(event, disCountry));

        const disProvince = new AMap.DistrictLayer.Province({
            zIndex: 14,
            // adcode: [code],
            depth: 1,
            styles: {
                // @ts-ignore
                'fill': function (properties) {
                    // properties为可用于做样式映射的字段，包含
                    // NAME_CHN:中文名称
                    // adcode_pro
                    // adcode_cit
                    // adcode
                    const adcode = properties.adcode;
                    const fill = gradientBlueColor(adcode);
                    return fill;
                },
                'province-stroke': '#ff0000',
                'city-stroke': '#0088ff', // 中国地级市边界
                'county-stroke': 'grey' // 中国区县边界
            }
        });
        // map.setLayers([disProvince]);
        // disProvince.on('mousemove', (event) => handleProvinceMouseMove(event, disProvince))
    }

    const handleBack = () => {
        initDistrictLayer()
    }

    return <h1 onClick={handleBack} style={{
        position: 'absolute',
        top: '100px'
    }}>Back Main Map</h1>
}

export default AMapCountry