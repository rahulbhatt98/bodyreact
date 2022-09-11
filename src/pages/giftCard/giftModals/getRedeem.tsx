import ContainedButton from '../../../components/containedButton'
import {
    makeStyles, Modal, Fade,
    Backdrop, Typography, Divider
} from '@material-ui/core';
import Utils from '../../../utils';


interface Props {
    open: boolean;
    handleClose: () => void;
    amount:number;
    // expiryDate:string | null
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
        padding: theme.spacing(2, 2, 2, 2),
        display: "block",
        alignItems: "center",
        borderRadius: '3px',
        width: '400px',
        margin:"10px",
        [theme.breakpoints.down("sm")]:{
            width: '95%',
            borderRadius: '12px',
        }
    },
    innerContainer: {

        // justifyContent: "center",
        padding: theme.spacing(1, 0, 0, 0)
    },
    heading: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(2.4)}px Work Sans`,
        lineHeight: "28.8px",
        textAlign: 'center',
        marginBottom: '32px',

    },
    placeholder: {
        font: `bold ${theme.typography.fontWeightRegular} ${theme.spacing(4.0)}px Work Sans !important`,
        lineHeight: "46.92px",
        color: '#333333',
        textAlign: 'center',
        fontSize: '40px',
        fontFamily: 'Work Sans',
        marginBottom: '16px',

    },
    balance: {
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(1.4)}px Work Sans`,
        lineHeight: "16px",
        color: '#333333',
        textAlign: 'center',
        fontFamily: 'Work Sans',

    },
    formContainer: {
        width: '100%',
        marginBottom: '10px',
        "& .MuiFormGroup-root": {
            "& .formLabel": {
                height: '0px',
            }
        }
    },


    divider: {
        margin: theme.spacing(3, 0)
    },
    buttonContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        "& .MuiButton-root": {
            width: '100%',
        }
    },


}))
const GetRedeem = (props: Props) => {
    const classes = useStyles()




    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            // open={state.openModal}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <div className={classes.paper}>
                    <div>
                        <div className={classes.innerContainer}>
                            <Typography variant="h4" className={classes.heading}>
                                Redeem Balance
                            </Typography>
                        </div>

                        <div className={classes.formContainer}>
                            <Typography variant="h4" className={classes.placeholder}>
                                ₹ {Utils.CommonFunctions.addCommaToAmount(props?.amount)||0}
                            </Typography>
                            <Typography variant="h4" className={classes.balance}>
                                Available Balance
                            </Typography>

                        </div>

                        <Divider light className={classes.divider} />
                        <div className={classes.buttonContainer}>
                            <ContainedButton text={"Ok"} onClick={props.handleClose} />
                        </div>
                    </div>
                </div>
            </Fade >
        </Modal >
    )
}

export default GetRedeem
