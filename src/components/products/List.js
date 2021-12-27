import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  withStyles,
  TableCell,
  TableBody,
  makeStyles,
  TableFooter,
  TablePagination,
  ButtonGroup,
  Button,
  Paper,
} from "@material-ui/core";
import { HttpRequest } from "../../util/helper";

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

export default function List({
  products,
  onDelete,
  onFillData,
  total,
  onChangePage,
}) {
  const classes = useStyles();

  const handleToggleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      const { data } = await HttpRequest.delete("/products", id);
      onDelete && onDelete(data.id);
    }
  };

  const handleToggleEdit = (values) => {
    onFillData && onFillData(values);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onChangePage && onChangePage(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    onChangePage && onChangePage(page, parseInt(event.target.value));
  };

  return (
    <div>
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
              <StyledTableCell align="center">Thao Tác</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
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
                    <Button onClick={() => handleToggleEdit(product)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleToggleDelete(product.id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              count={total}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
