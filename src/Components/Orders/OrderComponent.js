import React, { useState } from "react";
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
import Button from '@mui/material/Button';
import Moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Container from '@mui/material/Container';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const OrderComponent = () => {
  const [dataStore, setDataStore] = useState({
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
  const [tableData, setTableData] = useState(dataStore.response);
  const commonStyles = {
    bgcolor: "background.paper",
    m: 1,
    border: 1,
    // width: '2rem',
    // height: '1rem',
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
        setTableData(dataStore.response);
    }
  };
  return (
    <>
      <MenuBar />
      <Container maxWidth="lg">
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
                  <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
                      <TableCell>Counts Of ITem Included in Order</TableCell>
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
            <Button variant="contained">Create New Order</Button>
          </Grid>
        </Grid>
      </Box>
      </Container>
    </>
  );
};

export default OrderComponent;
