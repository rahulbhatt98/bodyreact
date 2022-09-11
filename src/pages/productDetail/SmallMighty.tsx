import ContainedButton from "../../components/containedButton";
import { makeStyles, Typography, Divider } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import CustomAccordion from "../../components/customAccordion";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";
const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

const useStyles = makeStyles((theme) => ({
  smallButMighty: {
    "& .MuiButton-root": {
      padding: "16px 16px",
      marginTop: "24px",
    },
    "& ol": {
      marginLeft: "18px",
    },
    "& ul": {
      marginLeft: "18px",
      
    },
    "& li": {
      [theme.breakpoints.down("xs")]: {
        // "& .MuiTypography-body1": {
          font: `normal ${theme.spacing(1.4)}px Work Sans Regular`,
          lineHeight: "22.4px"
        // },
      },
    }
  },
  smallButMightyImage: {
    // height: '289px',
    maxHeight: "289px",
    width: "80%",
    justifyContent: "center",
    objectFit: "cover",
  },
}));
const SmallMighty = () => {
  const classes = useStyles();
  const productData: any = useSelector(
    (state: ReducersModal) => state.productDetailReducer
  );
  let productDetail: any = productData?.product;

  const getAttributeValue = (attributeCode: any) => {
    if (productDetail && productDetail?.customAttributes?.length > 0) {
      const attributeObj = productDetail?.customAttributes?.find((el: any) => {
        return el.attribute_code === attributeCode;
      });

      if (attributeObj && attributeObj?.value) {
        if (attributeObj.value?.includes("&lt")) {
          let new_value = attributeObj?.value?.replaceAll("&lt;", "<");
          new_value = new_value?.replaceAll("&gt;", ">");
          return new_value;
        }
        return attributeObj.value;
      }
    }
    return "";
  };

  return (
    <div>
      {ReactHtmlParser(getAttributeValue("small_but_mighty"))?.length > 0 ? (
        <>
          <CustomAccordion
            heading={
              ReactHtmlParser(getAttributeValue("small_but_mighty_title"))
                ?.length > 0
                ? ReactHtmlParser(getAttributeValue("small_but_mighty_title"))
                : "Small but Mighty"
            }
            details={
              <Typography className={classes.smallButMighty}>
                {getAttributeValue("small_but_mighty_image") ? (
                  <img
                    src={`${IMAGE_URL}catalog/product${getAttributeValue(
                      "small_but_mighty_image"
                    )}`}
                    alt="img"
                    className={classes.smallButMightyImage}
                  />
                ) : null}

                {ReactHtmlParser(getAttributeValue("small_but_mighty"))}

                {ReactHtmlParser(getAttributeValue("small_but_mighty_link"))
                  ?.length > 0 ? (
                  <ContainedButton
                    text={ReactHtmlParser(
                      getAttributeValue("small_but_mighty_link")
                    ).toString()}
                    type="button"
                  />
                ) : null}
              </Typography>
            }
            openByDefault={true}
          />
        </>
      ) : null}
    </div>
  );
};

export default SmallMighty;
