import * as React from "react";
import { Stack } from "office-ui-fabric-react";
import { FormikHelpers, useFormik } from "formik";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  PrimaryButton,
  SelectionMode,
} from "@fluentui/react";
import { getSP } from "../../../../config/pnpjsConfig";
import { DisplayFormikState } from "../FormikDebug";
import CustomTextField from "../../../../controls/CustomTextField";
import CustomDropdown from "../../../../controls/CustomDropdown";
import CustomDatePicker from "../../../../controls/CustomDatePickerNew";
import { useState } from "react";

interface FormData {
  EmployeeName: string;
  EmployeeID: number;
  EmployeeLocation: string;
  EmpJoinDate: any;
}
constdsc-sdc
const CreateRequestComponent: React.FC<any> = ({}) => {
  const [Data, setData] = useState<any>([]);
  const formik = useFormik({
    initialValues: {
      EmployeeName: "",
      EmployeeID: 0,
      EmployeeLocation: "",
      EmpJoinDate: null,
    },
    // validate: (values) => {
    //   const errors: Partial<FormData> = {};
    //   if (!values.EmployeeName) {
    //     errors.EmployeeName = "Employee Name is required";
    //   }
    //   // Add more validation rules as needed
    //   return errors;
    // },
    onSubmit: async (
      values: any,
      { setSubmitting }: FormikHelpers<FormData>
    ) => {
      try {
        const sp = await getSP(); // Assuming getSP() returns a promise
        const dataList = sp.web.lists.getByTitle("DataList");

        if (values.ID) {
          // If ID is present, update the item
          await dataList.items.getById(values.ID).update(values);
          alert("Data updated successfully!");
          await formik.setValues(formik.initialValues);
        } else {
          // If ID is not present, add a new item
          await dataList.items.add(values);
          alert("Data submitted successfully!");
          await formik.setValues(formik.initialValues);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Error submitting data. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });
  const searchResults = async () => {
    try {
      const sp = await getSP();
      let result = await sp.web.lists
        .getByTitle("DataList")
        .select("Title", "Question", "Answer")
        .items();
      console.log("test", result);
      setData(result);
      return result;
    } catch (error) {
      console.error("An error occurred:", error);
      }
  };
  const handleDelete = async () => {
    try {
      const sp = await getSP();
      const list = sp.web.lists.getByTitle("DataList");
      await list.items.getById(+formik.values.ID).delete();
      formik.resetForm();
      alert("Records Deleted successfully");
      await searchResults();
      console.log("Item deleted successfully.");
    } catch (error) {
      console.error("An error occurred while deleting item:", error);
    }
  };

  const initialColumns: IColumn[] = [
    {
      key: "EmployeeName",
      name: "Employee Name",
      fieldName: "EmployeeName",
      minWidth: 120,
      maxWidth: 180,
      isResizable: true,
      styles: { root: { background: "rgba(182, 194, 249, 0.17)" } },
    },
    {
      key: "EmployeeID",
      name: "Employee ID",
      fieldName: "EmployeeID",
      minWidth: 120,
      maxWidth: 150,

      isResizable: true,
      styles: { root: { background: "rgba(182, 194, 249, 0.17)" } },
    },
    {
      key: "EmployeeLocation",
      name: "Employee Location",
      fieldName: "EmployeeLocation",
      minWidth: 130,
      maxWidth: 150,
      isResizable: true,
      styles: { root: { background: "rgba(182, 194, 249, 0.17)" } },
    },
    {
      key: "EmpJoinDate",
      name: "Joining Date",
      fieldName: "EmpJoinDate",
      minWidth: 80,
      maxWidth: 150,
      isResizable: true,
      styles: { root: { background: "rgba(182, 194, 249, 0.17)" } },
    },
  ];
  return (
    <>
      <form
        onSubmit={(event) => {
          formik.handleSubmit(event);
        }}
        style={{ padding: 30 }}
      >
        <h3>Sample Form</h3>
        <Stack horizontal gap={20}>
          <div style={{ width: "25%" }}>
            <label htmlFor="EmployeeName">Employee Name</label>
            <CustomTextField
              id="EmployeeName"
              placeholder={"Enter Name"}
              formik={formik}
            />
          </div>
          <div style={{ width: "25%" }}>
            <label htmlFor="EmployeeID">Employee ID</label>
            <CustomTextField
              id="EmployeeID"
              type="number"
              placeholder={"Enter ID"}
              formik={formik}
            />
          </div>
          <div style={{ width: "25%" }}>
            <label htmlFor="EmployeeLocation">Employee Location</label>
            <CustomDropdown
              id="EmployeeLocation"
              placeholder={"Select Location"}
              options={[{ key: "Chennai", text: "Chennai" },{ key: "Tirunelveli", text: "Tirunelveli" },{ key: "Tisyanvillai", text: "Tisyanvillai" }]}
              formik={formik}
            />
          </div>
          <div style={{ width: "25%" }}>
            <label htmlFor="EmpJoinDate">Joining Date</label>
            <div className="globalDateField">
              <CustomDatePicker
                id="EmpJoinDate"
                placeholder={"Select Data"}
                formik={formik}
              />
              {formik.touched.EmpJoinDate && formik.errors.EmpJoinDate ? (
                <div className="ErrorMessage">{formik.errors.EmpJoinDate}</div>
              ) : null}
            </div>
          </div>
        </Stack>
        <br />
        <Stack horizontal gap={20}>
          <PrimaryButton type="submit">Submit</PrimaryButton>
          <PrimaryButton onClick={searchResults}>Get Records</PrimaryButton>
          <PrimaryButton
            onClick={async () => {
              await formik.setValues(formik.initialValues);
            }}
          >
            Reset
          </PrimaryButton>
          {formik.values.ID && (
            <PrimaryButton onClick={handleDelete}>Delete Record</PrimaryButton>
          )}
        </Stack>
      </form>
      <DetailsList
        usePageCache={true}
        onShouldVirtualize={() => false}
        items={Data}
        //columns={columns}
        columns={initialColumns}
        selectionMode={SelectionMode.none}
        onItemInvoked={async (item) => {
          await formik.setValues({
            EmployeeName: item.EmployeeName,
            EmployeeID: item.EmployeeID,
            EmployeeLocation: item.EmployeeLocation,
            EmpJoinDate: item.EmpJoinDate?new Date(item.EmpJoinDate):null,
            ID: item.Id,
          });
        }}
        layoutMode={DetailsListLayoutMode.justified}
        compact={false}
      />
      {<DisplayFormikState {...formik} />}
    </>
  );
};

export default CreateRequestComponent;
