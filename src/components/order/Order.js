import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  Dialog,
  Slide,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { HttpRequest } from "../../util/helper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Order() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  const fetchData = async () => {
    const { data } = await HttpRequest.getList(`/orders`);
    setOrders(data);
    orders.map((order) => {
      const { product } = HttpRequest.getList(`/products/${order.productId}`);
      console.log(product);
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hình Ảnh Xe</TableCell>
            <TableCell align="center">Giá Xe</TableCell>
            <TableCell align="center">Tên Khách Hàng</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Số Điện Thoại</TableCell>
            <TableCell align="center">Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <img alt={row.name} src="" width={50} height={40} />
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.cmnd}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.productId}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Xem
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} TransitionComponent={Transition} onClose={handleClose} onClick={handleClose}/>
    </TableContainer>
  );
}
