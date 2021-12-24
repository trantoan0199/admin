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
  ButtonGroup,
  Button,
  Box,
  TextField,
  Grid,
  Collapse,
  Card,
} from "@material-ui/core";
import { URL_API } from "../../config";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function News() {
  const [isCollapse, setIsCollapse] = React.useState(false);
  const classes = useStyles();
  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  const [news, setNews] = React.useState([]);
  const fetchData = async () => {
    const { data } = await axios.get(`${URL_API}/news`);
    setNews(data);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box>
      <Collapse in={isCollapse} align="center">
        <Card>
          <Grid container md spacing={5} style={{ marginTop: 15 }}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Tiêu Đề" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Hình Ảnh Xe" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField label="Ngày Đăng Tin" type="date" defaultValue="2021-12-29" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField label="Nội Dung" variant="outlined" fullWidth />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="textprimary"
            style={{ margin: 10 }}
          >
            Thêm Tin Mới
          </Button>
        </Card>
      </Collapse>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: 15 }}
        onClick={handleCollapse}
      >
        {!isCollapse ? "Thêm Tin Tức" : "Đóng"}
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell align="right">Tiêu Đề</TableCell>
              <TableCell align="right">Ngày Đăng Tin</TableCell>
              <TableCell align="right">Nội Dung</TableCell>
              <TableCell align="center">Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((elm, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                <img width={50} height={40} src={elm.img} alt="" />
                </TableCell>
                <TableCell align="right">{elm.title}</TableCell>
                <TableCell align="right">{elm.date}</TableCell>
                <TableCell align="right">{elm.description}</TableCell>
                <TableCell align="center">
                  <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="text primary button group"
                  >
                    <Button>Sửa</Button>
                    <Button>Xóa</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
