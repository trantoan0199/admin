import React from "react";

export default function Dialog({open, Transition, handleClose}) {
  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Thông Tin Của Khách Hàng Mua Xe
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box>
              <img alt="" src="" height={50} width={50} />
              <Grid container md>
                <Grid item>
                  <Typography variant="h6">Tên Khách hàng: ${}</Typography>
                  <Typography variant="h6">Số điện thoại: ${}</Typography>
                  <Typography variant="h6">Email: ${}</Typography>
                  <Typography variant="h6">Tên xe: ${}</Typography>
                  <Typography variant="h6">Giá xe: ${}</Typography>
                  <Typography variant="h6">Địa chỉ: ${}</Typography>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
