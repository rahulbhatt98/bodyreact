import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Hidden,
} from "@material-ui/core";
import { Skeleton } from "@mui/material";
import { Helmet } from 'react-helmet';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { AboutToUsSkeleton } from "../../components/common/skeletonList/aboutToUsSkeleton";
import { ReducersModal } from "../../models";
import Utils from "../../utils";
import { getPageData } from "../footerPages/action";
import { hideSkeleton, showSkeleton } from "../home/actions";
import NotFound from "../otherPages/notFound";
import Banner from "./banner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerDiv: {
      margin: theme.spacing(4, 0),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(3, 1),
      },
      padding: "0px 50px"
    },
    img: {
      width: theme.spacing(8.4),
      height: theme.spacing(8.4),
      objectFit: "cover",
    },
    innerDiv: {},
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3
      )}px Work Sans`,
      color: "var(--green-color-100)",
      lineHeight: "35px",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          2.4
        )}px Work Sans`,
        lineHeight: "28px",
      },
      letterSpacing: "0.02em",
      margin: theme.spacing(1, 0),
    },
    version: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )}px Work Sans Medium`,
      color: "var(--light-gray)",
      lineHeight: "16px",
      margin: theme.spacing(0.5, 0),
    },
    // para: {
    //   font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
    //     1.5
    //   )}px Work Sans`,
    //   color: "var(--light-gray)",
    //   lineHeight: "22.4px",
    //   margin: theme.spacing(3, 0, 0, 0),
    //   letterSpacing: "-0.03em",
    //   [theme.breakpoints.down("xs")]: {
    //     margin: theme.spacing(2, 0, 0, 0),
    //   }
    // },
    para: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--light-gray)",
      lineHeight: "22.4px",
      margin: theme.spacing(1, 0),
      letterSpacing: "-0.03em",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, 0, 0, 0),
      },
      "& li": {
        padding: "10px 0px",
      },
      "& strong": {
        color: "#333333",
        font: `normal 700 16px Work Sans`,
      },
    },
  })
);

const GenricPage: React.FC<any> = (props) => {
  const classes = useStyles();
  const [data, setData] = useState<any>({});
  const path = useLocation()?.pathname;
  const dispatch = useDispatch();

  // const content = {
  //   "title": "Page not found",
  //   "shortDesc": "",
  //   "content": "Page not found",
  //   "version": "",
  //   "logoDesc": "",
  //   "logo": ""
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(showSkeleton());
    const urlquery = path.substring(path.lastIndexOf("/") + 1, path.length);
    dispatch(
      getPageData(urlquery, (resp: any) => {
        setData(resp?.content);
        dispatch(hideSkeleton());
      })
    );
  }, [path]);

  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const LOGO_URL = Utils.images.LOGO;
  return (
    <>
      {skeletonLoader ? (
        <>
          <Hidden xsDown>
            <Skeleton
              key={Math.random() + "aboutToUs"}
              variant="rectangular"
              height={250}
              width="100%"
            />
          </Hidden>
          <AboutToUsSkeleton />
        </>
      ) : (
        <>
          {data ? (
            <div>
              <Helmet>
                {data?.title && <title>{data?.title} | The Body Shop</title>}
                <link rel="canonical" href={window.location.href} />
                {data && <script type="application/ld+json">
                  {`
                  "@context": "http://schema.org",
                  "@type": "NewsArticle",
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                  "@id": "https://google.com/article"
                },
                  "headline": ${data.title},
                  "image": {
                    "@type": "ImageObject",
                  "url": ${data?.bannerImageUrl ? IMAGE_URL+'/'+data.bannerImageUrl : ""},
                  "height": 800,
                  "width": 800
  },
                  "datePublished": ${Utils.CommonFunctions.formatDate(data.datePublished, "MMMM DD, YYYY")},
                  "dateModified": ${Utils.CommonFunctions.formatDate(data.dateModified, "MMMM DD, YYYY")},
                  "author": {
                    "@type": "Person",
                  "name": ${data.name}
  },
                  "publisher": {
                    "@type": "Organization",
                  "name": "",
                  "logo": {
                    "@type": "ImageObject",
                  "url": ${data.logoUrl ? IMAGE_URL+'/'+data.logoUrl : ""},
                  "width": 600,
                  "height": 60
    }
  },
                  "description": ${data?.metaDesc || ""}
`}</script>}

              </Helmet>
              <Hidden xsDown>
                <Banner title={data?.title || ""} />
              </Hidden>
              <div className={classes.outerDiv}>
                {/* <img
                  src={
                    data?.logo
                      ? IMAGE_URL + "pages/" + data.logo
                      : Utils.images.PRODUCT_PLACEHOLDER
                  }
                  alt="img"
                  className={classes.img}
                /> */}
                <div className={classes.innerDiv}>
                  <Typography
                    variant="h2"
                    className={classes.heading}
                    align="center"
                  >
                    {data?.logoDesc || ""}
                  </Typography>
                  <Typography
                    variant="h4"
                    className={classes.version}
                    align="center"
                  >
                    {data?.version || ""}
                  </Typography>
                  <div
                    className={classes.para}
                    dangerouslySetInnerHTML={{ __html: data?.content || "" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <NotFound {...props} />
          )}
        </>
      )}
    </>
  );
};

export default GenricPage;
