import { observable, autorun, toJS } from 'mobx';
export const createModel = observable;

export function bindView(bindings, { selectorFn = $w, index = 0, runOnReady = [] }) {
    $w.onReady(() => {
        runOnReady.forEach(fn => fn());
        Object.keys(bindings).forEach(component => {
            const fields = Object.keys(bindings[component]);
            const selector = component.startsWith('#') ? component : `#${component}`;
            fields.forEach(field => {
                const currValue = bindings[component][field];
                switch (field) {
                    case 'onClick':
                        selectorFn(selector).onClick(currValue);
                        break;
                    case 'onMouseIn':
                        selectorFn(selector).onMouseIn(currValue);
                        break;
                    case 'text':
                        autorun(() => {
                            selectorFn(selector).text = currValue(index);
                        });
                        break;
                    case 'backgroundColor':
                        autorun(() => {
                            selectorFn(selector).style.backgroundColor = `${currValue(index)}`;
                        })
                        break;
                    //case 'changeState':

                    case 'events':
                        //curValue = events
                        autorun(() => {
                            Object.keys(currValue).forEach(event => {
                                selectorFn(selector).on(`${event}`, currValue[event]);
                            });
                        });
                        break;
                    case 'hidden':
                        autorun(() => {
                            if (currValue(index)) {
                                selectorFn(selector).hide()
                            } else {
                                selectorFn(selector).show()
                            }
                        });
                        break;
                    case 'state':
                        autorun( () => {
                            selectorFn(selector).changeState(currValue(index));
                        });
                        break;
                    default:
                        break;
                }

            });
        });

    });
}
export function bindRepeaters(bindings) {
    $w.onReady(() => {
        Object.keys(bindings).forEach(repeater => {
            const fields = Object.keys(bindings[repeater]);
            const selector = repeater.startsWith('#') ? repeater : `#${repeater}`;
            fields.forEach(async field => {
                const currValue = bindings[repeater][field];
                switch (field) {
                    case 'data':
                        autorun(async () => {
                            const data = await currValue();
                            const dataJS = toJS(data);
                            $w(selector).data = dataJS;
                        });
                        break;
                    case 'item':
                        autorun(() => {
                            //curr value = item
                            $w(selector).onItemReady(($item, itemData, index) => {
                                bindView(currValue, { selectorFn: $item, index });
                            });
                        })
                        break;
                    default:
                        break;
                }

            });
        });

    });
}

export function useEffect(fn) {
    autorun(() => {
        fn();
    });
}