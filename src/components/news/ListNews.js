import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  withStyles,
  Paper,
  ButtonGroup,
  Button,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
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
    minWidth: 650,
  },
});

export default function ListNews({
  news,
  onDelete,
  onFillData,
  total,
  onChangePage,
}) {
  const classes = useStyles();

  const handleToggleDelete = async (id) => {
    const { data } = await HttpRequest.delete("/news", id);
    onDelete && onDelete(data.id);
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
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Hình Ảnh</StyledTableCell>
              <StyledTableCell align="right">Tiêu Đề</StyledTableCell>
              <StyledTableCell align="right">Ngày Đăng Tin</StyledTableCell>
              <StyledTableCell align="right">Nội Dung</StyledTableCell>
              <StyledTableCell align="center">Hành Động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((elm, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <img width={50} height={40} src={elm.img} alt="" />
                </StyledTableCell>
                <StyledTableCell align="right">{elm.title}</StyledTableCell>
                <StyledTableCell align="right">{elm.date}</StyledTableCell>
                <StyledTableCell align="right">
                  {elm.description}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="text primary button group"
                  >
                    <Button onClick={() => handleToggleEdit(elm)}>Sửa</Button>
                    <Button onClick={() => handleToggleDelete(elm.id)}>
                      Xóa
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <TablePagination
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      </TableContainer>
    </div>
  );
}
