import {
    makeStyles, Modal, Fade,
    Backdrop, Typography, Divider
} from '@material-ui/core';
import CustomButton from '../../../components/common/button';
import clsx from 'clsx';
import Utils from '../../../utils';

interface Props {
    open: boolean;
    handleClose: () => void;
    amount: number;
    expiryDate: string | null;
    status:string
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
        padding: theme.spacing(1, 2, 2, 2),
        display: "block",
        alignItems: "center",
        borderRadius: '3px',
        width: '400px',
        margin:"10px"
    },
    innerContainer: {

        // justifyContent: "center",
        padding: theme.spacing(1, 0, 0, 0)
    },
    heading: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(2.4)}px Work Sans`,
        lineHeight: "29px",
        textAlign: 'center',
        marginBottom: '45px',
        letterSpacing: '0em',

    },
    placeholder: {
        font: `normal 700 ${theme.spacing(3.4)}px Work Sans`,
        lineHeight: "46.92px",
        color: '#333333',
        textAlign: 'center',
        marginBottom: '4px',

    },
    balance: {
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(1.4)}px Work Sans`,
        lineHeight: "16px",
        color: '#044236',
        textAlign: 'center',
        fontFamily: 'Work Sans',

    },
    description: {
        font: `normal 500 ${theme.spacing(1.2)}px Work Sans`,
        lineHeight: '29px',
        letterSpacing: '0em',
        color: '#333333',
        textAlign: 'center',
        // marginTop: '5px'
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
        margin: theme.spacing(2, 0)
    },
    buttonContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        "& .MuiButton-root": {
            width: '100%',
        },
        font: `normal 600 ${theme.spacing(1.4)}px Work Sans`,
        lineHeight: '16px',
        letterSpacing: '0em'
    },
    cancelButton: {
        font: `normal 600 ${theme.spacing(
            1.4
        )}px Work Sans !important`,
        borderRadius:'4px !important'
    },
    margin:{
        marginTop: '-8px'

    }

}))
const formDate = (dateObj: any) => {
    const options: any = { month: 'long' };

    var month = dateObj.toLocaleDateString("en-US", options) //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return day + " " + month + " " + year;
}
const GetBalance = (props: Props) => {
    const classes = useStyles()

    // cardExpiry: "2022-04-24T13:16:49.657"


    const date = props.expiryDate ? new Date(props.expiryDate) : null;
    let deliveryDate = null
    if (date)
        deliveryDate = formDate(date)
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
                                Check Balance
                            </Typography>
                        </div>

                        <div className={classes.formContainer}>
                            <Typography variant="h4" className={classes.placeholder}>
                                ₹ {Utils.CommonFunctions.addCommaToAmount(props?.amount) || 0}
                            </Typography>
                            <Typography variant="h4" className={classes.balance}>
                                Available Balance
                            </Typography>
                            <Typography variant="h4" className={classes.description}>
                                {`Validity ${deliveryDate}`}
                            </Typography>
                            <Typography variant="h4" className={clsx(classes.description,classes.margin)}>
                                {`Status: `}<span className={classes.balance}>{props?.status||''}</span>
                            </Typography>
                        </div>

                        <Divider light className={classes.divider} />
                        <div className={classes.buttonContainer}>
                            <CustomButton
                                type="button"
                                color="primary"
                                fullWidth
                                variant="contained"
                                text={"Cancel"}
                                onClick={props.handleClose}
                                className={classes.cancelButton}

                            />

                        </div>
                    </div>
                </div>
            </Fade >
        </Modal >
    )
}

export default GetBalance
