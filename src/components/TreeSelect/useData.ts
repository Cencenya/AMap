

export enum MapKey {
    'DataBrief'='DataBrief',
    'DataReports'='DataReports',
    'StoreStatus'='StoreStatus',
    'StoreMap'='StoreMap',
    'ConversionFunnels'='ConversionFunnels'

}
export function initMap(){
    const map = {
    }
    Object.keys(MapKey).forEach((item)=>{
        map[item] = []
    })
    return map
}

const DataBrief = {
    title: '数据简报',
    disableCheckbox:true,
    checkable:false,
    selectable:false,
    key:MapKey.DataBrief,
    children: [
        {
            title: '新增机会点',
        },
        {
            title: '新增机会点',

        }, {
            title: '新增机会点',

        },
        {
            title: '新增机会点',

        },
        {
            title: '新增机会点',

        },
        {
            title: '新增机会点',

        },
        {
            title: '新增机会点',

        },
        {
            title: '新增机会点',

        },
        {
            title: '新增机会点',

        },
        {
            title: '新增机会点',

        },
    ]
}

const DataReports = {
    title: '数据报表',
    key:MapKey.DataReports,

}
const ConversionFunnels = {
    title: '转换漏斗',
    key:MapKey.ConversionFunnels,

    children: [
        {
            title: '新增机会点',

        },
        {
            title: '新增机会点',

        }, {
            title: '新增机会点',

        },
        {
            title: '新增机会点',

        },
        {
            title: '新增机会点',

        }
    ]
}

const StoreStatus = {
    title: '门店状态',
    key:MapKey.StoreStatus
}
const StoreMap = {
    title: '门店地图',
    key:MapKey.StoreMap,

}

export function fetchTreeDataSource() {
    const data = [DataBrief, StoreMap, ConversionFunnels, StoreStatus, DataReports]
    return loop(data,'0',true)
}

function loop(data, key = '0',first) {
    return data.map((item, index) => {
        const newItem = { ...item };
        const KEY = first?`${item.key}`:`${key}-${index}`;
        newItem.key = KEY;
        newItem.title = `${item.title}-${index}`
        let children = [];
        if (newItem.children) {
            children = loop(newItem.children, KEY,false)
        }
        newItem.children = children
        return newItem
    })

}