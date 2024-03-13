import { ITextFieldProps } from "@fluentui/react";

export default interface ICustomTextFieldProps extends ITextFieldProps {
    id: string;
    placeholder: string;
    formik: any;
    SubFormik?: any;
    changeHandler?: any;
    otherProps?: any;
}