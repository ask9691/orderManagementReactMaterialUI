import React, { useState, createContext, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuBar from "../Common/MenuBar";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListSubheader from "@mui/material/ListSubheader";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import "./OrderComponent.css";
import YesNoSwitchComponent from "../Common/YesNoSwitch";
import AccordionCustomHeader from "../Common/AccordionCustomHeader";
import SwitchChangeEventContext from "./SwitchChangeEventContext";
import { green, red, blue } from "@mui/material/colors";
import ButtonGroup from "@mui/material/ButtonGroup";
import Switch from "@mui/material/Switch";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const OrderComponent = () => {
  //#region 

  //#endregion
  //#region 
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      orderDescription: "This is my order",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderItems",
  });
  //#endregion
  //#region 
  const [showCreateNewOrder, setShowCreateNewOrder] = useState(true);
  const [checked, setChecked] = useState([1, 2]);
  const [counter, setCounter] = useState(1);
  const displayCounter = counter;
  const switchChangeEventHandle = (a, switchComponentId) => {
    console.log(a, switchComponentId);
  };
  const contextValue = { switchChangeEventHandle };
  const [orders, setOrders] = useState({
    response: [
      {
        id: 1,
        orderDescription: "Order for Customer 1",
        countOfItemTypes: { Electronics: 2, Groceries: 2 },
        createdBy: "Ajeet kumar",
        createdAt: "2022-04-26T07:03:12.892Z",
      },
      {
        id: 2,
        orderDescription: "Order for Self",
        countOfItemTypes: { Electronics: 0, Groceries: 2 },
        createdBy: "Sujeet kumar",
        createdAt: "2022-04-26T07:03:12.892Z",
      },
      {
        id: 3,
        orderDescription: "Order for Customer 2",
        countOfItemTypes: { Electronics: 1, Groceries: 0 },
        createdBy: "Manjeet kumar",
        createdAt: "2022-04-26T07:03:12.892Z",
      },
    ],
  });
  const [orderData, setOrderData] = useState({});
  
  const [createNewOrderData, SetCreateNewOrderData] = useState({
    itemTypes: [
      {
        id: 1,
        itemTypeName: "Electronics",
      },
      {
        id: 2,
        itemTypeName: "Groceries",
      },
    ],
    allItems: [
      {
        _id: 1,
        itemTypeId: 1,
        itemName: "iPhone 13 Max Pro",
        temDescription: "This is iPhone",
        itemSpecifications: {
          memory: "512 GB",
          colorChoice: true,
          color: "RED",
        },
      },
      {
        _id: 2,
        itemTypeId: 1,
        itemName: "Android phone",
        temDescription: "This is Android phone",
        itemSpecifications: { memory: "512 GB" },
      },
      {
        _id: 3,
        itemTypeId: 2,
        itemName: "Parle G Biscuit 70 gram",
        temDescription: "This is a parle g biscuit of 70 Gram",
        itemSpecifications: null,
      },
      {
        _id: 4,
        itemTypeId: 2,
        itemName: "Rice Packet",
        temDescription: "This is Rice Packet",
        itemSpecifications: { sizeInKG: 1 },
      },
    ],
  });
  const [tableData, setTableData] = useState(orders.response);
  const [expandId, setExpandId] = React.useState(false);
  const greencolor = green[500];
  const redcolor = red[500];
  const bluecolor = blue[500];
  const commonStyles = {
    bgcolor: "background.paper",
    m: 1,
    border: 1,
    // width: '2rem',
    // height: '1rem',
  };
  //#endregion
  //#region 
  const handleIncrement = () => {
    let counterEdit = counter + 1;
    setCounter(counterEdit);
  };

  const handleDecrement = () => {
    let counterEdit = counter - 1;
    setCounter(counterEdit);
  };
  
  //#endregion
  //#region 

  useEffect(() => {
    prepareAndSetOrderData(checked);
    // reset({
    //   orderDescription: "Set on load",
    //   orderItems: createNewOrderData?.allItems,
    // });
  }, []);
  //#endregion
  //#region 
  const onSubmit = (data) => {
    let ele = 0;
    let gros = 0;
    data.orderItems.forEach((el) => {
      console.log(el);
      if (el.isAdded) {
        if (el.itemTypeId == 1) {
          ele = ele + 1;
        } else if (el.itemTypeId == 2) {
          gros = gros + 1;
        }
      }
    });
    let newOrderData = {
      id: orders.response.length + 1,
      orderDescription: data.orderDescription,
      countOfItemTypes: { Electronics: ele, Groceries: gros },
      createdBy: "Ajeet kumar",
      createdAt: Date.now(),
    };
    let newOrders = { ...orders };
    newOrders.response.push(newOrderData);
    setOrders(newOrders);
    setShowCreateNewOrder(false);
  };
  const percentage = (partialValue, totalValue) => {
    return (100 * parseInt(partialValue)) / parseInt(totalValue);
  };
  const onSearchBoxChange = (e) => {
    if (e.target.value !== "") {
      let searchItems = tableData.filter((obj) =>
        obj.orderDescription
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );

      setTableData(searchItems);
    } else {
      setTableData(orders.response);
    }
  };
  const handleNewOrder = () => {
    setShowCreateNewOrder(true);
    setOrderData({
      orderDescription: "Set on load",
      orderItems: createNewOrderData?.allItems,
    });
  };

  const onSwitchClick = (e) => {
    console.log(e);
  };
  const acordionClickHandle = (id) => {
    console.log();
  };
  const prepareAndSetOrderData = (checkedData) => {
    let orderItems = [];
    checkedData.forEach((ele) => {
      createNewOrderData.allItems.forEach((obj) => {
        if (obj.itemTypeId === ele) {
          orderItems.push(obj);
        }
      });
    });
    reset({
      orderDescription: "Set on load",
      orderItems: orderItems,
    });
    setOrderData({
      orderDescription: "Set on load",
      orderItems: orderItems,
    });
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex((obj) => obj === value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    prepareAndSetOrderData(newChecked);

    // reset({
    //   orderDescription: "Set on load",
    //   orderItems: createNewOrderData?.allItems,
    // });
  };
  //#endregion
  
 
  
  
  return (
    <>
      <MenuBar />

      <Container maxWidth="lg">
        {showCreateNewOrder ? (
          <Grid container spacing={2} justifyContent="flex-start">
            <Grid item xs={3}>
              <Item>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  subheader={<ListSubheader>Item Type</ListSubheader>}
                >
                  {createNewOrderData.itemTypes.map((value) => {
                    const labelId = `checkbox-list-label-${value.id}`;

                    return (
                      <ListItem
                        key={value.id}
                        // secondaryAction={
                        //   <IconButton edge="end" aria-label="comments">
                        //     <CommentIcon />
                        //   </IconButton>
                        // }
                        disablePadding
                      >
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(value.id)}
                          dense
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={` ${value.itemTypeName}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Item>
            </Grid>
            <Grid item xs={9}>
              <Item>
                <Box display="flex" justifyContent="flex-start">
                  <h1> Add Item to order</h1>
                </Box>
                <Box display="flex">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                      name="orderDescription"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          label="Order Discription"
                          variant="standard"
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          multiline
                          rows={2}
                          helperText={error ? error.message : null}
                          style={{ width: 500 }}
                        />
                      )}
                      rules={{ required: "Order Discription" }}
                    />
                    {errors.orderDescription && (
                      <span>This field is required</span>
                    )}
                    {fields.map((item, index) => {
                      return (
                        <div key={item._id}>
                          <input
                            type="hidden"
                            name={`orderItems[${index}]._id`}
                            defaultValue={item._id}
                          />
                          <input
                            type="hidden"
                            name={`orderItems[${index}].itemTypeId`}
                            defaultValue={item.itemTypeId}
                          />
                          <Accordion expanded={true} key={item._id}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                            >
                              <SwitchChangeEventContext.Provider
                                value={{
                                  switchChangeEventHandle,
                                  switchComponentId: item._id,
                                }}
                              >
                                <AccordionCustomHeader
                                  did={item._id}
                                  itemDescription={item.temDescription}
                                  headerName={item.itemName}
                                  index={index}
                                  control={control}
                                />
                              </SwitchChangeEventContext.Provider>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  {item.itemSpecifications?.memory && (
                                    <TableRow
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell
                                        size="small"
                                        sx={{ width: "20%" }}
                                      >
                                        Please select memory
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        <Box sx={{ width: "100%" }}>
                                          <Stack spacing={8} direction="row">
                                            <Button variant="text">
                                              128 GB
                                            </Button>
                                            <Button variant="text">
                                              256 GB
                                            </Button>
                                            <Button variant="contained">
                                              512 GB
                                            </Button>
                                            <Button variant="text">
                                              1024 GB
                                            </Button>
                                          </Stack>
                                        </Box>
                                        <Box sx={{ marginTop: "10px" }}>
                                          <LinearProgress
                                            sx={{ width: "450px" }}
                                            variant="determinate"
                                            value={75}
                                          />
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                  {item.itemSpecifications?.colorChoice && (
                                    <TableRow
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell>
                                        Do you want to choose color ?
                                      </TableCell>
                                      <TableCell>
                                        <YesNoSwitchComponent />
                                      </TableCell>
                                    </TableRow>
                                  )}
                                  {item.itemSpecifications?.color && (
                                    <TableRow
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        color
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        <Button
                                          style={{
                                            borderRadius: 35,
                                            backgroundColor: `${greencolor}`,
                                          }}
                                          variant="contained"
                                        >
                                          Green
                                        </Button>
                                        <Button
                                          style={{
                                            borderRadius: 35,
                                            backgroundColor: `${redcolor}`,
                                          }}
                                          variant="contained"
                                        >
                                          Red
                                        </Button>
                                        <Button
                                          style={{
                                            borderRadius: 35,
                                            backgroundColor: `${bluecolor}`,
                                          }}
                                          variant="contained"
                                        >
                                          Blue
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                  {item.itemSpecifications?.sizeInKG && (
                                    <TableRow
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        sizeInKG
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        <ButtonGroup
                                          size="small"
                                          aria-label="small outlined button group"
                                        >
                                          <Button onClick={handleIncrement}>
                                            +
                                          </Button>
                                          {<Button disabled>{counter}</Button>}
                                          {displayCounter > 0 ? (
                                            <Button onClick={handleDecrement}>
                                              -
                                            </Button>
                                          ) : (
                                            <Button disabled>-</Button>
                                          )}
                                        </ButtonGroup>{" "}
                                        KG
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                              <Typography></Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      );
                    })}

                    <div>
                      <Button
                        type="button"
                        variant="text"
                        onClick={() =>
                          setShowCreateNewOrder(!showCreateNewOrder)
                        }
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained">
                        Submit
                      </Button>
                    </div>
                  </form>
                </Box>
              </Item>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      m: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <h1>Order Management Screen</h1>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <SearchIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        id="input-with-sx"
                        label="Search by order description"
                        variant="standard"
                        onChange={(e) => onSearchBoxChange(e)}
                      />
                    </Box>
                  </Box>

                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Order Id</TableCell>
                          <TableCell>Order Description</TableCell>
                          <TableCell>
                            Counts Of ITem Included in Order
                          </TableCell>
                          <TableCell>% of Electronics items</TableCell>
                          <TableCell>Created By</TableCell>
                          <TableCell>Created Date</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              O{row.id}
                            </TableCell>
                            <TableCell>{row.orderDescription}</TableCell>
                            <TableCell style={{ display: "flex" }}>
                              {" "}
                              <Box
                                sx={{
                                  ...commonStyles,
                                  borderColor:
                                    row.countOfItemTypes.Electronics > 0
                                      ? "primary.main"
                                      : "error.main",
                                }}
                              >
                                Electronics {row.countOfItemTypes.Electronics}
                              </Box>
                              <Box
                                sx={{
                                  ...commonStyles,
                                  borderColor:
                                    row.countOfItemTypes.Groceries > 0
                                      ? "primary.main"
                                      : "error.main",
                                }}
                              >
                                Groceries {row.countOfItemTypes.Groceries}
                              </Box>
                            </TableCell>
                            <TableCell>
                              {percentage(
                                row.countOfItemTypes.Electronics,
                                row.countOfItemTypes.Electronics +
                                  row.countOfItemTypes.Groceries
                              )}
                              %
                            </TableCell>
                            <TableCell>{row.createdBy}</TableCell>
                            <TableCell>
                              {Moment(row.createdAt).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell>
                              <EditIcon />
                              <DeleteIcon />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Item>
                <Button variant="contained" onClick={handleNewOrder}>
                  Create New Order
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default OrderComponent;
