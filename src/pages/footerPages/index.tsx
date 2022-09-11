import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Hidden,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import Utils from "../../utils";
import PrivacyDetail from "./privacyDetail";
import { getPageData } from "./action";
import Banner from "./banner";
import SideOptions from "./sideOptions";
import TermDetail from "./termDetail";
import { hideLoader, hideSkeleton, showLoader, showSkeleton } from "../home/actions";
import CookiesDetails from "./cookiesDetails";
import MobileBanner from "./mobileBanner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerDiv: {
      margin: theme.spacing(4, 7),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 1),
      },
    },
  })
);

const TermsCondition: React.FC<any> = () => {
  const classes = useStyles();
  const path = useLocation()?.pathname;

  const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState()

  const getData = (title: string, slug: string) => {
    setTitle(title);
    dispatch(showSkeleton())
    dispatch(getPageData(slug, (resp: any) => {
      setContent(resp?.content)
      dispatch(hideSkeleton())
    }))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (path.includes(Utils.routes.TERMS_CONDITION)) {
      getData('Terms And Conditions', 'terms-conditions')
    } else if (path.includes(Utils.routes.PRIVACY_POLICY)) {
      getData('Privacy Policy', 'policy')
    } else if (path.includes(Utils.routes.COOKIES)) {
      getData('Cookies', 'cookies')
    }
  }, [path]);

  const FooterSideMenu = [
    {
      id: 1,
      title: "Terms And Conditions",
      link: `${Utils.routes.TERMS_CONDITION}`,
    },
    {
      id: 2,
      title: "Love Your Body™ Club",
      link: `/`,
    },
    {
      id: 3,
      title: "Cookies",
      link: `${Utils.routes.COOKIES}`,
    },
    {
      id: 4,
      title: "Privacy Policy",
      link: `${Utils.routes.PRIVACY_POLICY}`,
    },

    {
      id: 5,
      title: "Sitemap",
      link: `/`,
    },
  ];

  return (
    <div>
      <Helmet>
       {title && <title>{title} | The Body Shop</title>}
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Hidden xsDown>
        <Banner sideMenu={FooterSideMenu} title={title} content={content} />
      </Hidden>
      <Hidden smUp>
        <MobileBanner />
      </Hidden>
      <div className={classes.outerDiv}>
        <Grid container >
          <Hidden xsDown>
            <Grid item xs={12} sm={3}>
              <SideOptions sideMenu={FooterSideMenu} title={title} />
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={9}>
            {path.includes(Utils.routes.TERMS_CONDITION) ?
              <TermDetail title={title} content={content} />
              :
              path.includes(Utils.routes.PRIVACY_POLICY) ?
                <PrivacyDetail title={title} content={content} />
                :
                path.includes(Utils.routes.COOKIES) ?
                  <CookiesDetails title={title} content={content} />
                  : null
            }
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TermsCondition;
