import { DispatchActionTypes } from "@/store/ActionType";
import { AMapContext } from "@/store/AmapContext";
import { useContext } from "react";

type _AMap = typeof AMap;
export default function useAMapContext() {

    const { state, dispatch } = useContext(AMapContext);
    const { map, AMap } = state;
    const updateAMapLoader = (_AMap: _AMap) => {
        dispatch({
            type: DispatchActionTypes.AMAP,
            payload: _AMap
        })
    }
    const updateMap = (map: AMap.Map) => {
        dispatch({
            type: DispatchActionTypes.MAP,
            payload: map
        })
    }

    const destroyMap = () => {
        try {
            if (!map) return;
            map.remove(map.getLayers());
            // map.clearEvents();
            map.clearMap();
            map.destroy();
            updateMap(null);

        } catch (error) {
            console.log('destroyMap', error)
        }

    }


    return {
        map,
        AMap,
        updateAMapLoader,
        updateMap,
        destroyMap

    }

}

