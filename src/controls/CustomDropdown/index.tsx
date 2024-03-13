import * as React from "react";
import { Dropdown, IDropdownOption, TooltipHost } from "@fluentui/react";
import { ICustomDropdownProps } from "./ICustomDropdownProps";
import CustomTextField from "../CustomTextField";
import * as _ from 'lodash';


const CustomDropdown: React.FC<any> = (props:ICustomDropdownProps) => {
  const { id, placeholder, options, formik, changeHandler,multiSelect, readOnly, ...otherprop } = props;

  const handleSingleDropdownChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined
  ) => {
    formik.setFieldValue(id, item?.key);
  };

  const handleMultipleDropdownChange = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ) => {
    if (item) {
      const index = formik.values[id].indexOf("" + item.key);
      const newSelectedItems =
        index !== -1
          ? formik.values[id].filter((i: string) => i !== item.key)
          : [...formik.values[id], item.key];
//Need to make sure sorting
      formik.setFieldValue(id, _.sortBy(newSelectedItems));
    }
  };
  const getMultiselectValue = () => {
    const value = formik.values[id];
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  };

  return (
    (!readOnly)?
    <TooltipHost content={getMultiselectValue()} styles={{root:{width:"60%"}}}>
     <Dropdown
      className="globalTextFieldV1"
      id={id}
      selectedKey={formik.values[id]}
      selectedKeys={multiSelect?formik.values[id]:undefined}
      placeholder={placeholder}
      onChange={(changeHandler)?changeHandler:(!multiSelect)?handleSingleDropdownChange:handleMultipleDropdownChange}
      options={options}
      multiSelect={multiSelect}
      style={{color:"black"}}
      errorMessage={
        formik.touched[id] && formik.errors[id] ? formik.errors[id] : undefined
      }
      {...otherprop}
    /> </TooltipHost>
    :<CustomTextField         style={{color:"black"}} id={id} placeholder={placeholder} formik={formik} readOnly {...otherprop}/>
  );
};

export default CustomDropdown;
