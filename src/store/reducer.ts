import { DispatchActionTypes } from "./ActionType";

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        };
  };

  type MapPayload = {
    [DispatchActionTypes.MAP]:AMap.Map | null;
  }
  export type MapPayloadActions =
  ActionMap<MapPayload>[keyof ActionMap<MapPayload>];

  export const mapReducer = (state:AMap.Map | null,action:Actions)=>{
    switch (action.type) {
        case DispatchActionTypes.MAP:
            return state = action.payload    
        default:
            return state;
    }

  }

  type AMapPayload = {
    [DispatchActionTypes.AMAP]:typeof AMap| null;
  }
  export type AMapPayloadActions =
  ActionMap<AMapPayload>[keyof ActionMap<AMapPayload>];

  export const AMapReducer = (state:typeof AMap | null,action:Actions)=>{
    switch (action.type) {
        case DispatchActionTypes.AMAP:
            return state = action.payload 
            // {
            //     ...state,
            //     AMap:action.payload 
            // }    
        default:
            return state;
    }

  }


  export type Actions = MapPayloadActions | AMapPayloadActions