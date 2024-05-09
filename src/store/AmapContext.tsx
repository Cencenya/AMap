import { createContext, useReducer } from "react";
import { Actions, mapReducer, AMapReducer } from "./reducer";


type InitialStateType = {
    map: AMap.Map | null, // 实例
    AMap: typeof AMap | null; // 构造函数
}

const initialState = {
    map: null,
    AMap: null

}

// 创建context对象
export const AMapContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<Actions>;
}>({ state: initialState, dispatch: () => null });


// 定义每个state的reducer函数
const mainReducer = (state: InitialStateType, action: Actions) => {
    return ({
        map: mapReducer(state.map, action),
        AMap: AMapReducer(state.AMap, action)
    })
};
const reducer = (state, action) => {
    console.log('reducer', state, action)
    return {
        map: null,
        AMap: null
    }
}

interface AMapProviderProps {
    children: React.ReactNode;
}
// provider组件
export const AMapProvider: React.FC<AMapProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    return (
        <AMapContext.Provider value={{ state, dispatch }}>
            {children}
        </AMapContext.Provider>
    );
};
