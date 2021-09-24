import React from 'react';
import {Card, CardActionArea, Box, Typography} from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import {useStyles} from '../styles';

function HomeScreen(props) {
    const styles = useStyles();
    return (
        <Card>
            <CardActionArea onClick={()=> props.history.push('/choose')}>
                <Box className={[styles.root, styles.yellow]}>
                    <Box className={[styles.main, styles.center]}>
                        <Typography component="h6" variant="h6">
                            Fast & Easy
                        </Typography>
                        <Typography component="h1" variant="h1">
                            Order <br /> & Pay <br/> here
                        </Typography>
                        <TouchAppIcon fontSize="large"></TouchAppIcon>
                    </Box>
                    <Box className={styles.red}>
                        <FastfoodIcon sx={{fontSize : 100, color: '#f8eee3'}}></FastfoodIcon>
                        <Typography component="h5" variant="h5">
                            Touch to start
                        </Typography>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}

export default HomeScreen




