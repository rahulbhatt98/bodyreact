// import ContainedButton from "../../../../../components/containedButton";
import {
    makeStyles,
    Modal,
    Fade,
    Backdrop,
    Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Utils from "../../../utils";
import { styled } from "@material-ui/core/styles";

// import { Link } from "react-router-dom";

interface Props {
    open: boolean;
    handleClose: () => void;
    imageHandler: Function;
    deleteImage: Function;
    setShowImageView:Function
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
        backgroundColor: theme.palette.background.paper,
        outline: "none",
        // padding: theme.spacing(2, 2),
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
        maxHeight: "600px",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            paddingBottom: theme.spacing(2),
            position: "absolute",
            bottom: "0px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
        },
    },

    listItem: {
        font: `normal 500 ${theme.spacing(
            1.8
        )}px Work Sans SemiBold`,
        lineHeight: "26px",
        // margin: theme.spacing(1, 0),
        // [theme.breakpoints.down("xs")]: {
        //     fontSize: "16px",
        //     margin: 0
        // },
        cursor: "pointer",
        padding: "20px 0px",
        borderBottom: "2px solid #dfe3e8",
        textAlign: "center",
    },
    heading: {
        font: `normal ${theme.spacing(
            1.8
        )}px Work Sans SemiBold`,
        lineHeight: "26px",
        margin: theme.spacing(1, 0),
        // [theme.breakpoints.down("xs")]: {
        //     fontSize: "16px",
        //     margin: 0
        // },
        cursor: "pointer",
        padding: theme.spacing(2),

    },
    cursor: {
        cursor: "pointer"
    },
    listContainer: {
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "space-between"
    }
}));

const Input = styled("input")({
    display: "none",
});
const EditOptionsModal = (props: Props) => {
    const classes = useStyles();
    const { imageHandler, deleteImage, handleClose,setShowImageView } = props;
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
                    <div className={classes.listContainer}>
                        <Typography className={classes.heading}>Choose From</Typography>
                        <div className={classes.listItem} onClick={(e) => setShowImageView(true)}>View Photo</div>
                        <div className={classes.listItem}>
                            <label className={classes.cursor} htmlFor="contained-button-file">
                                <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    type="file"
                                    onChange={(e: any) => imageHandler(e)}
                                />
                                Upload Photo
                            </label>
                        </div>
                        <div className={classes.listItem} onClick={(e) => deleteImage()}>Remove Photo</div>
                        <div className={classes.listItem} onClick={(e) => handleClose()}>Cancel</div>
                    </div>


                </div>
            </Fade>
        </Modal>
    );
};

export default EditOptionsModal;
