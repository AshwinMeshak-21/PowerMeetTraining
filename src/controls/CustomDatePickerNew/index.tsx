import * as React from "react";
import { DatePicker, TextField } from "@fluentui/react";
import { format } from "date-fns";

export default function CustomDatePicker(props: any) {
  const { id,disabled,readOnly, placeholder, options, formik, changeHandler, multiSelect, ...otherprop } =
    props;
    const neutralizeTimezoneToLocalDateString = (localDateObj: Date | null|undefined) => {
      if (!localDateObj) {
        return null; // Handle null values
      }
      const year = localDateObj.getFullYear();
      const month = ("0" + (localDateObj.getMonth() + 1)).slice(-2); // Months are 0-11, add 1 and prefix with 0 if needed
      const date = ("0" + localDateObj.getDate()).slice(-2); // Prefix with 0 if needed
    
      return new Date(`${year}-${month}-${date}T00:00:00Z`);
    };

    
  const handleDateChange = (id: string, date: Date | null | undefined) => {

     let dd= neutralizeTimezoneToLocalDateString(date);
    // console.log("dd",dd); 
    // console.log("DATE",date);
    formik.setFieldValue(id,dd);
    };

  return (
    (!readOnly)?
    <DatePicker 
      allowTextInput={true}
      style={{color:"black",width:"100%"}}
      styles={{root:{color:"black"}}}
      placeholder={placeholder}
      disabled={disabled}
      formatDate={(date: Date | null | undefined) =>
        date ? format(date, "MM/dd/yyyy") : ""
      }
      id={id}
      value={formik.values[id]}
      onSelectDate={(date: Date | null | undefined) =>
        handleDateChange(id, date)
      }
      {...otherprop}
    />:<TextField    disabled value={
      formik.values[id] ? format(formik.values[id], "MM/dd/yyyy") : " "
    }  style={{color:"black",width:"100%"}} id={id}   readOnly {...otherprop}/>
  );
}