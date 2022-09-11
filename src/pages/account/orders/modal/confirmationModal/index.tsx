import Utils from "../../../../../utils";
import {
  makeStyles,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomButton from "../../../../../components/common/button";
import { ReducersModal } from "../../../../../models";
import clsx from 'clsx';

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
    padding: theme.spacing(2, 2, 3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: '30px',
    width: "500px",
    [theme.breakpoints.down("xs")]: {
      width: "90%"
    }
  },
  paperContent: {
    width: "100%"
  },

  innerContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(3, 0, 0, 0),
    // margin: '0px 20px 0px 20px',

  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )}px Work Sans`,
    lineHeight: "29px",
    width: '312px',
    // padding:"0px 90px",
    paddingBottom: '15px'
  },
  subHeading: {
    font: `normal 600 ${theme.spacing(
      1.4
    )}px Work Sans`,
    lineHeight: "29px",
    // width: '312px',
    padding: '0px 20px 15px 20px',
    color: "var(--light-gray)",
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
      paddingBottom: "15px",
    }

  },
  detailsContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(4, 0, 0, 0),
  },
  displayContainer: {
    display: "flex",
    alignItems: "center",
  },
  titleContainer: {
    padding: theme.spacing(0, 2),
    maxWidth: 213,
  },
  title: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )}px Work Sans`,
    lineHeight: "26px",
    margin: theme.spacing(1, 0),
  },
  quantity: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.2
    )}px Work Sans`,
    lineHeight: "14px",
    color: "var(--light-gray)",
  },
  divider: {
    margin: theme.spacing(3, 0),
    marginBottom: 0
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    padding: "0px 20px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    }
  },
  btn: {
    borderRadius: '4px !important',
    font: `normal 600 ${theme.spacing(
      1.4
    )}px Work Sans !important`,
    // width: "46%"
    padding: "15px 62px !important",
    [theme.breakpoints.down("xs")]: {
      padding: "15px 35px !important",
      marginRight: "5px",
      marginLeft: "5px"
    }
  },
  leftButton: {
    padding: "15px 67px !important",
    [theme.breakpoints.down("xs")]: {
      padding: "15px 48px !important",
    }
  }
}));
interface Props {
  open: boolean;
  handleClose: any;
}
const ConfirmationModal = (props: Props) => {
  const classes = useStyles();
  const history = useHistory()
  const menuData = useSelector((state: ReducersModal) => state.homeReducer.menuData)

  let pathname = Utils.CommonFunctions.seoUrl(menuData?.[0], "others")

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
          <div className={classes.paperContent}>
            <div className={classes.innerContainer}>
              <img src={Utils.images.SUCCESS} alt="success" />
            </div>
            <div className={classes.innerContainer}>
              <Typography variant="h4" align="center" className={classes.heading}>
                Your order has been cancelled successfully
              </Typography>
            </div>
            <Typography variant="h4" align="center" className={classes.subHeading}>
              Refundable amount will be sent back to the original mode of payment in 5-7 working days
            </Typography>

            <Divider light className={classes.divider} />
            <div className={classes.buttonContainer}>
              <CustomButton
                className={clsx(classes.btn, classes.leftButton)}
                text={"Ok"}
                onClick={props.handleClose}
                variant="outlined"
                fullWidth={false}
                type="button"
              />
              {/* <Link to="/shopping-bag"> */}
              <CustomButton
                className={classes.btn}
                fullWidth={false}
                type="button" onClick={() => {
                  history.push({ pathname })
                }} text={"Shop More"} />
              {/* </Link> */}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ConfirmationModal;
