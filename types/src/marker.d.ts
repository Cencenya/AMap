declare namespace _AMap {

  interface Map {}
    /**
   * 添加文本标注
   */
    interface MarkerLabelOptions {
      /** 文本标注的内容 */
      content?: string;
      /** 文本标注方位 可选值，默认值: `right`。 */
      direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
      /** 为偏移量。如设置了 direction，以 direction 方位为基准点进行偏移。 */
      offset?: Pixel;
    }

  class Marker extends MapEventListener<'dragstart' | 'touchmove' | 'click' | 'dblclick' | 'rightclick' | 'mousemove' | 'mouseover' | 'mouseout' | 'mousedown' | 'mouseup' | 'dragging' | 'dragend' | 'moving' | 'moveend' | 'touchend' | 'movealong' | 'touchstart'> {
    constructor(opts: MarkerOptions);
    /** 获取点标记的文字提示 */
    getTitle(): string | undefined;
    /** 鼠标滑过点标时的文字提示 */
    setTitle(title: string): void;
    /** 当点标记未自定义图标时，获取Icon内容 */
    getIcon(): Icon | string | undefined;
    /** 当点标记未自定义图标时，获取Icon内容 */
    setIcon(icon: Icon | string): void;
    /** 获取点标记文本标签内容 */
    getLabel(): MarkerLabelOptions;
    /** 设置点标记文本标签内容相关示例（https://lbs.amap.com/api/javascript-api/example/marker/set-marker-text-label/） */
    setLabel(opts: MarkerLabelOptions): void;
    /** 获取点标记是否支持鼠标单击事件Boolean */
    getClickable(): boolean;
    /** 设置点标记是支持鼠标单击事件clickable:Boolean */
    setClickable(clickable: boolean): void;
    /** 获取点标记对象是否可拖拽移动Boolean */
    getDraggable(): boolean;
    /** 设置点标记对象是否可拖拽移动draggable:Boolean */
    setDraggable(draggable: boolean): void;
    /** 获取该点标记是否置顶 */
    getTop(): boolean;
    /** 获取鼠标悬停时的光标设置 */
    getCursor(): string;
    /** 地图上有多个marker时，设置是否置顶该点标记 */
    setTop(isTop: boolean): void;
    /** 获取鼠标悬停时的光标设置 */
    getCursor(): string;
    /** 设置鼠标悬停时的光标 */
    setCursor(cursor: string): void;
    /** 获取用户自定义属性 Any */
    getExtData(): any | undefined;
    /** 设置用户自定义数据 */
    setExtData(extData: any): void;
    /** 设置尺寸 */
    setSize(size: Vector | Size): void;
    /** 获取点标记的叠加顺序 */
    getzIndex(): number | undefined;
    /** 设置点标记的叠加顺序，默认最先添加的点标记在最底层 */
    setzIndex(zIndex: number): void;
    /** 获取覆盖物的所有属性 */
    getOptions(): OverlayOptions;
    /** 获取点标记显示的自定义内容 */
    getContent(): string | HTMLElement | undefined;
    /** 将覆盖物加到地图上 */
    add(map: Map): void;
    /** 移除点标记 [相关示例](https://lbs.amap.com/api/jsapi-v2/example/marker/marker-content) */
    remove(): void;
    /** 获取覆盖物旋转角度 */
    getAngle(): number | undefined;
    /** 设置覆盖物偏移量 */
    setOffset(offset: Vector | Pixel): void;
    /** 设置点标记显示内容，可以是HTML要素字符串或者HTML DOM对象 */
    setContent(content: HTMLElement | string): void;
    /** 获取点标记范围 */
    getBounds(): Bounds;
    /** 获取覆盖物偏移量 */
    getOffset(): Vector | Pixel | undefined | Array<number>;
    /** 设置覆盖物锚点 */
    Marker(anchor: string): void;
    /** 获取覆盖物的地图实例 */
    getMap(): Map | null;
    /** 获取覆盖物锚点 */
    getAnchor(): string | Vector | undefined;
    /** 设置覆盖物位置 */
    setPosition(position: Vector): void;
    /** 获取覆盖物位置 */
    getPosition(): Vector;
    /** 将覆盖物设置到地图上 */
    setMap(map: Map | null): void;
    /** 将覆盖物加到地图上 */
    addTo(map: Map): void;
    /** 设置覆盖物旋转角度 */
    setAngle(angle: number): void;
    /** 如设置了尺寸，获取设置的尺寸 */
    getSize(): Vector;
    /** 以指定的时长，点标记沿指定的路径移动，加载 AMap.MoveAnimation 后可以使用 */
    moveAlong(path: Array<LngLat> | Array<Vector> | Array<MoveAlongObj>, opts?: MoveAlongOptions): void;
    /** 暂停点标记动画，加载 AMap.MoveAnimation 后创建的点标记可以使用 */
    pauseMove(): void;
    /** 重新启动点标记动画，加载 AMap.MoveAnimation 后可以使用 */
    resumeMove(): void;
    /** 停止点标记动画，加载 AMap.MoveAnimation 后可以使用 */
    stopMove(): void;
    /** 开启点标记动画，加载 AMap.MoveAnimation 后可以使用 */
    startMove(): void;
    /** 以给定时间移动点标记到指定位置，加载 AMap.MoveAnimation 后可以使用 */
    moveTo(targetPosition: LngLat | Vector, opts?: MoveAlongOptions): void;
  }
  interface MarkerOptions {
  }
  interface MarkerEvents extends EventsCommonProps {
    /**
     * 鼠标移动
     */
    onMouseMove?(event: MapsEvent): void;
    /**
     * 开始拖拽点标记时触发事件
     */
    onDragStart?(event: MapsEvent): void;
    /**
     * 鼠标拖拽移动点标记时触发事件
     */
    onDragging?(event: MapsEvent): void;
    /**
     * 点标记拖拽移动结束触发事件
     */
    onDragEnd?(event: MapsEvent): void;
    /**
     * 点标记在执行moveTo，moveAlong动画时触发事件，Object对象的格式是{passedPath:Array.<LngLat>}。
     * 其中passedPath为Marker对象在moveAlong或者moveTo过程中已经走过的路径。
     */
    onMoving?(obj: { passedPath: Array<LngLat> }): void;
    /**
     * 点标记执行moveTo动画结束时触发事件，也可以由moveAlong方法触发
     */
    onMoveEnd?(): void;
    /**
     * 点标记执行moveAlong动画一次后触发事件
     */
    onMoveAlong?(): void;
  }
  interface MoveAlongObj { }
  interface OverlayOptions {
    map?: Map;
    position?: [number, number];
    content?: string | HTMLElement;
    visible?: boolean;
    zIndex?: number;
    extData?: any;
    size?: [number, number] | Size;
    offset?: [number, number] | Pixel;
    anchor?: string | [number, number];
    rotate?: number;
    angle?: number;
    orientation?: number | null;
    scale?: number;
    draggable?: boolean;
    zooms?: [number, number];
    noSelect?: boolean;
    innerOverlay?: boolean;
    isCustom?: boolean;
  }
    /** 时间函数回调 */
    type EasingCallback = (passedTime: number) => number;
    
  type AnimationCallback = (index: number, data: LngLat) => number;
  interface MoveAlongOptions {
    /** 每段动画持续时长, 单位：ms */
    duration?: number | AnimationCallback;
    /** 每段动画速度，已废弃 */
    speed?: number | AnimationCallback;
    /** easing 时间函数 */
    easing?: EasingCallback;
    /** 动画是否循环 */
    circlable?: boolean;
    /** 延迟动画时长 */
    delay?: number | AnimationCallback;
    /** 每段完整动画间隔时长 */
    aniInterval?: number;
    /** 覆盖物是否沿路径旋转 */
    autoRotation?: boolean;
  }
}