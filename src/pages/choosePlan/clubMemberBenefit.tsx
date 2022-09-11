import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import { useDispatch } from "react-redux";
// import { ReducersModal } from "../../models";
import Utils from "../../utils";
import { addToBag } from "../../components/common/addToCart/action";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans SemiBold`,
      color: "var(--black)",
      letterSpacing: "0.04em",
    },

    innerContainer: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(1, 0),
      flexBasis: "70%",
    },
    imgDiv: {
      background: "var(--white)",
      borderRadius: "50%",
      padding: theme.spacing(0.7),
      width: "40px",
      height: "40px",
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      lineHeight: "21px",
      color: "var(--white)",
      letterSpacing: "0.04em",
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      },
    },
    subTitle: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px Work Sans`,
      lineHeight: "20px",
      color: "#D8D06A",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.2
        )}px Work Sans Regular`,
      },
    },
    innerRoot: {
      margin: theme.spacing(0, 1),
    },
    container: {
      background: "var(--white)",
      border: "1px solid var(--text-color)",
      padding: theme.spacing(1.4),
      height: "auto",
      borderRadius: "14px",
      margin: "14px",
      width: "96% ",
      [theme.breakpoints.down("xs")]: {
        width: "100% ",
      },
    },
    name: {
      font: `normal ${theme.spacing(
        2.4
      )}px Recoleta Alt SemiBold`,
      //   lineHeight: "20px",
      color: "var(--white)",
      margin: theme.spacing(1, 0, 2, 0),
      letterSpacing: "0.04em",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
        marginBottom: 1
      },
    },
    img: {
      width: "100%",
      height: "auto",
      objectFit: "cover",
    },
    secndContainer: {
      border: "2px solid #D9D26B",
      offset: "0px, 5px rgba(35, 30, 30, 0.06)",
      margin: "14px 40px",
      background: "var(--primary)",
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(2, 2),
        position: "static",
        bottom: 0,
        width: "95%",
      },
      [theme.breakpoints.down(470)]: {
        margin: theme.spacing(2, 0),
        position: "static",
        bottom: 0,
        width: "100%",
      },
      [theme.breakpoints.down(385)]: {
        margin: theme.spacing(2, 0),
        position: "fixed",
        bottom: 0,
        width: "93%",
      },
      [theme.breakpoints.down(370)]: {
        margin: theme.spacing(2, 0),
        position: "static",
        bottom: 0,
        width: "100%",
      },
    },
    firstDiv: {},
    subHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px Work Sans`,
      lineHeight: "18px",
      color: "rgba(102, 102, 102, 0.99)",
      margin: theme.spacing(1, 0, 2, 0),
      letterSpacing: "0.04em",
    },
    question: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans SemiBold`,
      lineHeight: "18px",
      color: "var(--white)",
      margin: theme.spacing(3, 0, 2, 0),
      letterSpacing: "0.04em",
    },

    faqQuestion: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.6
      )}px Work Sans SemiBold`,
      lineHeight: "18px",
      color: "var(--green-color-100)",
      letterSpacing: "0.04em",
    },
    btn: {
      borderRadius: "4px",
      margin: theme.spacing(2, 0, 0, 0),
      padding: theme.spacing(1.5),
      background: theme.palette.secondary.main,
      textTransform: "capitalize",
      "& .MuiButton-label": {
        color: "var(--primary)",
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )}px Work Sans SemiBold`,
        lineHeight: "18px",
        [theme.breakpoints.down("xs")]:{
          font: `normal ${theme.spacing(
            1.4
          )}px Work Sans SemiBold`,
        }
      },
      "&:hover": {
        background: theme.palette.secondary.main,
      },
      [theme.breakpoints.down("xs")]:{
        padding: theme.spacing(1),

      }
    },
    outercontainer: {
      [theme.breakpoints.down(560)]: {
        height: "50vh",
        overflowY: "auto",
      },
      [theme.breakpoints.down(380)]: {
        height: "40vh",
        overflowY: "auto",
      },
    },
  })
);

const ClubMemberBenefit = ({ memberShip }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    let payload: any = {
      productId: memberShip?.productId,
      type: "virtual",
      quantity: 1,
      attributeData: [],
    };
    localStorage.setItem("isMembershipAdded", 'true')

    dispatch(
      addToBag(payload, (resp: any) => {
        history.push(Utils.routes.SHOPPING_BAG);
      })
    );
  };

  return (
    <div className={clsx(classes.container, classes.secndContainer)}>
      <Typography className={classes.name}>
        {memberShip?.name} Benefits
      </Typography>
      <div className={classes.outercontainer}>
        {memberShip?.contentData?.map((item: any) => (
          <div className={classes.innerContainer} key={item.id}>
            {item.webIcon ? (
              <div>
                <div className={classes.imgDiv}>
                  <img
                    src={`${process.env.REACT_APP_MEDIA_URL}${item.webIcon}`}
                    alt="icons"
                    className={classes.img}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className={classes.imgDiv}>
                  <img
                    src={`${Utils.images.GREEN_LOGO}`}
                    alt="icons"
                    className={classes.img}
                  />
                </div>
              </div>
            )}
            <div className={classes.innerRoot}>
              <Typography className={classes.title}>{item.title}</Typography>
              <Typography className={classes.subTitle}>
                {item.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      <Button className={classes.btn} fullWidth onClick={handleClick}>
        Add to Bag & Proceed
      </Button>
    </div>
  );
};

export default ClubMemberBenefit;
