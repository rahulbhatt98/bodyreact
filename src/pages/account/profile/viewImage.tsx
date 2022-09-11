// import ContainedButton from "../../../../../components/containedButton";
import {
    makeStyles,
    Modal,
    Fade,
    Backdrop,
    Typography,
    Hidden,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Utils from "../../../utils";
import { styled } from "@material-ui/core/styles";

// import { Link } from "react-router-dom";

interface Props {
    open: boolean;
    handleClose: () => void;
    img: any
    // reasons: any;
    // handleSubmit: Function;
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)",
    },
    paper: {
        // display: "flex",
        outline: "none",
        // padding: theme.spacing(2, 2),
        // alignItems: "center",
        // justifyContent: "center",
        // width: "70%",
        textAlign:"center",
        height: "70%",
        [theme.breakpoints.down("xs")]: {
            display:"block",
            // width: "100%",
            // height: "100%",
            backgroundColor: theme.palette.background.paper
        },
    },
    cursor: {
        cursor: "pointer",
        padding: "10px",
        paddingRight: "0px",
        float: "right",
        [theme.breakpoints.down("xs")]: {
            float: "left"

        }
    },
    backArrow: {
        width: "22px",
        margin:"10px 16px"
    },
    fullWidth: {
        height: "95%",
        textAlign:"center",
        [theme.breakpoints.up("sm")]: {
            // width:"100%",
            background:"white"
        },
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            height: "90%",
            // objectFit:"cover"

        }

    }

}));

const Input = styled("input")({
    display: "none",
});
const ViewImage = (props: Props) => {
    const classes = useStyles();
    const { img } = props;
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
                    <Hidden xsDown>
                        <img className={classes.cursor} src={Utils.images.CROSS} onClick={props.handleClose} />
                    </Hidden>
                    <Hidden smUp>
                        <div>
                            <img className={classes.backArrow} src={Utils.images.BACK_ARROW} onClick={props.handleClose} />
                        </div>
                    </Hidden>
                    <img
                        className={classes.fullWidth}
                        src={img ? img : Utils.images.PROFILE_IMAGE_OUTLINE}
                        alt="icon"
                    />


                </div>
            </Fade>
        </Modal>
    );
};

export default ViewImage;
