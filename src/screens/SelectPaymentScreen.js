import React, { useContext} from 'react';
import { Box, Typography, CardMedia,
    Card, CardActionArea, CardContent} from '@material-ui/core';

import {useStyles} from '../styles';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { setPaymentType } from '../actions';
import {Store} from '../Store';

function SelectPaymentScreen(props) {
    const {dispatch} = useContext(Store);
    const styles = useStyles();

    const selectHandler = (paymentType) => {
        setPaymentType(dispatch, paymentType);
        if(paymentType === 'Pay here'){
            props.history.push('/payment');
        }else{
            props.history.push('/complete');
        }
    }


    return (
        <Box className={[styles.root, styles.navy]}>
            <Box className={[styles.main, styles.center]}>
                <FastfoodIcon sx={{fontSize : 120, color: '#ffb049', marginBottom: 3}}></FastfoodIcon>
                <Typography
                    className={styles.center}
                    gutterBottom
                    variant="h3"
                    component="h3"
                    style={{marginBottom:"25px"}}
                >
                    Select payment type
                </Typography>
            
                <Box className={styles.cards}>
                    <Card className={[styles.card, styles.space]}>
                        <CardActionArea onClick={()=> selectHandler('Pay here')}>
                            <CardMedia
                                component="img"
                                alt="Pay here"
                                image="/images/payhere.png"
                                className={styles.media}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    className={styles.card_text}
                                >
                                    PAY HERE
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className={[styles.card, styles.space]}>
                        <CardActionArea onClick={()=> selectHandler('At counter')}>
                            <CardMedia
                                component="img"
                                alt="At counter"
                                image="/images/atcounter.png"
                                className={styles.media}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    className={styles.card_text}
                                >
                                    AT COUNTER
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Box>
        </Box> 
    )
}

export default SelectPaymentScreen
