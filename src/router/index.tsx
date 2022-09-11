import { ReducersModal } from "../models";
import { useSelector } from "react-redux";
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  createStyles,
  Hidden,
  makeStyles,
  Theme,
  ThemeProvider,
  Typography,

} from "@material-ui/core";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import theme from "../theme";
import Utils from "../utils";
import { getHomeData, hideLoader, hideSkeleton, showSkeleton } from "../pages/home/actions";
import { useDispatch } from "react-redux";
import request from "../utils/request";
import { getUserProfile } from "../pages/account/profile/action";
import { setSession, isAuthenticated, getAuthToken } from "../utils/session";
import { getConfig } from "../pages/home/actions";
import { getWishList } from "../pages/wishlist/action";
import { getShoppingBagList } from "../components/common/addToCart/action";
/**
 * components
 */
import PublicRoute from "./public";
import PrivateRoute from "./private";
import ErrorBoundary from "../components/ErrorBoundary";
import CustomAlert from "../components/common/alert";
import Loader from "../components/loader";
import Header from "../components/headers";
import Addvertisement from "../components/addvertisementCard";
import Footer from "../components/footers";
import MediaFooter from "../components/footers/mediaFooter";
import ChangePassword from "../pages/settings/changePassword";
import Notification from "../pages/settings/notification";
import Maintainance from "../pages/error/maintainance";

//common
const Home = lazy(() => import("../pages/home/index"));
const MobileSearch = lazy(() => import("../pages/home/mobileView/search"));
const NotFound = lazy(() => import("../pages/otherPages/notFound"));

//auth
const LoginViaOtp = lazy(() => import("../pages/login/loginViaOtp"));
const LoginViaPassword = lazy(() => import("../pages/login/loginViaPassword"));
const Signup = lazy(() => import("../pages/signup/index"));
const SocialMobile = lazy(() => import("../pages/login/socialNumber"));

//store
const StoreList = lazy(() => import("../pages/storeLocator/index"));
const StoreDetail = lazy(() => import("../pages/storeLocator/storeDetail"));

//TIPS & ADVICE
const TipsAdvice = lazy(() => import("../pages/tips&advice"));

//PLP
const ProductListing = lazy(() => import("../pages/productListing/index"));

//My Cart
const ShoppingBags = lazy(() => import("../pages/shoppingBags"));
const Address = lazy(() => import("../pages/address"));
const Delivery = lazy(() => import("../pages/delivery"));

//PDP
const ProductDetail = lazy(() => import("../pages/productDetail"));

//wishlist
const Wishlist = lazy(() => import("../pages/wishlist"));

//order
const OrderHistory = lazy(() => import("../pages/account/orders"));
const OrderDetails = lazy(() => import("../pages/account/orders/orderDetails"));
// const OrderNotFound = lazy(
//   () => import("../pages/account/orders/orderNotFound")
// );

// const OrderGiftDetail = lazy(
//   () => import("../pages/account/orders/orderGiftDetail")
// );
const ReturnPolicy = lazy(
  () => import("../pages/account/orders/orderDetails/returnPolicy")
);
const WriteToUS = lazy(
  () => import("../pages/account/orders/orderDetails/writeToUs")
);
const MyOrder = lazy(
  () => import("../pages/account/orders/orderReturn/myOrder")
);
const AddPhoto = lazy(
  () => import("../pages/account/orders/orderReturn/addPhoto")
);
const ReturnReasons = lazy(
  () => import("../pages/account/orders/orderReturn/reasonReturn")
);
const MyAddress = lazy(
  () => import("../pages/account/orders/orderReturn/address")
);
const EditProfile = lazy(() => import("../pages/account/profile/editProfile"));

const Slot = lazy(() => import("../pages/account/orders/orderReturn/slot"));

//Payment
const Payment = lazy(() => import("../pages/payment"));
const BankOffer = lazy(() => import("../pages/offers"));

//gift cards
const GiftCard = lazy(() => import("../pages/giftCard"));
const SentGiftCard = lazy(() => import("../pages/giftCard/sendGiftCard"));
const CorporateForm = lazy(() => import("../pages/giftCard/corporateForm"));
const CreateGiftCard = lazy(() => import("../pages/giftCard/createGiftCard"));
const GiftSelectBox = lazy(
  () => import("../pages/giftCard/giftSelectBox/index")
);

//my account
const Profile = lazy(() => import("../pages/account/profile"));

//coupon Listing
const CouponListing = lazy(() => import("../pages/coupon"));

//help & Support
const HelpSupport = lazy(() => import("../pages/help&Support"));
const NeedHelp = lazy(() => import("../pages/help&Support/needhelp"));
const ContactUs = lazy(() => import("../pages/help&Support/contactUs"));
// const SubmitRequest = lazy(
//   () => import("../pages/help&Support/needhelp/submitRequest")
// );
const ShowQuery = lazy(() => import("../pages/help&Support/showQuery"));
const Faq = lazy(() => import("../pages/faq/index"));
const Donation = lazy(() => import("../pages/donation/index"));
const DonationForm = lazy(() => import("../pages/donation/donationForm"));
const SelectedCategory = lazy(
  () => import("../pages/faq/mobileSelectedCategory")
);

//FooterPages
// const TermsCondition = lazy(
//   () => import("../pages/footerPages/termsCondition")
// );
// const PrivacyPolicy = lazy(
//   () => import("../pages/footerPages/privacyPolicy/index")
// );
// const Cookies = lazy(() => import("../pages/footerPages/cookies/index"));

const FooterPages = lazy(() => import("../pages/footerPages"));
const GenricPages = lazy(() => import("../pages/genericPage"));

/**
 * Root router component
 * @param props parameter for Router function
 */

//Review & List
const ReviewList = lazy(() => import("../pages/rating&review/reviews/index"));
const Wallet = lazy(() => import("../pages/wallet/index"));
const Lybc = lazy(() => import("../pages/account/lybc/index"));
const UpgradeMembership = lazy(
  () => import("../pages/account/lybc/upgradePlan")
);
const PurchaseMembership = lazy(
  () => import("../pages/account/lybc/upgradePlan/payment")
);

const SkinPreference = lazy(() => import("../pages/skinPreference/index"));
const MobileSideList = lazy(() => import("../pages/mobileSideList/index"));
const MobileMyAccount = lazy(
  () => import("../pages/account/mobileView/mobileMyAccount")
);
const PaymentMethod = lazy(
  () => import("../pages/account/paymentMethod/index")
);
const ChoosePlan = lazy(() => import("../pages/choosePlan/index"));

//About Us
const AboutUs = lazy(() => import("../pages/aboutUs/index"));

//Error Pages
// const Maintainance = lazy(() => import("../pages/error/maintainance"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mobileMoreText: {
      display: "flex",
      background: "#004236",
      color: "white",
      justifyContent: "space-between",
      padding: "20px",
    },
    mobileFooter: {
      width: "100%",
      display: "none",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
    webFooter: {
      display: "block",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    imgDown: {
      transform: "rotate(90deg)",
    },
    imgUp: {
      transform: "rotate(-90deg)",
    },
  })
);

const Router: React.FC = (props: any) => {
  const classes = useStyles();
  const [footer, showFooter] = useState<null | boolean>(false);
  const [loader, showLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [underMaintainance, setUnderMaintainance] = useState(0)
  const authToken = useSelector((state: ReducersModal) => state.homeReducer.authToken);
  const configs: any = useSelector(
    (state: ReducersModal) => state.configReducer.generalConfigs
  );
  const generalConfig = useSelector(
    (state: ReducersModal) =>
      state.configReducer.generalConfigs
  );

  function mobileCheck() {
    let Window: any = window
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || Window.opera);
    return check;
  }

  useEffect(() => {
    if (mobileCheck()) {
      //@ts-ignore
      zE('webWidget', 'hide');
    }
    if (!getAuthToken()) {
      guestSignup()
    } else {
      dispatch({ type: Utils.ActionName.AUTH_TOKEN, payload: { authToken: getAuthToken() } })
    }

    if (isAuthenticated()) {
      dispatch(getWishList({ limit: 10, page: 1 }));
      dispatch(getShoppingBagList());
    }

    if (localStorage.getItem("_id")) {
      showLoader(true);
      dispatch(
        getUserProfile(() => {
          showLoader(false);
          // getBalance();
        })
      );
    }
  }, [getAuthToken()]);

  useEffect(() => {
    console.log("generalConfig?.underMaintainance",generalConfig?.underMaintenance)
    setUnderMaintainance(generalConfig?.underMaintenance)
  }, [generalConfig?.underMaintenance])

  const guestSignup = () => {
    const header = Utils.CommonFunctions.getApiAuthHeader();
    request
      .post(Utils.endPoints.GUEST_SIGNUP, {}, { headers: header })
      .then((resp) => {
        dispatch({ type: Utils.ActionName.AUTH_TOKEN, payload: { authToken: resp?.data?.data?.authToken } })
        setSession(resp.data.data);
        localStorage.setItem("guestUser", "true");
        // window.location.href = Utils.routes.LOGIN_OTP;

        // history.push

        // if (window.screen.width < 768) {
        //   window.location.href = Utils.routes.LOGIN_OTP;
        // } else {
        //   window.location.reload()
        // }
      })
      .catch((err) => { });
  }

  // const getBalance = () => {
  //   dispatch(
  //     getWalletBalance((resp: any) => {
  //       dispatch(hideSkeleton());
  //     })
  //   );
  // };

  useEffect(() => {
    // if (localStorage.getItem("_id")) {
    //   showLoader(true);
    //   dispatch(
    //     getUserProfile(() => {
    //       showLoader(false);
    //     })
    //   );
    // }
    dispatch(showSkeleton());
    if (authToken) {
      dispatch(
        getHomeData(() => {
          dispatch(hideSkeleton());
          dispatch(hideLoader());
        })
      );
    }

    dispatch(getConfig({ configCode: "general" }));
    dispatch(getConfig({ configCode: "payment" }));


  }, [authToken]);


  // const dispatch = useDispatch()

  // let showAlert = true;
  // React.useEffect(() => {
  //   if (!navigator.onLine && showAlert) {
  //     showAlert = false;
  //     dispatch({
  //       type: "show-alert",
  //       payload: {
  //         type: "error",
  //         message: "You are offline. Please check internet connection",
  //       },
  //     });
  //   }

  // }, [navigator.onLine])

  const customAlert = useSelector((state: ReducersModal) => state.alertReducer);
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  return (
    underMaintainance === 1 ?
      <Maintainance /> :

      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <CustomAlert
          position={customAlert.position ?? "right"}
          show={customAlert.show}
          type={customAlert.type}
          message={customAlert.message}
        />

        <Loader show={loader} />

        {/* <Hidden smUp>
        <div className={classes.phoneDiv}>
        <ArrowBackIcon color="primary" />
        <Typography
        color="primary"
        variant="h3"
        className={classes.phoneHeading}
        >
        The Body Shop
        </Typography>
        
        </div>
      </Hidden> */}

        <BrowserRouter>
          {/* <Switch>
          <Route path="/maintainance" exact component={Maintainance} />
        </Switch> */}

          <ErrorBoundary key={props?.location?.pathname}>
            <Header />
            {/* {bannerData?.status === "1" && ( */}
            <Hidden xsDown>
              <Addvertisement key="promotional_banner" />
            </Hidden>

            <Switch>
              {/* Public Route */}
              <PublicRoute exact path="/" component={Home} />
              {/* <PublicRoute path={Utils.routes.MAINTAINANCE} exact component={Maintainance} /> */}
              {/* AUTH */}
              <PublicRoute
                authentication
                exact
                path={Utils.routes.LOGIN_OTP}
                component={LoginViaOtp}
              />
              <PublicRoute
                authentication
                exact
                path={Utils.routes.LOGIN_EMAIL}
                component={LoginViaPassword}
              />
              (
              <PublicRoute exact path={Utils.routes.SIGNUP} component={Signup} />
              <PublicRoute
                authentication
                exact
                path={Utils.routes.SOCIAL_MOBILE}
                component={SocialMobile}
              />
              {/* store */}
              <PublicRoute
                exact
                path={Utils.routes.STORE}
                component={StoreList}
              />
              <PublicRoute
                exact
                path={Utils.routes.MOBILE_SEARCH}
                component={MobileSearch}
              />
              <PublicRoute
                exact
                path={Utils.routes.STORE_DETAIL}
                component={StoreDetail}
              />
              {/* PLP */}
              <PublicRoute
                exact
                path={Utils.routes.PRODUCT_DETAIL}
                component={ProductDetail}
              />
              <PublicRoute
                exact
                path={[
                  Utils.routes.PRODUCT_LIST,
                  Utils.routes.PRODUCT_SEARCH_LIST,
                ]}
                component={ProductListing}
              />
              {/* PDP */}
              {/* AboutUs */}
              <PublicRoute
                exact
                path={Utils.routes.ABOUT_US}
                component={AboutUs}
              />
              {/* My Cart */}
              <PublicRoute
                exact
                path={[Utils.routes.SHOPPING_BAG, "/shopping-bag/address", "/shopping-bag/delivery", "/shopping-bag/payment"]}
                component={ShoppingBags}
              />
              {/* Protected Routes */}
              <PrivateRoute
                exact
                path={Utils.routes.CHOOSE_PLAN}
                component={ChoosePlan}
              />
              {/* My Cart */}
              <PublicRoute
                exact
                path={Utils.routes.DELIVERY}
                component={Delivery}
              />
              <PrivateRoute
                exact
                path={Utils.routes.MOBILE_SIDE_LIST}
                component={MobileSideList}
              />
              <PrivateRoute
                exact
                path={Utils.routes.MOBILE_MY_ACCOUNT}
                component={MobileMyAccount}
              />
              {/* Tips & Advices */}
              <PublicRoute
                exact
                path={Utils.routes.TIPS_ADVICE}
                component={TipsAdvice}
              />
              {/* Donation */}
              <PublicRoute
                exact
                path={Utils.routes.DONATION}
                component={Donation}
              />
              <PublicRoute
                exact
                path={Utils.routes.REVIEW_LIST}
                component={ReviewList}
              />
              <PublicRoute exact path={Utils.routes.FAQ} component={Faq} />
              <PublicRoute
                exact
                path={Utils.routes.SELECTED_CATEGORY}
                component={SelectedCategory}
              />
              {/* Payment */}
              <PrivateRoute
                exact
                path={Utils.routes.PAYMENT}
                component={Payment}
              />
              {/* PaymentMethod */}
              <PublicRoute
                exact
                path={Utils.routes.BANKOFFER}
                component={BankOffer}
              />
              {/* Footer Pages */}
              {/* <PublicRoute
              exact
              path={Utils.routes.TERMS_CONDITION}
              component={TermsCondition}
            />
            <PublicRoute
              exact
              path={Utils.routes.PRIVACY_POLICY}
              component={PrivacyPolicy}
            />
          <PublicRoute
              exact
              path={Utils.routes.COOKIES}
              component={Cookies}
            /> */}
              <PublicRoute
                exact
                path={[
                  Utils.routes.TERMS_CONDITION,
                  Utils.routes.PRIVACY_POLICY,
                  Utils.routes.COOKIES,
                ]}
                component={FooterPages}
              />
              {/* Coupon Listing */}
              <PrivateRoute
                exact
                path={Utils.routes.COUPON_LISTING}
                component={CouponListing}
              />
              <PublicRoute
                exact
                path={Utils.routes.DONATION_FORM}
                component={DonationForm}
              />
              {/* Gift Card */}
              <PublicRoute
                exact
                path={Utils.routes.GIFT_CARD}
                component={GiftCard}
              />
              <PrivateRoute
                exact
                path={Utils.routes.SENT_GIFT_CARD}
                component={SentGiftCard}
              />
              <PrivateRoute
                exact
                path={Utils.routes.CORPORATE_FORM}
                component={CorporateForm}
              />
              <PrivateRoute
                exact
                path={Utils.routes.CREATE_GIFT}
                component={CreateGiftCard}
              />
              <PrivateRoute
                exact
                path={Utils.routes.GIFT_SELECT_BOX}
                component={GiftSelectBox}
              />
              {/* profile */}
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.MY_PROILE}
                component={Profile}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.SKIN_PREFERENCE}
                component={SkinPreference}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.ADDRESS}
                component={Address}
              />
              {/* Help & Support */}
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.HELP_SUPPORT}
                component={HelpSupport}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.NEED_HELP}
                component={NeedHelp}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.PAYMENT_METHOD}
                component={PaymentMethod}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.WALLET}
                component={Wallet}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.MOBILE_EDIT_PROFILE}
                component={EditProfile}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.LYBC}
                component={Lybc}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.UPGRADE_MEMBERSHIP}
                component={UpgradeMembership}
              />
              <PrivateRoute
                exact
                path={Utils.routes.PURCHASE_MEMBERSHIP}
                component={PurchaseMembership}
              />
              {/* <PrivateRoute
              exact
              path={Utils.routes.SUBMIT_REQUEST}
              component={SubmitRequest}
            /> */}
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.WRITE_TO_US}
                component={WriteToUS}
              />
              <PrivateRoute
                exact
                path={Utils.routes.SHOW_QUERY}
                component={ContactUs}
                data={{ section: "profile" }}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.ORDER_HISTORY}
                component={OrderHistory}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.RETURN_POLICY}
                component={ReturnPolicy}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.ORDER_DETAIL}
                component={OrderDetails}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.MY_ORDER}
                component={MyOrder}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.ADD_PHOTO}
                component={AddPhoto}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.RETURN_REASONS}
                component={ReturnReasons}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.MY_ADDRESS}
                component={MyAddress}
              // component={Address}
              />
              {/* <PrivateRoute
                exact
                path={Utils.routes.SLOT}
                component={Slot}
                data={{ section: "profile" }}
              /> */}
              <PrivateRoute
                exact
                path={Utils.routes.SLOT}
                component={Slot}
                data={{ section: "profile" }}
              />
              <PrivateRoute
                exact
                path={Utils.routes.OLDER_QUERIES}
                component={ShowQuery}
                data={{ section: "profile" }}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.WISHLIST}
                component={Wishlist}
              />
              {/* <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.ADDRESS_FORM}
                component={AddressForm}
              /> */}
              {/* settings */}
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.CHANGE_PASSWORD}
                component={ChangePassword}
              />
              <PrivateRoute
                data={{ section: "profile" }}
                exact
                path={Utils.routes.NOTIFICATION}
                component={Notification}
              />
              <PublicRoute
                exact
                path={Utils.routes.GENRIC_PAGE}
                component={GenricPages}
              />
              <Route
                component={(props: object) => (
                  <Suspense fallback={<Loader show={true} />}>
                    <NotFound {...props} />
                  </Suspense>
                )}
              />
            </Switch>

            {/* )} */}
            {skeletonLoader ? null : (
              <Hidden xsDown>
                <div className={classes.mobileFooter}>
                  {!footer ? (
                    <div
                      className={classes.mobileMoreText}
                      onClick={() => {
                        showFooter(true);
                        // var msgList = document.getElementById("mobileMoreText");
                        // if (msgList)
                        //   msgList.scrollTop = msgList.scrollHeight;
                      }}
                    >
                      <Typography>
                        More about online shopping at The Body Shop
                      </Typography>
                      <img
                        alt="arrow"
                        className={classes.imgDown}
                        src={Utils.images.ARROW_NEXT}
                      />
                    </div>
                  ) : (
                    <div
                      className={classes.mobileMoreText}
                      onClick={() => showFooter(false)}
                    >
                      <Typography>
                        More about online shopping at The Body Shop
                      </Typography>
                      <img
                        alt="arrow"
                        className={classes.imgUp}
                        src={Utils.images.ARROW_NEXT}
                      />
                    </div>
                  )}
                  {footer && (
                    <>
                      <MediaFooter />
                      <Footer />
                    </>
                  )}
                </div>
              </Hidden>
            )}
            {skeletonLoader ? null : (
              <div className={classes.webFooter}>
                <MediaFooter />
                <Footer />
              </div>
            )}
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
  );
};

export default Router;
