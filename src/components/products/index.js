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
  const [isCollapse, setIsCollapse] = React.useState(false);

  const [initialValues, setInitialValues] = React.useState({})

  const fetchData = async () => {
    const { data } = await HttpRequest.getList('/products')
    setProducts(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);


  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
    setInitialValues(defautValues)
  };

  const handleDelete = (id) => {
    setProducts(products.filter(item => Number(item.id) !== Number(id)))
  }

  const handleCreate = async (values) => {
    const { data } = await HttpRequest.create('/products', values)
    setProducts([...products, data])
  }

  const handleCloseForm = () => {
    setIsCollapse(false)
    setInitialValues(defautValues)
  }

  const handleFillData = (values) => {
    setInitialValues(values)
    setIsCollapse(true)
  }

  return (
    <Box>
      <Collapse in={isCollapse} align="center">
        <FormData onSubmit={handleCreate} initialValues={initialValues} onClose={handleCloseForm} />
      </Collapse>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 15 }}
        onClick={handleCollapse}
      >
        {!isCollapse ? "Thêm Sản Phẩm" : "Đóng"}
      </Button>
      <List products={products} onDelete={handleDelete} onFillData={handleFillData} />
    </Box>
  );
}
