type PageElementsMapper <T extends keyof PageElementsMap> = T extends `#${infer Suffix}` ? Suffix : never;

type RefsObject2<S extends KeyOfPageElementsMap> =
    {
        [K in S] : K extends KeyOfPageElementsMap ? {
            [P in keyof PageElementsMap[K] as PageElementsMapper<K>]: any
        }
        : never
    }

type RefsObject<S extends string> =
    S extends keyof PageElementsMap ? {
        [K in S as PageElementsMapper<K>] :  K extends KeyOfPageElementsMap ? {
            [P in keyof PageElementsMap[K]]: PageElementsMapFunctionWrapper<PageElementsMap[K][P]>
        } : never
    } : never

type BindConfigs = {
    selectorFn? : Function;
    index? : Number;
    runOnReady? : Array<Function>
}

type RepeatersPageElementsMap<S extends string> =
    S extends keyof PageElementsMap ?
        PageElementsMap[S] extends $w.Repeater?{
            [ K in S as PageElementsMapper<K>] : K extends keyof KeyOfPageElementsMap ? {
                [P in keyof PageElementsMap[K]] : any
            }: $w.Repeater
        } : never
        : never;


type PageElementsMapFunctionWrapper<S> = ()=> S
type KeyOfPageElementsMap = keyof PageElementsMap;

declare module '@tzach-f/velo-mvvm' {
    function bindView<T extends KeyOfPageElementsMap>(refs: RefsObject< keyof PageElementsMap>, config: BindConfigs): any;
    function bindRepeaters(refs: RepeatersPageElementsMap<keyof PageElementsMap>): any;
}
