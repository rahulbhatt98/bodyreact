import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReducersModal } from "../../../models";
import Utils from "../../../utils";
import { getPLPCategories } from "../../productListing/action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skinType: {
      font: `normal ${theme.spacing(1.3)}px  Work Sans Medium`,
      color: "var(--secondary-black)",
      marginTop: "11px",
      textAlign: "center",
      lineHeight: "15px",
      marginLeft: "-10px",
    },
    innerContainer: {
      display: "flex",
      width: "100vw",
      overflowX: "auto",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    imgDiv: {
      cursor: "pointer",
      width: theme.spacing(11),
      height: "auto",
    },
    img: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      objectFit: "cover",
      borderRadius: "50%",
      boxShadow: "0px 0px 30px rgba(146, 146, 146, 0.1)",
    },
    noImg: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      objectFit: "cover",
      borderRadius: "50%",
      padding: "20px",
      boxShadow: "0px 0px 30px rgba(146, 146, 146, 0.1)",
    },
    border: {
      border: "3px solid var(--main-opacity)",
    },
    innerDiv: {
      margin: theme.spacing(0, 0, 1, 1),
      width: theme.spacing(11),
      height: "auto",
      cursor: "pointer"
    },
  })
);
interface Props {
}
const Category = ({ }: Props) => {
  const classes = useStyles();
  const history = useHistory()
  const [menus, setMenus] = useState([]);
  const menuData = useSelector(
    (state: ReducersModal) => state.homeReducer.menuData
  );
const dispatch =useDispatch()
  useEffect(() => {
    // getPLPCategories().then((resp) => {
    //   dispatch({
    //     type: Utils.ActionName.MOBILE_MENUS_DATA,
    //     payload: { menuData: resp?.data?.data?.data },
    //   });
    //   setMenus(resp.data.data.data)
    // }).catch((err) => {
    // })
  }, []);

  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

  const navigateTo = (item: any) => {
    let pathname = Utils.CommonFunctions.seoUrl(item, "others")
    history.push({ pathname});

  }
  return (
    menuData?.length > 0 ?
      <>
        <div className={classes.innerContainer}>
          {menuData.map((item: any) => {
            const image =item?.image||""
            //  _.find(item?.customAttributes, {
            //   attribute_code: "image",
            // });
            return (
              <div className={classes.innerDiv} key={item.key} >
                <div className={classes.imgDiv} >
                  <img
                    onClick={() => navigateTo(item)}
                    src={image ? IMAGE_URL  + image : Utils.images.PRODUCT_PLACEHOLDER}
                    alt="product"
                    className={image ? classes.img : classes.noImg}
                  />
                  <Typography
                    onClick={() => navigateTo(item)}
                    variant="body2"
                    align="center"
                    className={classes.skinType}
                  >
                    {item?.title || ""}
                  </Typography>
                </div>
              </div>
            )
          })}
        </div>
      </>
      : null
  );
}

export default Category;
