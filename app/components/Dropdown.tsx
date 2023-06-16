import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function Dropdown({ onSelectChange }: any) {
  const handleChange = (event: SelectChangeEvent) => {
    onSelectChange(event.target.value);
  };
  const menuItem = ["all", "cafe", "bar"];

  return (
    <>
      <div className="p-6">
        <FormControl sx={{ minWidth: "100%" }} variant="outlined">
          <InputLabel id="select-item">Item Type</InputLabel>
          <Select
            labelId="select-item"
            id="select-item"
            label="Item Type"
            onChange={handleChange}
            defaultValue="all"
          >
            {menuItem.map((item,index) => (
              <MenuItem key={index} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default Dropdown;
