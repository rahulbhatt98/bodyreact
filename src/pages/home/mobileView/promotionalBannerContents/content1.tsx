import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import Utils from "../../../../utils";
import clsx from "clsx";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex !important",
      justifyContent: "stretch",
      alignItems: "stretch",
      height: "100px",
    },
    leftContainer: { width: "20%" },
    rightContainer: {
      background: "var(--primary)",
      width: "80%",
      position: "relative",
    },
    imgContainer: {
      height: "100%",
      width: "100%",
    },
    img: {
      width: "100%",
      height: "100%",
      padding: "2px 0px",
    },
    textContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      padding: theme.spacing(1.2, 1.2, 1.2, 1.5),
    },
    heading: {
      color: "var(--white)",
      letterSpacing: "2px",
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )}px Recoleta Alt`,
    },
    lineClamp: {
      display: "-webkit-box",
      "-webkit-line-clamp": 1,
      "&::-webkit-box-orient": "vertical",
    },
    // rightImg: {
    //     position: "absolute",
    //     width: "100%",
    //     height: theme.spacing(8),
    //     objectFit: "cover",
    // },
    subHeading: {
      color: "var(--white)",
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.2
      )}px Work Sans`,
      letterSpacing: "0.8px",
      marginTop: theme.spacing(1),
    },
    noImg: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      width: theme.spacing(8),
      background: "",
      height: "100%",
    },
    multiLineEllipsis: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 1,
      "-webkit-box-orient": "vertical",
    },
  })
);
interface Props {
  item: any;
  navigateTo: Function;
}

export default function Content1({ item, navigateTo }: Props) {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

  return (
    <div
      key={item.id}
      className={classes.container}
      onClick={() => navigateTo(item)}
    >
      <div className={classes.leftContainer}>
        <div className={classes.imgContainer}>
          <img
            src={
              item?.mobile_img_path
                ? IMAGE_URL + item.mobile_img_path
                : Utils.images.PRODUCT_PLACEHOLDER
            }
            alt="cart"
            className={item?.mobile_img_path ? classes.img : classes.noImg}
          />
        </div>
      </div>
      <div className={classes.rightContainer}>
        {/* <img
                    src={item?.background_img_path ? IMAGE_URL + item.background_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                    alt="cart"
                    className={classes.rightImg}
                /> */}
        <div className={classes.textContainer}>
          <Typography
            className={clsx(classes.heading, classes.multiLineEllipsis)}
          >
            {item?.title || ""}
          </Typography>
          <div
            className={clsx(classes.subHeading, classes.multiLineEllipsis)}
            dangerouslySetInnerHTML={{ __html: item?.description || "" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
