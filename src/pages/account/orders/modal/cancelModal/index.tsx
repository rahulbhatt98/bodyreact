// import ContainedButton from "../../../../../components/containedButton";
import {
  makeStyles,
  Modal,
  Fade,
  Backdrop,
  Typography,
  TextField,
  Radio,
} from "@material-ui/core";
import { useEffect, useState } from "react";
// import ConfirmationModal from "../confirmationModal";
// import { Link } from "react-router-dom";
import CustomButton from "../../../../../components/common/button";

interface Props {
  open: boolean;
  handleClose: () => void;
  reasons: any;
  handleSubmit: Function;
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
    padding: theme.spacing(2, 0, 0),
    alignItems: "center",
    justifyContent: "center",
    // height: "92%",
    // overflowY: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "96%",
      padding: theme.spacing(2),
      borderRadius: "12px"
    },
  },

  innerContainer: {
    display: "flex",
    justifyContent: "center",
    // padding: theme.spacing(3, 0, 0, 0),
    alignItems: "center",
    position: "sticky",
    top: theme.spacing(1),
    padding: theme.spacing(1,4),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },
  },
  externalContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1.5, 2, 0, 4),
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1.5,1.5,0,1.5),
    },
  },

  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )}px Work Sans`,
    lineHeight: "29px",
    color: "var(--secondary-black)",
  },
  subheading: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )}px Work Sans`,
    lineHeight: "16px",
    color: "var(--black)",
  },

  title: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )}px Work Sans`,
    lineHeight: "26px",
    margin: theme.spacing(1, 0),
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    margin: theme.spacing(2, 2.5),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0, 1.5),
    }
  },
  radioButton: {
    transition: "none",
    "&:hover": { backgroundColor: "white" },
    width: "14px",
    height: "14px",
  },
  root: {
    "&$checked": {
      color: "var(--main-opacity)",
      borderRadius: theme.spacing(0.4),
    },
  },
  checked: {},
  btnWidth: {
    width: "45%",
  },
  break: {
    margin: theme.spacing(1, 0),
  },
  outerContainer: {
    height: "55vh",
    overflowY: "auto",
    [theme.breakpoints.down("xs")]: {
      height: "40vh"
    }
  },
}));

const CancelModal = (props: Props) => {
  const classes = useStyles();

  const [checked, setChecked] = useState("");
  const [othersText, setOthersText] = useState("");

  const handleChange = (e: any) => {
    setChecked(e.target.value);
    if (e?.target?.value?.toLowerCase() !== "others") {
      setOthersText("");
    }
  };

  const handleOpen = () => {
    props.handleSubmit(
      checked?.toLowerCase() === "others" ? othersText.trim() : checked
    );
  };

  useEffect(() => {
    setChecked("");
    setOthersText("");
  }, [props.open]);

  const onCommentChange = (e: any) => {
    setOthersText(e.target.value);
  };
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
              <Typography
                variant="h4"
                align="center"
                className={classes.heading}
              >
                Why do you want to cancel the order?
              </Typography>
            </div>
            <div className={classes.outerContainer}>
              {props.reasons.map((item: any, index: number) => {
                return (
                  <>
                    <div className={classes.externalContainer} key={index}>
                      <Typography variant="h4" className={classes.subheading}>
                        {item.reason}
                      </Typography>

                      <Radio
                        value={item.reason}
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                        onChange={handleChange}
                        checked={checked === item.reason}
                      />
                    </div>
                    {item?.reason?.toLowerCase() === "others" &&
                      checked?.toLowerCase() === "others" && (
                        <div className={classes.break}>
                          {/* <Typography className={classes.subheading}>Others</Typography> */}
                          <TextField
                            id="filled-multiline-static"
                            multiline
                            fullWidth
                            rows={4}
                            placeholder="Please leave a comment"
                            variant="filled"
                            className={classes.break}
                            onChange={onCommentChange}
                            value={othersText}
                          />
                        </div>
                      )}
                  </>
                );
              })}
            </div>
            <div className={classes.buttonContainer}>
              <div className={classes.btnWidth}>
                {/* <Link to="/order-cancellation/:id"> */}
                <CustomButton
                  type="submit"
                  color="primary"
                  fullWidth
                  onClick={props.handleClose}
                  variant="outlined"
                  text={"Cancel"}
                />

                {/* </Link> */}
              </div>
              <div className={classes.btnWidth}>
                <CustomButton
                  disabled={
                    (checked?.toLowerCase() === "others" &&
                      !othersText.trim()) ||
                    !checked
                  }
                  type="button"
                  color="primary"
                  fullWidth
                  onClick={handleOpen}
                  variant="contained"
                  text={"Submit"}
                />
                {/* <ConfirmationModal
                  open={state.open}
                  handleClose={handleClose}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default CancelModal;
