import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Controller, useFormContext } from "react-hook-form";

export const FormTextArea = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="Minimum 3 rows"
          style={{ width: 200 }}
        />
        // <TextField
        //   helperText={error ? error.message : null}
        //   size="small"
        //   error={!!error}
        //   onChange={onChange}
        //   value={value}
        //   fullWidth
        //   label={label}
        //   variant="outlined"
        // />
      )}
    />
  );
};
