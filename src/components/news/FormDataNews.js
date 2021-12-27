import { Button, Card, Grid, TextField } from "@material-ui/core";
import React from "react";

export const defaultValues = {
  title: "",
  date: "",
  description: "",
  img: "",
};

export default function FormDataNews({
  onSubmit,
  initialValues = defaultValues,
  onClose,
}) {
  const [state, setState] = React.useState(initialValues);

  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(state);
    onClose && onClose();
    setState(defaultValues);
  };

  React.useEffect(() => {
    setState(initialValues);
  }, [initialValues]);

  return (
    <div>
      <Card>
        <Grid container md spacing={5} style={{ marginTop: 15 }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Tiêu Đề"
              variant="outlined"
              fullWidth
              value={state.title || ""}
              onChange={({ target: { value } }) => handleChange("title", value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Hình Ảnh Xe"
              variant="outlined"
              fullWidth
              value={state.img || ""}
              onChange={({ target: { value } }) => handleChange("img", value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Ngày Đăng Tin"
              type="date"
              defaultValue="2021-12-29"
              variant="outlined"
              fullWidth
              value={state.date || ""}
              onChange={({ target: { value } }) => handleChange("date", value)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Nội Dung"
              variant="outlined"
              fullWidth
              value={state.description || ""}
              onChange={({ target: { value } }) =>
                handleChange("description", value)
              }
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="textprimary"
          style={{ margin: 10 }}
          onClick={handleSubmit}
        >
          {state.id ? "Cập nhật tin tức" : "Thêm Tin Mới"}
        </Button>
      </Card>
    </div>
  );
}
