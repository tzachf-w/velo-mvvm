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
            [P in keyof PageElementsMap[K]]: any
        } : never
    } : never

type KeyOfPageElementsMap = keyof PageElementsMap
declare function bindView<T extends KeyOfPageElementsMap>(refs: RefsObject< keyof PageElementsMap>): any
