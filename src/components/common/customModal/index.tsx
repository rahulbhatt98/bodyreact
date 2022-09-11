import {
    makeStyles,
    Modal,
    Fade,
    Backdrop,
} from "@material-ui/core";
import Utils from "../../../utils";

interface Props {
    open: boolean;
    handleClose: () => void;
    children: any
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)",
        // height:'500px'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        outline: "none",
        padding: theme.spacing(2),
        display: "block",
        alignItems: "center",
        borderRadius: "3px",
        width: "50%",
        // height: "85%",
        height: "auto",
        // overflowY: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "95%",
            borderRadius: "12px",
        },
    },
    imgIcon: {
        position: "relative",
        left: 0,
        top: 0,
        textAlign: "end",
        cursor: "pointer",
    },
}));
const CustomModal = (props: Props) => {
    const classes = useStyles()
    return (
        <>
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
                        <div className={classes.imgIcon} onClick={props.handleClose}>
                            <img src={Utils.images.CROSS} alt="cross_icon" />
                        </div>
                        {props.children}

                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default CustomModal;
