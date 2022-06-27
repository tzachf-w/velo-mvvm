declare namespace $w {
    interface Button{
        //onClick(handler: any): void;
        /**
         * Adds an event handler that runs when the element is double-clicked.
         * 	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onDblClick)
         *  @eventType dblClick
         */
        label: string;
    }

    interface Checkbox {
        checked: boolean
    }
    interface Repeater {
        data: Array<any>
    }
}
