import React from "react";
import { Button, Box, Collapse } from "@material-ui/core";
import ListNews from "./ListNews";
import { HttpRequest } from "../../util/helper";
import FormDataNews, { defaultValues } from "./FormDataNews";

export default function News() {
  const [isCollapse, setIsCollapse] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState({});
  const [total, setTotal] = React.useState(0);
  const [news, setNews] = React.useState([]);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
    setInitialValues(defaultValues);
  };
  const fetchData = async (page, limit) => {
    const { data } = await HttpRequest.getList(
      `/news?page=${page}&limit=${limit}`
    );
    setTotal(data.count);
    setNews(data);
  };
  React.useEffect(() => {
    fetchData(1, 10);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      setNews(news.filter((item) => Number(item.id) !== Number(id)));
    }
  };

  const handleSubmit = async (values) => {
    if (values.id) {
      const { data } = await HttpRequest.update("/news", values.id, values);
      setNews(
        news.map((item) => {
          if (Number(item.id) === Number(values.id)) {
            return data;
          }
          return item;
        })
      );
    } else {
      const { data } = await HttpRequest.create("/news", values);
      setNews([...news, data]);
    }
  };
  const handleCloseForm = () => {
    setIsCollapse(false);
    setInitialValues(defaultValues);
  };

  const handleFillData = (values) => {
    setInitialValues(values);
    setIsCollapse(true);
  };

  const handleChangePage = (page, perPage) => {
    fetchData(page + 1, perPage);
  };
  return (
    <Box>
      <Collapse in={isCollapse} align="center">
        <FormDataNews
          onSubmit={handleSubmit}
          initialValues={initialValues}
          onClose={handleCloseForm}
        />
      </Collapse>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: 15 }}
        onClick={handleCollapse}
      >
        {!isCollapse ? "Thêm Tin Tức" : "Đóng"}
      </Button>
      <ListNews
        news={news}
        onDelete={handleDelete}
        onFillData={handleFillData}
        total={total}
        onChangePage={handleChangePage}
      />
    </Box>
  );
}
