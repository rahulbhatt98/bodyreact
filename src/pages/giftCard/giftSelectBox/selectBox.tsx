import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import React from "react";
import Utils from "../../../utils";
import { useState } from "react";
import GreenRadio from "../../../components/common/customRadio";

// const GreenRadio = withStyles({
//   root: {
//     color: "var(--main-opacity)",
//     "&$checked": {
//       color: "var(--main-opacity)",
//     },
//     height: "20px",
//     width: "20px",
//   },
//   checked: {},
// })((props: any) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headingDiv: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(1, 0),
    },
    radioButton: {
      transition: "none",
      "&:hover": { backgroundColor: "white" },
      width: "14px",
      height: "14px",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Recoleta Alt`,
      color: "var(--secondary-black)",
      lineHeight: "33px",
      letterSpacing: "0.02em",
    },
    subheading: {
      font: `normal  ${theme.spacing(2.2)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "21px",
      color: "var(--secondary-black)",
      marginTop:"15px",
      marginBottom:"30px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    innerContainer: {
      margin: theme.spacing(2, 0),
      position: "relative",
      display: "flex",
      alignItems: "end",
    },
    img: {
      width: "100%",
      height: "auto",
    },
    imgDiv: {
      position: "absolute",
      font: `normal  ${theme.spacing(2.4)}px Recoleta Alt`,
      fontWeight: 600,
      lineHeight: "33px",
      color: "var(--white)",
      letterSpacing: "0.02em",
      margin: theme.spacing(2),
    },
    bigImg: {
      width: "100%",
      objectFit: "cover",
      height: "40rem",
      borderRadius: "7px",
      [theme.breakpoints.down("xs")]: {
        height: "20rem",
      },
    },
    subTitle: {
      font: `normal  ${theme.spacing(1.6)}px Recoleta Alt`,
      fontWeight: "normal",
      lineHeight: "24px",
      letterSpacing: "-0.333333px",
      color: "rgba(102, 102, 102, 0.99)",
    },
    externalDiv: {
      margin: theme.spacing(2, 0),
    },
    optionContainer: {
      background: "var(--white)",
      border: " 1px solid var(--border-color)",
      boxSizing: "border-box",
      borderRadius: "4px",
      padding: theme.spacing(2),
      display: "flex",
      height: "105px",
      [theme.breakpoints.down("xs")]: {
        height: "auto",
      },
    },
    divider: {
      border: "1px solid var(--text-color)",
      margin: theme.spacing(3, 0),
    },
    optionTitle: {
      font: `normal  ${theme.spacing(1.6)}px Work Sans`,
      fontWeight: 600,
      lineHeight: "19px",
      letterSpacing: "-0.333333px",
      color: "var(--black300)",
    },
    optionTask: {
      font: `normal  ${theme.spacing(1.4)}px Work Sans`,
      fontWeight: "normal",
      lineHeight: "24px",
      letterSpacing: "-0.333333px",
      color: "rgba(51, 51, 51, 0.99)",
    },
    option: {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(0, 1),
    },
  })
);
const data = [
  {
    id: 1,
    label: "Classic Box - 6 items",
    value: "Classic Box - 6 items",
    img: `${Utils.images.GIFT_SELECT6}`,
  },
  {
    id: 2,
    label: "Classic Box - 2",
    value: "Classic Box - 2",
    img: `${Utils.images.GIFT_SELECT1}`,
  },
  {
    id: 3,
    label: "Classic Box - 3",
    value: "Classic Box - 3",
    img: `${Utils.images.GIFT_SELECT2}`,
  },
  {
    id: 4,
    label: "Classic Box - 4",
    value: "Classic Box - 4",
    img: `${Utils.images.GIFT_SELECT3}`,
  },
  {
    id: 5,
    label: "Classic Box - 5",
    value: "Classic Box - 5",
    img: `${Utils.images.GIFT_SELECT4}`,
  },
  {
    id: 6,
    label: "Classic Box - 6",
    value: "Classic Box - 6",
    img: `${Utils.images.GIFT_SELECT5}`,
  },
];

const options = [
  {
    id: 1,
    title: "Free choice product selection",
    subTitle:
      "Select the product without restriction from the pre defined gifting range of products",
    type: "free",
  },
  {
    id: 2,
    title: "Bundled product selection",
    subTitle: "Select the product from the predifined gifting bundles",
    type: "bundled",
  },
];

const SelectBox: React.FC<any> = (props: any) => {

  // const selectedProduct = props.selectedProduct;
  // const[selectedProduct, setSelectedProduct] = useState(props.selectedProduct)

  const [design, setDesign] = useState({
    label: "Classic Box - 6 items",
    img: `${Utils.images.GIFT_SELECT6}`,
  });

  const classes = useStyles();

  const handleChange = (e: any) => {
    setDesign(e);
  };

  return (
    <>
      <div className={classes.headingDiv}>
        <Typography className={classes.heading}>Select Box</Typography>
      </div>

      <Grid container>
        <Grid item xs={12}>
          <div className={classes.innerContainer}>
            <Typography className={classes.imgDiv}>{design.label}</Typography>
            <img src={design.img} alt="product" className={classes.bigImg} />
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.externalDiv}>
        <Grid item xs={12}>
          <Typography className={classes.heading}>Box Details</Typography>
          <Typography className={classes.subTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod temporut labore et magna aliquaad, quis nostrud exercitation
            ullamco laboris Lorem ipsum dolor sit amet, consectetur.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {data.map((item: any, index: any) => (
          <Grid item xs={6} md={4} key={item.id}>
            <div
              onClick={() => {
                handleChange(item);
              }}
            >
              <div>
                <img src={item.img} alt="product" className={classes.img} />
              </div>
              <div>
                <Typography className={classes.subheading}>
                  {item.label}
                </Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <Divider className={classes.divider} />
      <div className={classes.externalDiv}>
        <Grid container spacing={2}>
          {options.map((item: any) => (
            <Grid item xs={12} md={6} key={item.id}>
              <div className={classes.optionContainer}>
                <GreenRadio
                  className={classes.radioButton}
                  checked={props.selectedType === `${item.type}`}
                  onChange={() => props.setSelectedType(`${item.type}`)}
                  value="selectedType"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "C" }}
                />
                <div className={classes.option}>
                  <Typography className={classes.optionTitle}>
                    {item.title}
                  </Typography>
                  <Typography className={classes.optionTask}>
                    {item.subTitle}
                  </Typography>
                </div>
              </div>
            </Grid>
          ))}

        
        </Grid>
      </div>
    </>
  );
};
export default SelectBox;
