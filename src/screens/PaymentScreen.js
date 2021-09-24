import React from 'react'
import { Box, Typography, CircularProgress, Button } from '@material-ui/core';
import {useStyles} from '../styles';
import FastfoodIcon from '@mui/icons-material/Fastfood';

function PaymentScreen(props) {
    const styles = useStyles();
    return (
        <Box className={[styles.root, styles.navy]}>
            <Box className={[styles.main, styles.center]}>
                <Box>
                    <FastfoodIcon sx={{fontSize : 120, color: '#ffb049', marginBottom: 3}}></FastfoodIcon>
                    <Typography
                        className={styles.title}
                        gutterBottom
                        variant="h3"
                        component="h3"
                        style={{margin:"0 20px 0 20px"}}
                    >
                        Please follow the instruction on the PIN pad
                    </Typography>
                    <CircularProgress />
                </Box>
            </Box>
            <Box className={[styles.center, styles.space]}>
                <Button
                    onClick={()=>props.history.push('/complete')}
                    variant="contained"
                    color="primary"
                    className={styles.largeButton}
                >
                    Complete Order
                </Button>
            </Box>
        </Box>
    )
}

export default PaymentScreen
