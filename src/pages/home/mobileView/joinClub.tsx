import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReducersModal } from "../../../models";
import Utils from "../../../utils";
import { isAuthenticated } from "../../../utils/session";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(2, 0),
      padding: theme.spacing(2, 0),
      backgroundColor: theme.palette.primary.main,
    },
    heading: {
      font: `normal ${theme.spacing(
        2.8
      )}px  Druk Bold`,
      color: "var(--light-green)",
      lineHeight: "33px",
      marginBottom: theme.spacing(0.5),
      textTransform: "uppercase",
      letterSpacing: "0.04em"
    },
    outerContainer: {
      padding: theme.spacing(2, 0),
      // marginTop: "30px",
      textAlign: "center",
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}px  Roboto`,
      color: "var(--light-green)",
      lineHeight: "20.4px",
      margin: theme.spacing(1),
      padding: "0px 10px",
      textAlign: "center",
    },
    img: {
      width: "55%",
      height: theme.spacing(20),
      objectFit: "cover",
      position: "relative"
    },
    innerContainer: {
      background: "var(--light-green)",
      margin: theme.spacing(-4, 3),
      // position: "absolute",
      position: "relative",
      padding: theme.spacing(1.5),
      borderRadius: "5px",
    },
    title: {
      font: `normal ${theme.spacing(
        1.9
      )}px  Work Sans Bold`,
      color: "var(--primary)",
      textTransform: "uppercase",
      marginBottom: theme.spacing(0.5),
    },
    subTitle: {
      font: `normal ${theme.spacing(
        1.4
      )}px  Work Sans Regular`,
      color: "var(--primary)",
      textAlign: "initial",
      marginBottom: theme.spacing(0.5),
    },
    btn: {
      borderRadius: "4px",
      background: "var(--light-green) !important",
      color: "var(--primary) !important",
      margin: theme.spacing(4, 0, 0, 1),
      width: "95%",
      font: `normal ${theme.spacing(
        1.4
      )}px  Work Sans Bold`,
      padding: theme.spacing(1.2),
      letterSpacing: "0.06em",
    },
  })
);
interface Props {
  data: any;
  key: string;
}

const JoinClub = ({ data }: Props) => {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const history = useHistory();
  const userInfo: any =
    useSelector((state: ReducersModal) => state.userDetailReducer.userInfo) ||
    {};

  const redirect = () => {
    if (isAuthenticated()) {
      const type = userInfo.tierType === 2 ? 1 : 2;
      history.push({
        pathname: Utils.routes.UPGRADE_MEMBERSHIP,
        state: { type, pageName: "My Dashboard" },
      });
    } else {
      history.push(
        `${Utils.routes.LOGIN_OTP}?redirectTo=${"/upgrade-membership"}`
      );
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h4" align="center" className={classes.heading}>
          {data?.lybc_common_title || ""}
        </Typography>
        {/* <div
          className={classes.subHeading}
          dangerouslySetInnerHTML={{
            __html: data?.lybc_common_description || "",
          }}
        /> */}
        {data?.content &&
          Array.isArray(data?.content) &&
          data.content.map((item: any) => (
            <div className={classes.outerContainer}>
              <img
                src={
                  item?.mobile_img_path
                    ? IMAGE_URL + item.mobile_img_path
                    : Utils.images.PRODUCT_PLACEHOLDER
                }
                alt="productImg"
                className={classes.img}
              />
              <div className={classes.innerContainer}>
                <Typography variant="h4" className={classes.title}>
                  {item?.title || ""}
                </Typography>
                <Typography variant="h4" className={classes.subTitle}>
                  {item?.description
                    ? _.truncate(
                        Utils.CommonFunctions.replaceHtmlTag(item?.description),
                        { length: 180 }
                      )
                    : ""}
                </Typography>
              </div>
            </div>
          ))}

        {data?.lybc_button_text ? (
          <Button
            onClick={redirect}
            variant="contained"
            fullWidth
            className={classes.btn}
          >
            {data.lybc_button_text}
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default JoinClub;
