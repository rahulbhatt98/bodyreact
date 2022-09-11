import ContainedButton from "../../../components/containedButton";
import {
  makeStyles,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Divider,
} from "@material-ui/core";
import Utils from "../../../utils";
import { useHistory } from "react-router-dom";

interface Props {
  open: boolean;
  handleClose: () => void;
  orderId: string | null;
}

const data = [
  {
    id: 1,
    icon: `${Utils.images.CALL_ICON}`,
    iconName: "Call now ",
    iconDescription: "Talk to our customer support team",
  },
  {
    id: 2,
    icon: `${Utils.images.MAIL_ICON}`,
    iconName: "Chat",
    iconDescription: "Chat With our customer support team",
  },
  {
    id: 3,
    icon: `${Utils.images.CHAT_ICON}`,
    iconName: "Write to us ",
    iconDescription: "Email your queries to us",
  },
];

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
    padding: theme.spacing(2, 2, 2, 2),
    display: "block",
    alignItems: "center",
    borderRadius: "3px",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      borderRadius: "12px",
    },
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    // justifyContent: "center",
    padding: theme.spacing(1, 0, 0, 0),
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )}px Work Sans`,
    lineHeight: "29px",
    marginBottom: theme.spacing(0.5),
    color: "var(--secondary-black)",
  },
  formContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: theme.spacing(3, 0, 0.5, 0),
    cursor: "pointer",
  },
  inputLabel: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.3
    )}px Work Sans`,
    lineHeight: "15px",
    color: "var(--grey-color)",
    marginBottom: "8px",
  },
  contactName: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )}px Work Sans`,
    lineHeight: "16px",
    color: "var(--black)",
    marginBottom: "8px",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },

  buttonContainer: {
    "& .MuiButton-root": {
      width: "100%",
      marginRight: "15px",
    },
  },

  outerContainer: {
    margin: theme.spacing(0, 1),
  },
}));
const ContactModal = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
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
            <div>
              <div className={classes.innerContainer}>
                <Typography variant="h4" className={classes.heading}>
                  Contact Us
                </Typography>
              </div>
              <Typography variant="h4" className={classes.inputLabel}>
                If you have any queries or are unsatisfied with our services, please reach out to us here:
              </Typography>
              {data.map((item: any, index) => (
                <>
                  <div
                    className={classes.formContainer}
                    key={index}
                    onClick={() => {
                      if (item.id === 3)
                        history.push({
                          pathname: Utils.routes.WRITE_TO_US,
                          state: {
                            flag: "help-support",
                            orderId: props.orderId,
                            pageName: "Write To Us",
                          },
                        });
                      else if (item.id === 2) {
                        //@ts-ignore
                        zE && zE.activate();
                        props.handleClose();
                      } else if (item.id === 1 && Utils.CommonFunctions.mobileCheck()) window.open("tel:8527474404");
                    }}
                  >
                    <img src={item.icon} alt="contactIcon" />
                    <div className={classes.outerContainer}>
                      <Typography variant="h4" className={classes.contactName}>
                        {item.iconName}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.inputLabel}
                      >
                        {item.iconDescription} {item.id === 1 ? '- 8527474404' : ""}
                      </Typography>
                    </div>
                  </div>
                  <Divider light className={classes.divider} />
                </>
              ))}

              <div className={classes.buttonContainer}>
                <ContainedButton
                  text={"Close"}
                  isOutline={true}
                  isGreen={true}
                  onClick={props.handleClose}
                />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ContactModal;
