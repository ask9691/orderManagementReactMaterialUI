import React from "react";
import YesNoSwitchComponent from "./YesNoSwitch";
import Switch from "@mui/material/Switch";

import Typography from "@mui/material/Typography";
import { Controller } from "react-hook-form";
const AccordionCustomHeader = (props) => {
  const { headerName, itemDescription, index, control } = props;
  return (
    <>
      <div style={{ display: "flex", float: "left" }}>
        <div>
          <Typography variant="h6" color={"blue"}>
            {headerName}
          </Typography>
          <Typography variant="subtitle2">{itemDescription}</Typography>{" "}
        </div>
        <div>
          <Controller
            name={`orderItems[${index}].isAdded`}
            control={control}
            defaultValue={true}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                NO
                <Switch
                  defaultChecked
                  onChange={onChange}
                  value={value}
                /> Yes{" "}
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};
export default AccordionCustomHeader;
