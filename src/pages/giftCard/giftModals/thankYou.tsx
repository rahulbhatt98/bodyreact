import {
    makeStyles, Modal, Fade,
    Backdrop, Typography, Divider
} from '@material-ui/core';
import CustomButton from '../../../components/common/button';
import Utils from '../../../utils';


interface Props {
    open: boolean;
    handleClose: () => void;
    message: string
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: "blur(5px)",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        outline: "none",
        // padding: theme.spacing(1.5, 1.5),
        display: "block",
        alignItems: "center",
        borderRadius: '3px',
        maxWidth: '500px',
        [theme.breakpoints.down("sm")]: {
            margin: '20px',
            padding: theme.spacing(1.5, 1.5),

        }

    },
    innerContainer: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(3.6, 2.6, 2.4, 2.6),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 2),
        }
    },
    // heading: {
    //     font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(2.6)}px Work Sans`,
    //     lineHeight: "30px",
    //     textAlign: 'center',
    //     marginTop: '33px',

    // },
    description: {
        font: `normal 500 ${theme.spacing(1.6)}px Work Sans`,
        lineHeight: "24px",
        color: '#333333',
        textAlign: 'center',
        marginTop: '33px',
        marginBottom: '40px',
        padding: theme.spacing(0, 4)
    },

    closeIcon: {
        float: 'right',
        cursor: "pointer"
    },
    divider: {
        marginBottom: '10px',

    },
    btn: {
        borderRadius:"4px",
        font: `normal 500 ${theme.spacing(1.4)}px Work Sans !important`,
        lineHeight: "16px",
        color: "#FFFFFF"
    },
    imageContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    img: {
        width: "80px",
        height: "80px"
    }


}))
const ThankYouModal = (props: Props) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <div className={classes.paper}>
                    {/* <img className={classes.closeIcon} src={Utils.images.CROSS} onClick={props.handleClose} /> */}
                    <div className={classes.innerContainer}>
                        <div className={classes.imageContainer}>
                            <img className={classes.img} src={Utils.images.SUCCESS} alt="success" />
                        </div>
                        <Typography variant="h4" className={classes.description}>
                            {props.message || ''}
                        </Typography>
                        <Divider light className={classes.divider} />

                        <CustomButton
                            type="submit"
                            color="primary"
                            fullWidth
                            variant="contained"
                            text={"Ok"}
                            className={classes.btn}
                            onClick={props.handleClose}
                        />
                    </div>
                </div>
            </Fade >
        </Modal >
    )
}

export default ThankYouModal
