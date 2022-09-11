import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import _ from "lodash";
import Carousel from "react-multi-carousel";
import Utils from "../../../utils";
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    multiCarousel: {},
    itemDiv: {
      marginRight: theme.spacing(1),
      cursor: "pointer"
    },
    carousel: {
      "& .react-multiple-carousel__arrow": {
        // backgroundColor: theme.palette.secondary.main,
        backgroundColor: "var(--green-color)",
        minHeight: 40,
        minWidth: 40,
        // borderRadius: "unset",
        borderRadius: "50%",
        "&::before": {
          // content: `url(${Utils.images.CAROUSEL_ARROW})`,
          content: `url(${Utils.images.RECOMMENDED_ARROW})`,
          color: "var(--white)",
          width: "100%",
          height: "100%",
          fontSize: "25px",
        },
      },

      "& .react-multiple-carousel__arrow--left": {
        "&::before": {
          transform: "rotate(180deg)",
          right: "2px",
        },
      },
    },
    imgDiv: {
      backgroundColor: 'white',
      width: "100%",
      height: '277px'

    },
    noImgBackground: {
      backgroundColor: '#F8F3E9',
      padding: '25px',
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: 'cover'
    },
    contentDiv: {
      backgroundColor: "var(--white)",
      padding: theme.spacing(1),
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.8
      )}px Druk`,
      color: theme.palette.primary.main,
      textAlign: "center",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.8),
      },
      letterSpacing: '1px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    paragraph: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      color: theme.palette.primary.main,
      textAlign: "center",
      marginTop: '6px',
      marginBottom: '10px',
      padding: '0 2px 0 2px',
      height: '50px'
    },
  })
);

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 2000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 2000, min: 900 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};
interface Props {
  data: any;
}
const CardCarousel: React.FC<Props> = ({ data }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

  const navigateTo = (item: any) => {
    if (item.entity && item.entity_id) {
      if (item.entity === 'product') {
        let pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item?.entity_id }, "others").replace("/c/", "/p/")
        history.push(pathname)
        // history.push(Utils.CommonFunctions.replaceUrlParams(
        //   Utils.routes.PRODUCT_DETAIL,
        //   { ":id": item?.entity_id }
        // ))
      }
      else if (item.entity === 'offers') {
        history.push({ pathname: '/offers', search: `?offer=${item?.entity_id}` ,state: { pageName: "Offers" } });
      }
      else if (item.entity === "url") {
        window.open(item?.entity_id);
      }
      else if (item.entity === "page") {
        if (item.entity_id === "about")
          history.push({ pathname: '/about-us', state: { pageName: "About" } });
        else if (item.entity_id === "terms")
          history.push({ pathname: '/terms-conditions', state: { pageName: "Terms And Conditions" } });
        else if (item.entity_id === "policy")
          history.push({ pathname: '/privacy-policy', state: { pageName: "Privacy Policy" } });
        else if (item.entity_id === "gift-card")
          history.push({ pathname: '/gift-card', state: { pageName: "Gift Card" } });
        else if (item.entity_id === "faq")
          history.push({ pathname: '/faq', state: { pageName: "FAQ's" } });
        else if (item.entity_id === "stores")
        history.push({ pathname: '/stores', state: { pageName: "Find Stores" } });
        else
          history.push('/' + item?.entity_id);
        // }
        // else
        //   history.push('/' + item?.entity_id);

      }
      else if (item.entity === "category") {
        // const path = `${Utils.routes.PRODUCT_LIST}`;
        // history.push({ pathname: path, search: `?categoryId=${item.entity_id}`, state: { fromPath: "home" } });
        let pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item?.entity_id }, "others")
        history.push({ pathname, state: { fromPath: "home" } })

      }
     
    }
  }
  return (
    <div className={classes.multiCarousel}>
      <Carousel
        responsive={responsive}
        // removeArrowOnDeviceType="mobile"
        className={classes.carousel}
      >
        {data && Array.isArray(data) && data.map((item) => (
          <div className={classes.itemDiv} key={item.key}
            onClick={() => navigateTo(item)}

          >
            <div className={item?.web_img_path ? classes.imgDiv : clsx(classes.imgDiv, classes.noImgBackground)}>
              <img
                src={item?.web_img_path ? `${IMAGE_URL}${item.web_img_path}` : Utils.images.PRODUCT_PLACEHOLDER}
                alt="product"
                className={classes.img}
              />
            </div>
            <div className={classes.contentDiv}>
              <Typography className={classes.heading}>{item?.title || ''}</Typography>
              <Typography className={classes.paragraph}>
                {item?.description ? _.truncate(Utils.CommonFunctions.replaceHtmlTag(item.description), { length: 70 }) : ''}
              </Typography>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CardCarousel;
