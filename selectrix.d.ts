declare module "react-selectrix" {
  class Selectrix extends React.Component<SelectrixProps> {}

  interface SelectrixProps {
    ajax?: boolean | object;
    arrow?: boolean;
    checkBoxes?: boolean;
    className?: string;
    commaSeperated?: boolean;
    customKeys?: boolean | SelectrixOption | SelectrixOption[];
    customScrollbar?: boolean;
    defaultValue?: boolean | string | SelectrixOption[];
    disabled?: boolean;
    height?: number;
    id?: string;
    initialized?: boolean;
    isDropDown?: boolean;
    isOpen?: boolean;
    lifo?: boolean;
    materialize?: boolean;
    multiple?: boolean;
    onChange?: Function;
    onAppendTag?: Function;
    appendTagPrompt?: string;
    onClose?: Function;
    onOpen?: Function;
    onRenderOption?: boolean | Function;
    onRenderSelection?: boolean | Function;
    options?: SelectrixOption[];
    placeHolderInside?: boolean;
    placeholder?: string;
    searchBoxInside?: boolean;
    searchable?: boolean;
    selectAllButton?: boolean;
    singleLine?: boolean;
    stayOpen?: boolean;
    tags?: boolean;
    updateInstance?: Function;
  }

  interface SelectrixOption {
    key: string;
    label: string;
    disabled?: boolean;
  }

  export default Selectrix;
}
