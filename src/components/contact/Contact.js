import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import axios from "axios";
import { URL_API } from "../../config";
import { useParams } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Contact() {
  const classes = useStyles();
  const [Contact, setContact] = React.useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(`${URL_API}/contacts`);
    setContact(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const data = axios.delete(`${URL_API}/contacts/${id}`);
    Contact.filter((elm) => data.id !== elm.id);
    console.log(Contact, "hahaha");
    setContact(Contact);
    console.log(Contact, "hhuhuhu");

  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Tên Khách Hàng</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Nội Dung</StyledTableCell>
            <StyledTableCell align="center">Hành Động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Contact.map((contact, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {contact.name}
              </StyledTableCell>
              <StyledTableCell align="right">{contact.email}</StyledTableCell>
              <StyledTableCell align="right">
                {contact.description}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(contact.id)}
                >
                  Xóa
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
