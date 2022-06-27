type PageElementsMapper <T extends keyof PageElementsMap> = T extends `#${infer Suffix}` ? Suffix : never;


//RefObject has 2 options - one that counts the elements nickname as the stronger constrain and the other the element properties as the stronger constrain
type RefsObject2<S extends KeyOfPageElementsMap> =
    {
        [K in S] : K extends KeyOfPageElementsMap ? {
            [P in keyof PageElementsMap[K] as PageElementsMapper<K>]: any
        }
        : never
    }

    //TODO: exclude element whos type of repeaters
type RefsObject<S extends string> =
    S extends keyof PageElementsMap ? {
        [K in S as PageElementsMapper<K>] :  K extends KeyOfPageElementsMap ? {
            [P in keyof PageElementsMap[K]]: any
        } : never
    } : never

type KeyOfPageElementsMap = keyof PageElementsMap
type BindConfigs = {
    selectorFn? : Function;
    index? : Number;
    runOnReady? : Array<Function>
}

//Initial try to type repeaters RefObjects TODO: make it better
type RepeatersPageElementsMap<S extends string> =
    S extends keyof PageElementsMap ?
        PageElementsMap[S] extends $w.Repeater?{
            [ K in S as PageElementsMapper<K>] : K extends keyof KeyOfPageElementsMap ? {
                [P in keyof PageElementsMap[K]] : any
            }: $w.Repeater
        } : never
        : never;

type PageElementsMapFunctionWrapper<S> = ()=> S

declare module '@tzach-f/velo-mvvm' {
    function bindView<T extends KeyOfPageElementsMap>(refs: RefsObject< keyof PageElementsMap>, config: BindConfigs): any;
    function bindRepeaters(refs: RepeatersPageElementsMap<keyof PageElementsMap>): any;
}