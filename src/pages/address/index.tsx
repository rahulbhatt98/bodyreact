import React, { useEffect, useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Button,
  Divider,
  Typography,
  Hidden,

} from "@material-ui/core";
import clsx from "clsx";
// import Radio from "@material-ui/core/Radio";
// import { withStyles } from "@material-ui/core/styles";
import AddressForm from "./addressForm";
import MessageDialog from "../../components/common/messageDialog";
import Utils from "../../utils";
import { useDispatch, useSelector } from "react-redux";
// import { ReducersModal } from "../../models";
import {
  deleteAddress,
  getAddress,
} from "../../components/common/addToCart/action";
import GreenRadio from "../../components/common/customRadio";
import events from "../../utils/event/constant";
import { screenViewed } from "../../utils/event/action";
import { useHistory } from "react-router-dom";
import MobileAddress from "./mobileAddress";
import { ReducersModal } from "../../models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shoppingDiv: {
      padding: theme.spacing(2.5, 0),
      [theme.breakpoints.down("xs")]: {
        // overflowX: "clip",
      },
      // backgroundColor: "var( --backgroun-color)",
    },
    content: {
      [theme.breakpoints.down("xs")]: {
        margin: "0px 20px",
      },
    },

    reuseDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing(1),
    },
    reuseHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      display: "flex",
      alignItems: "center",
    },
    divider: { marginTop: "20px", marginBottom: "18px" },
    addressContainer: {
      cursor: "pointer",
      display: "flex",
      border: "1px solid #E2E2E2",
      borderRadius: 4,
      margin: theme.spacing(2, 0, 0),
      alignItems: "center",
      padding: theme.spacing(2),
      justifyContent: "space-between",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        backgroundColor: "var(--white)",
        padding: "20px",
        boxShadow: "var(--box-shadow-div)",
      },
    },
    selectedAddressContainer: {
      cursor: "pointer",
      display: "flex",
      border: "1px solid #3d847e",
      borderRadius: 4,
      margin: theme.spacing(2, 0, 0),
      alignItems: "center",
      padding: theme.spacing(2),
      justifyContent: "space-between",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        backgroundColor: "var(--white)",
        padding: "20px",
        boxShadow: "var(--box-shadow-div)",
      },
    },
    addButton: {
      width: "100%",
      padding: "12px",
      textTransform: "none",
      marginTop: "10px",
      borderRadius: "4px",
      font: `normal ${theme.spacing(1.4)}px Work Sans Medium`,

      [theme.breakpoints.down("xs")]:{
        "&.MuiButton-label":{
          font: `normal ${theme.spacing(1.4)}px Work Sans Medium`,

        }
      }
    },
    addressCount: {
      font: `normal 700 ${theme.spacing(1.5)}px Work Sans`,
      color: "var(--secondary-black)",
      display: "flex",
      alignItems: "center",
      padding: "20px 0px",
    },
    addressContent: { display: "flex", alignItems: "flex-start" },
    imgContainer: { width: "25px", height: "25px" },
    labelContainer: { marginLeft: "10px" },
    buttonContainer: { marginTop: "15px" },
    addressButton: {
      width: "80px",
      height: "28px",
      background: "#FFFFFF",
      border: " 1px solid #044236",
      boxSizing: "border-box",
      borderRadius: "4px",
      fontSize: "14px",
      textTransform: "none",
      padding: "20px",
    },
    radioButton: {
      transition: "none",
      "&:hover": { backgroundColor: "white" },
      width: "14px",
      height: "14px",
    },
    rightButton: {
      marginLeft: "13px",
    },
    label: {
      fontFamily: "Work Sans",
      fontSize: "16px",
      fontWeight: 500,
      color: "#333333",
      textTransform: "capitalize",
    },
    description: {
      fontSize: "13px",
      fontFamily: "Work Sans",
      fontWeight: 400,
      color: "#666666",
      marginTop: "3px",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Recoleta Alt`,
      lineHeight: "33px",
      color: "var(--secondary-black)",
      letterSpacing: "0.02em",
    },
  })
);
interface Props {
  radioButton?: boolean;
  checkoutAddressId: string | null;
  setCheckoutAddressId: Function;
  addressTitle?: string;
  section?: string;
}

const Address: React.FC<Props> = (props: Props) => {
  const {
    setCheckoutAddressId,
    checkoutAddressId,
    radioButton,
    addressTitle,
    section,
  } = props;
  const [addressVisibility, setAddressVisibility] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirm, setConfirmPopUp] = useState(false);
  const [selectedEditAddressId, setSelectedEditAddressId] = useState<
    string | null
  >(null);
  const [addressToBeDeleted, setAddressToBeDeleted] = useState<any>(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();


  const data: any = useSelector(
    (state: ReducersModal) => state.shoppingBagReducer
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    getAddressData();
    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_ADDRESS,
      CTGenerated: "WEB",
    });
  }, []);


  useEffect(() => {
    if (data?.address?._id)
    if(setCheckoutAddressId)
      setCheckoutAddressId(data.address._id)
  }, [data?.address?._id]);

  const getAddressData = () => {
    dispatch(
      getAddress((response: any) => {
        if (response) {
          if (response?.data?.data?.length > 0) {
            const data = response?.data?.data || [];
            setAddress(data);
            const defaultData = data.find((item: any) => item.isDefault);
            if(setCheckoutAddressId)
            setCheckoutAddressId(data?.address?._id || checkoutAddressId || defaultData?._id || data?.[0]?._id || null);
          } else {
            if(setCheckoutAddressId)
            setCheckoutAddressId(null);
          }
        }
      })
    );
  };

  const addAddress = () => {
    // history.push({
    //   pathname: "/address-form",
    //   state: {
    //     setAddress: setAddress,
    //     checkoutAddressId: checkoutAddressId,
    //     setCheckoutAddressId: setCheckoutAddressId,
    //     flag: 'add',
    //     setAddressVisibility: setAddressVisibility
    //   }
    // })
    setAddressVisibility(!addressVisibility);
    setSelectedEditAddressId(null);
  };

  const onHomeEditChange = (editId: string) => {
    setSelectedEditAddressId(editId);
    setAddressVisibility(false);
  };

  const onSelectionChange = (data: any) => {
    // setAddressType(data.addressType);
    setCheckoutAddressId(data._id);
  };

  const removeAddress = () => {
    if (addressToBeDeleted?._id)
      dispatch(
        deleteAddress(addressToBeDeleted._id, (response: any) => {
          setAddress(response?.data?.data || []);

          if (checkoutAddressId === addressToBeDeleted?._id) {
            if (response?.data?.data?.length === 0) {if(setCheckoutAddressId) setCheckoutAddressId(null)}
            if (response?.data?.data?.length > 0) {
              const data = response?.data?.data || [];
              const defaultData = data.find((item: any) => item.isDefault);
              if(setCheckoutAddressId)
              setCheckoutAddressId(defaultData?._id || data?.[0]?._id || null);
            }
          }
        })
      );
    setConfirmPopUp(!confirm);
  };
  return (
    <>
      <Hidden xsDown>
        <Grid container>
          {confirm && (
            <MessageDialog
              cancelText={"Cancel"}
              okText={"Confirm"}
              open={confirm}
              handleClose={() => setConfirmPopUp(!confirm)}
              onOk={removeAddress}
              message={"Are you sure you want to remove the address ?"}
              heading={"Remove Address"}
            />
          )}
          <Grid item xs={12} md={12}>
            {addressTitle && (
              <Typography className={classes.heading}>
                {addressTitle}
              </Typography>
            )}
            <div
              className={clsx(
                classes.shoppingDiv,
                section !== "mybag" ? classes.content : ""
              )}
            >
              {/* <Hidden smUp>
            <Button
              onClick={addAddress}
              className={clsx(classes.addButton)}
              variant="outlined"
              color="primary"
            >
              + Add New Address
            </Button>
             */}
              {section !== "mybag" && (
                <Hidden smUp>
                  <Typography className={classes.addressCount}>
                    {address?.length +
                      (address?.length > 1
                        ? " Saved Addresses"
                        : " Saved Address")}
                  </Typography>
                </Hidden>
              )}

              {/* address-starts */}
              {address?.length > 0 &&
                address?.map((addressData: any) => {
                  return (
                    <div key={addressData._id}>
                      {(selectedEditAddressId === addressData._id) ? (
                        <AddressForm
                          section={section}
                          setAddress={setAddress}
                          checkoutAddressId={checkoutAddressId}
                          setCheckoutAddressId={(id:any)=>{setCheckoutAddressId(id)}}
                          key={addressData._id}
                          flag={"edit"}
                          data={addressData}
                          setAddressVisibility={onHomeEditChange}
                        />
                      ) : (
                        <div className={checkoutAddressId === addressData._id ? classes.selectedAddressContainer : classes.addressContainer} onClick={() => onSelectionChange(addressData)} >
                          <div className={classes.addressContent}>
                            <div className={classes.imgContainer}>
                              <img
                                src={
                                  addressData.addressType === "home"
                                    ? Utils.images.HOME_ICON
                                    : addressData.addressType === "office"
                                      ? Utils.images.OFFICE_ICON
                                      : Utils.images.OTHER_ADDRESS
                                }
                                alt="icon"
                              />
                            </div>
                            <div className={classes.labelContainer}>
                              <div className={classes.label}>
                                {addressData.addressType === "home"
                                  ? "Home"
                                  : addressData.addressType === "office"
                                    ? "Office"
                                    : addressData?.otherAddressType || ""}
                              </div>
                              <div className={classes.description}>
                                {addressData.address1}{addressData.address2 ? `, ${addressData.address2}` : ""}{addressData.city ? `, ${addressData.city}` : ""}{addressData.state ? `, ${addressData.state}` : ""}{addressData.pincode ? `, ${addressData.pincode}` : ""}{addressData.country ? `, ${addressData.country}` : ""}
                              </div>
                              <div className={classes.description}>
                                Phone: {addressData?.mobileNo || ''}
                              </div>
                              <div className={classes.buttonContainer}>
                                <Button
                                  className={classes.addressButton}
                                  variant="outlined"
                                  color="primary"
                                  onClick={(evt) => {
                                    evt.stopPropagation()
                                    setConfirmPopUp(!confirm);
                                    setAddressToBeDeleted(addressData);
                                  }}
                                >
                                  Remove
                                </Button>
                                <Button
                                  className={clsx(
                                    classes.addressButton,
                                    classes.rightButton
                                  )}
                                  variant="outlined"
                                  color="primary"
                                  onClick={(evt) => {
                                    evt.stopPropagation();
                                    onHomeEditChange(addressData._id)
                                  }
                                  }
                                >
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                          {radioButton && (
                            <GreenRadio
                              className={classes.radioButton}
                              defaultChecked={data?.address?._id ? data?.address?._id === addressData._id : checkoutAddressId === addressData._id}
                              checked={checkoutAddressId === addressData._id}
                              onChange={() => onSelectionChange(addressData)}
                              value={addressData.addressType}
                              name="radio-button-demo"
                              inputProps={{ "aria-label": "C" }}
                            />
                          )}
                        </div>
                      )}
                      <Hidden xsDown>
                        <Divider className={classes.divider} />
                      </Hidden>
                    </div>
                  );
                })}
              {/* office-address-ends */}
              {/* <UseCode /> */}
              {/* <Divider className={classes.divider} /> */}
              {addressVisibility ? (
                <AddressForm
                  setAddress={setAddress}
                  checkoutAddressId={checkoutAddressId}
                  setCheckoutAddressId={(id:any)=>{setCheckoutAddressId(id)}}
                  flag={"add"}
                  setAddressVisibility={setAddressVisibility}
                  getAddressData={getAddressData}
                />
              ) : (
                // <Hidden xsDown>
                <Button
                  onClick={addAddress}
                  className={clsx(classes.addButton)}
                  variant="outlined"
                  color="primary"
                >
                  + Add New Address
                </Button>
                // </Hidden>
              )}
            </div>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <MobileAddress
          radioButton={radioButton}
          checkoutAddressId={checkoutAddressId}
          setCheckoutAddressId={(id:any)=>{if(setCheckoutAddressId) setCheckoutAddressId(id)}}
          addressTitle={addressTitle}
          section={section}
        />
      </Hidden>
    </>
  );
};

export default Address;
