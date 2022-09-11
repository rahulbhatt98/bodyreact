import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Hidden,
} from "@material-ui/core";
import React, { useState } from "react";
import { Helmet } from 'react-helmet';
// import AccountBox from "./profile";
import SideList from "./sideList";

/**
 * Components
 */

import BreadCrumb from "../../components/breadCrumb";
import { useHistory } from "react-router";
import { getOrderHistory } from "./orders/action";
// import OrderNotFound from "./orders/orderNotFound";
import { useDispatch } from "react-redux";
import Utils from "../../utils";
// import Address from "../address";
// import { displayPartsToString } from "typescript";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerDiv: {
      backgroundColor: "var(--backgroun-color)",
      padding: theme.spacing(2, 10, 2),
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1.5, 1),

      },
      [theme.breakpoints.down("xs")]: {
        backgroundColor: "white",
        marginTop:"-40px",
        padding:"0px 10px"
      }
    },
    innerDiv: {
      marginTop: theme.spacing(4.1),
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(0),
      }
    },
    orderNotFoundContainer: {
      margin: theme.spacing(-7, 0),

    },
    addressDiv: {
      background: 'var(--white)',
      padding: "20px",
      [theme.breakpoints.down("xs")]: {
        padding: "0px",
      }
    },
    breadcrumbDiv: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}px Work Sans`,
      lineHeight: "42px",
      color: "#004236",
      marginBottom: "1px"
    },
    gridDiv:{
      [theme.breakpoints.down("xs")]: {
        padding: "10px 0px !important",
      }
    }
  })
);

const Index: React.FC = ({ children }: any) => {

  const classes = useStyles();
  const history = useHistory();
  // const [isDataEmpty, setIsDataEmpty] = useState<any>(false)
  // const dispatch = useDispatch();
  // const [currentField, setCurrentField] = useState('myAccount')

  // const checkOrderlistHasData = () => {
  //   getOrderHistory('?page=1&limit=10').then(async (resp: any) => {
  //     await dispatch({ type: 'orderHistoryData', payload: resp?.data?.data })
  //     await dispatch({ type: 'orderHistoryList', payload: resp?.data?.data?.data })
  //     const hasData = resp?.data?.data?.totalCount === 0 || (!resp?.data?.data?.totalCount) ? true : false;
  //     if (!hasData)
  //       history.push(Utils.routes.ORDER_HISTORY);
  //     // history.push({ pathname: '/order-history', state: { flag: "my-account" } });
  //     else
  //       setIsDataEmpty(true);
  //   }).catch((err: any) => {
  //   })
  // }

  return (
    <React.Fragment>
      <Helmet>
        <title>My Account | The Body Shop</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div className={classes.outerDiv}>
        <div className={classes.breadcrumbDiv}>
          <BreadCrumb
            breadcrumb={[
              { title: "Home", action: "/" },
              { title: " My Account", action: "/my-profile" },
            ]}
          />
        </div>


        <div className={classes.innerDiv}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <SideList
              // currentField={currentField}
              //  setCurrentField={setCurrentField} noDataField={isDataEmpty}
              //  checkOrderlistHasData={checkOrderlistHasData} 
              />
            </Grid>
            <Grid item xs={12} sm={9} className={classes.gridDiv}>
              <div className={classes.addressDiv}>
                <Hidden xsDown>
                {history?.location?.pathname === "/address" ?
                  <Typography variant="h4" color="primary" className={classes.heading}>
                    My Address
                  </Typography>
                  : ""
                }
                </Hidden>
                {children}
              </div>
              {/* {currentField === "addresses" &&
              <div className={classes.addressDiv}>
                  <Address
                    radioButton={false}
                    checkoutAddressId={null}
                    setCheckoutAddressId={() => { }} />
                </div>
              }
              {isDataEmpty && currentField === "orderHistory" &&
                <div className={classes.orderNotFoundContainer}><OrderNotFound message="We have no order records for this account." /></div>
              }
              {currentField === "myAccount" && <AccountBox />} */}
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
