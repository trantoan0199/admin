import React from 'react'
import { Card, Grid, TextField, Button, Box } from '@material-ui/core'

export const defautValues = {
    brand: '',
    congSuat: '',
    giaiTri: '',
    hopSo: '',
    id: '',
    img: '',
    loaiDongCo: '',
    name: '',
    nhienLieu: '',
    price: '',
    quantity: '',
    soChoNgoi: '',
}

export default function FormData({ onSubmit, initialValues = defautValues, onClose }) {
    const [state, setState] = React.useState(initialValues)

    const handleChange = (key, value) => {
        setState({ ...state, [key]: value })
    }

    const handleSubmit = () => {
        onSubmit && onSubmit(state)
        onClose && onClose()
        setState(defautValues)
    }

    const inputProps = {
        variant: "outlined",
        fullWidth: true
    }

    React.useEffect(() => {
        setState(initialValues)
    }, [initialValues])

    return (
        <div>
            <Card>
                <Grid container md spacing={5} style={{ marginTop: 15 }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Tên Xe"
                            {...inputProps}
                            value={state.name || ''}
                            onChange={({ target: { value } }) => handleChange('name', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Hình Ảnh Xe"
                            {...inputProps}
                            value={state.img || ''}
                            onChange={({ target: { value } }) => handleChange('img', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Hãng Xe"
                            {...inputProps}
                            value={state.brand || ''}
                            onChange={({ target: { value } }) => handleChange('brand', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Số Lượng"
                            type="number"
                            {...inputProps}
                            value={state.quantity || ''}
                            onChange={({ target: { value } }) => handleChange('quantity', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Giá"
                            {...inputProps}
                            value={state.price || ''}
                            onChange={({ target: { value } }) => handleChange('price', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Hộp Số"
                            {...inputProps}
                            value={state.hopSo || ''}
                            onChange={({ target: { value } }) => handleChange('hopSo', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Công Suất"
                            {...inputProps}
                            value={state.congSuat || ''}
                            onChange={({ target: { value } }) => handleChange('congSuat', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Nhiên Liệu"
                            {...inputProps}
                            value={state.nhienLieu || ''}
                            onChange={({ target: { value } }) => handleChange('nhienLieu', value)} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Số Chỗ Ngồi"
                            {...inputProps}
                            value={state.soChoNgoi || ''}
                            onChange={({ target: { value } }) => handleChange('soChoNgoi', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField l
                            abel="Giải Trí"
                            {...inputProps}
                            value={state.giaiTri || ''}
                            onChange={({ target: { value } }) => handleChange('giaiTri', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Loại Động Cơ"
                            {...inputProps}
                            value={state.loaiDongCo || ''}
                            onChange={({ target: { value } }) => handleChange('loaiDongCo', value)}
                        />
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="flex-start" pl={1}>
                    <Button
                        variant="contained"
                        color={state.id ? 'default' : 'primary'}
                        style={{ margin: 10 }}
                        onClick={handleSubmit}
                    >
                        {state.id ? 'Update' : 'Create'}
                    </Button>
                </Box>
            </Card>
        </div>
    )
}
