import {makeStyles} from '@material-ui/core';


export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    red: {
        backgroundColor: '#d52027',
        color: '#f8eee3',
        textAlign: 'center',
        padding: 30 
    },
    column: { flexDirection: 'column' },
    
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },

    main: {
        flex: 1,
        overflow: 'auto',
        flexDirection: 'column',
        display: 'flex',
        color: '#1e4558',
    },


    yellow: {
        backgroundColor: '#ffb049'
    },
    navy: {
        backgroundColor: '#1e4558'
    },
    cards: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        margin: 10, 
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    space: {
        padding: 10,
    },
    media: {
        width: 200,
        margin: 'auto',
        
    },
    card_text: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    largeButton: {
        width: 250,
    },
    largeInput: {
        width: '60px!important',
        padding: '0!important',
        fontSize: '35px!important',
        textAlign: 'center!important',
      },
    bordered: {
        borderWidth: 2,
        borderRadius: 5,
        margin: 5,
        borderStyle: 'solid',
    },
    row: {
        
        display: 'flex',
        padding: 10,
    },
    around: {
        justifyContent: 'space-around',
    },
    between: {
        justifyContent: 'space-between',
    },

    order_grid: {
        marginRight: '5px',
    },

}))
