import React from "react";
import {
  Box,
  Button,
  Collapse,
} from "@material-ui/core";
import { HttpRequest } from "../../util/helper";
import FormData, { defautValues } from "./FormData";
import List from "./List";

export default function Products() {
  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState(0)
  const [isCollapse, setIsCollapse] = React.useState(false);

  const [initialValues, setInitialValues] = React.useState({})


  const fetchData = async (page, limit) => {
    const { data } = await HttpRequest.getList(`/products?page=${page}&limit=${limit}`)
    setTotal(data.count);
    setProducts(data.data);
  };

  React.useEffect(() => {
    fetchData(1, 10);
  }, []);


  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
    setInitialValues(defautValues)
  };

  const handleDelete = (id) => {
    setProducts(products.filter(item => Number(item.id) !== Number(id)))
  }

  const handleSubmit = async (values) => {
    if (values.id) {
      const { data } = await HttpRequest.update('/products', values.id, values)
      setProducts(products.map(item => {
        if (Number(item.id) === Number(values.id)) {
          return data
        }
        return item
      }))
    } else {
      const { data } = await HttpRequest.create('/products', values)
      setProducts([...products, data])
    }
  }

  const handleCloseForm = () => {
    setIsCollapse(false)
    setInitialValues(defautValues)
  }

  const handleFillData = (values) => {
    setInitialValues(values)
    setIsCollapse(true)
  }

  const handleChangePage = (page, perPage) => {
    fetchData(page+1, perPage)
  }

  return (
    <Box>
      <Collapse in={isCollapse} align="center">
        <FormData onSubmit={handleSubmit} initialValues={initialValues} onClose={handleCloseForm} />
      </Collapse>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 15 }}
        onClick={handleCollapse}
      >
        {!isCollapse ? "Thêm Sản Phẩm" : "Đóng"}
      </Button>
      <List
        products={products}
        onDelete={handleDelete}
        onFillData={handleFillData}
        total={total}
        onChangePage={handleChangePage}
      />
    </Box>
  );
}
