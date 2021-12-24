import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Collapse,
  Grid,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { URL_API } from "../../config";

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

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function Products() {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  const fetchData = async () => {
    const { data } = await axios.get(`${URL_API}/products`);
    setProducts(data);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  const [isCollapse, setIsCollapse] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  return (
    <Box>
      <Collapse in={isCollapse} align="center">
        <Card>
          <Grid container md spacing={5} style={{ marginTop: 15 }}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Tên Xe" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Hình Ảnh Xe" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Hãng Xe" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Số Lượng" type="number" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Giá" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Hộp Số" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Công Suất" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Nhiên Liệu" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Số Chỗ Ngồi" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Giải Trí" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Loại Động Cơ" variant="outlined" fullWidth />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="textprimary"
            style={{ margin: 10 }}
          >
            Thêm Sản Phẩm
          </Button>
        </Card>
      </Collapse>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: 15 }}
        onClick={handleCollapse}
      >
        {!isCollapse ? "Thêm Sản Phẩm" : "Đóng"}
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>STT</StyledTableCell>
              <StyledTableCell>Tên Sản Phẩm</StyledTableCell>
              <StyledTableCell align="center">Hình Ảnh</StyledTableCell>
              <StyledTableCell align="center">Hãng Xe</StyledTableCell>
              <StyledTableCell align="center">Số Lượng</StyledTableCell>
              <StyledTableCell align="center">Giá</StyledTableCell>
              <StyledTableCell align="center">Hộp Số</StyledTableCell>
              <StyledTableCell align="center">Công Suất</StyledTableCell>
              <StyledTableCell align="center">Nhiên Liệu</StyledTableCell>
              <StyledTableCell align="center">Số Chỗ Ngồi</StyledTableCell>
              <StyledTableCell align="center">Giải Trí</StyledTableCell>
              <StyledTableCell align="center">Loại Động Cơ</StyledTableCell>
              <StyledTableCell align="center">Hành Động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? products.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : products
            ).map((product, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <img width={50} height={40} src={product.img} alt="" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.brand}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.quantity}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.price}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.hopSo}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.congSuat}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.nhienLieu}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.soChoNgoi}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.giaiTri}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.loaiDongCo}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="text primary button group"
                  >
                    <Button>Sửa</Button>
                    <Button>Xóa</Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                //   ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
