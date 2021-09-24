import React, {useContext} from 'react'
import {Box, Fade, Typography, CardActionArea, Card, CardMedia, CardContent} from '@material-ui/core';
import {useStyles} from '../styles';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import {Store} from '../Store'
import { setOrderType } from '../actions';

function ChooseScreen(props) {
    const styles = useStyles();
    const {dispatch} = useContext(Store);

    const chooseHandler = (orderType) => {
        setOrderType(dispatch, orderType);
        props.history.push('./order');
    }
    return (
        <Fade in={true}>
            <Box className={[styles.root, styles.navy]}>
                <Box className={[styles.main, styles.center]}>
                    <FastfoodIcon sx={{fontSize : 120, color: '#ffb049', marginBottom: 3}}></FastfoodIcon>
                    <Typography variant="h3" component="h3" className={styles.center} style={{marginBottom:"25px"}}>
                        Where will you be eating today?
                    </Typography>
                    <Box className={styles.cards}>
                        <Card className={[styles.card, styles.space]}>
                            <CardActionArea onClick={()=>chooseHandler('Eat in')}>
                                <CardMedia
                                        component="img"
                                        alt="Eat in"
                                        image="images/eat-in.png"
                                        className={styles.media}
                                >
                                </CardMedia>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        className={styles.card_text}
                                    >
                                        EAT IN
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className={[styles.card, styles.space]}>
                            <CardActionArea onClick={()=>chooseHandler('Take out')}>
                                <CardMedia
                                        component="img"
                                        alt="Take out"
                                        image="/images/take-away.png"
                                        className={styles.media}
                                >
                                  
                                </CardMedia>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        className={styles.card_text}
                                    >
                                        TAKE OUT
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Fade>
    )
}

export default ChooseScreen
