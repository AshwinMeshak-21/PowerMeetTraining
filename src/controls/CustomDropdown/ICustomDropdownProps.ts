import { IDropdownOption } from "@fluentui/react";

export interface ICustomDropdownProps {
    id: string;
    placeholder: string;
    options: IDropdownOption[];
    formik: any;
    multiSelect?: boolean;
    readOnly?: boolean;
    changeHandler?: (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption | undefined) => void;
}