import * as React from "react";
import { TextField, TooltipHost } from "@fluentui/react";
import ICustomTextFieldProps from "./ICustomTextFieldProps";
import * as _ from "lodash";

const CustomTextField: React.FC<any> = (props:ICustomTextFieldProps) => {
    const { id, placeholder, formik, SubFormik,changeHandler, ...otherprop } = props;
    let formikProps =SubFormik?SubFormik.getFieldProps(id): formik.getFieldProps(id)

    // let values=_.trim(formikProps.value)
    if(changeHandler)
    formikProps.onChange = changeHandler;
  
    let readOnlyProps={}
    if (props.readOnly) {
      readOnlyProps = {
        title: formikProps.value,
        value: (_.isArray(formikProps.value))?_.join(formikProps.value, ", "):formikProps.value,
      };
    }

    
    return (
      <TooltipHost content={SubFormik?_.trim(SubFormik.values[id]):_.trim(formik.values[id])} styles={{root:{width:"60%"}}}>
        <TextField
        id={id}
        {...formikProps}
        className="globalTextFieldV1"
        style={{height:(id==="FSI_Additional_Notes")?"60px":"32px",color:"black"}}
        placeholder={placeholder}
        options={[]}
        // value={values}           
        errorMessage={
          SubFormik?
          (  SubFormik.touched[id] && SubFormik.errors[id] ? SubFormik.errors[id] : undefined)
          :
          (  formik.touched[id] && formik.errors[id] ? formik.errors[id] : undefined)
        }
        {...otherprop}
        {...readOnlyProps}
        />
         </TooltipHost>
    );
    }
export default CustomTextField;
