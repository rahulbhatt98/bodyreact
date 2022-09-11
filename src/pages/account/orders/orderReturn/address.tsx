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
// import AddressForm from "./addressForm";
// import MessageDialog from "../../components/common/messageDialog";
// import Utils from "../../utils";
import { useDispatch, useSelector } from "react-redux";
// import { ReducersModal } from "../../models";
// import { deleteAddress, getAddress } from "../../components/common/addToCart/action";
import AddressForm from "../../../address/addressForm";
import MessageDialog from "../../../../components/common/messageDialog";
import { ReducersModal } from "../../../../models";
import Utils from "../../../../utils";
import { deleteAddress, getAddress } from "../../../../components/common/addToCart/action";
import CustomButton from "../../../../components/common/button";
import { useHistory } from "react-router";
import BreadCrumb from "../../../../components/breadCrumb";
import GreenRadio from "../../../../components/common/customRadio";
import MobileAddress from "../../../address/mobileAddress";

// const GreenRadio = withStyles({
//   root: {
//     color: "var(--main-opacity)",
//     "&$checked": {
//       color: "var(--main-opacity)",
//     },
//     width: '16px',
//     height: '16px'
//   },
//   // checked: {},
// })((props: any) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    writeDiv: {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0),
      },
      width: '100%'

    },

    shoppingDiv: {
      padding: theme.spacing(2.5, 0),


    },
    btnName: {
      alignSelf: "center",
    },
    btn: {
      width: "15%",
      "& .makeStyles-btnProceed-64.MuiButton-root": {
        marginTop: theme.spacing(0),
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    btnDiv: {
      marginTop: "15px",
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}px Work Sans`,
      lineHeight: "28px",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "22px",
      }
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
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    addButton: {
      width: "100%",
      padding: '12px',
      textTransform: 'none',
      marginTop: '10px',
      borderRadius:"4px",

    },
    addressContent: { display: "flex", alignItems: "flex-start" },
    imgContainer: { width: '25px', height: '25px' },
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
      padding: '20px'
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
    },
    description: {
      fontSize: "13px",
      fontFamily: "Work Sans",
      fontWeight: 400,
      color: "#666666",
      marginTop: '3px'

    },
    addressCount: {
      font: `normal 700 ${theme.spacing(
        1.5
      )}px Work Sans`,
      color: "var(--secondary-black)",
      display: "flex",
      alignItems: "center",
      padding: "20px 0px"
    },
    fixedButtonContainer: {
      position: "fixed",
      bottom: "0px",
      left: "0px",
      right: "0px",
      width: "100%",
      background: "white",
      padding: "0px 10px"
    }
  })
);
// interface Props {
//   checkoutAddressId: string | null;
//   setCheckoutAddressId: Function
// }

const Address: React.FC<any> = (props: any) => {
  const address = useSelector((state: ReducersModal) => state.addressReducer.address) || []
  const selectedOrderForReturn: any = useSelector(
    (state: ReducersModal) => state.orderHistoryReducer.selectedOrderForReturn) || {};

  const [addressVisibility, setAddressVisibility] = useState(false);
  // const [addressType, setAddressType] = useState('home')
  const [confirm, setConfirmPopUp] = useState(false);
  const [selectedEditAddressId, setSelectedEditAddressId] = useState<string | null>(null)
  const [addressToBeDeleted, setAddressToBeDeleted] = useState<any>(null);
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles();
  const [checkoutAddressId, setCheckoutAddressId] = useState(null);
  const addressFlag: any =
  useSelector((state: ReducersModal) => state.addressReducer.addressFlag);


  useEffect(() => {
    window.scrollTo(0, 0);
    if (!selectedOrderForReturn?.reason?.checked) {
      return history.push("/order/list")
    }
    dispatch(getAddress((response: any) => {
      if (response?.data?.data?.length > 0) {
        const data = response?.data?.data || []
        const defaultData = data.find((item: any) => item.isDefault)
        setCheckoutAddressId(selectedOrderForReturn?.addressId || defaultData?._id || data?.[0]?._id || null)
      }
      else
        setCheckoutAddressId(null)
    }))
  }, [])

  const addAddress = () => {
    setAddressVisibility(!addressVisibility);
    setSelectedEditAddressId(null)

  };

  const onHomeEditChange = (editId: string) => {
    setSelectedEditAddressId(editId)
    setAddressVisibility(false);
  }

  const onSelectionChange = (data: any) => {
    // setAddressType(data.addressType);
    setCheckoutAddressId(data._id);
  }

  const removeAddress = () => {
    if (addressToBeDeleted?._id)
      dispatch(deleteAddress(addressToBeDeleted._id, (response: any) => {
        if (checkoutAddressId === addressToBeDeleted?._id) {
          if (response?.data?.data?.length === 0)
            setCheckoutAddressId(null)
          if (response?.data?.data?.length > 0) {
            const data = response?.data?.data || []
            const defaultData = data.find((item: any) => item.isDefault)
            setCheckoutAddressId(defaultData?._id || data?.[0]?._id || null)
          }
        }
      }))
    setConfirmPopUp(!confirm)
  }
  const handleSubmit = () => {
    dispatch({ type: 'selectedOrderForReturn', payload: { ...selectedOrderForReturn, addressId: checkoutAddressId } })
    history.push({pathname:'/slot',state:{pageName:"Pickup Slot"}})
  }

  return (
    <Grid container>
      {confirm &&
        <MessageDialog
          cancelText={'Cancel'}
          okText={'Confirm'}
          open={confirm}
          handleClose={() => setConfirmPopUp(!confirm)}
          onOk={removeAddress}
          message={'Are you sure you want to remove the address ?'}
          heading={'Remove Address'}
        />
      }
      <div className={classes.writeDiv}>
        <BreadCrumb
          breadcrumb={[
            { title: "Add Photo", action: "/add-photo" },
            { title: "Reason For Return", action: "/return-reasons" },
            { title: "Address", action: "#" },
          ]}
        />
        <Hidden xsDown>
          <div className={classes.btnDiv}>
            <div className={classes.btnName}>
              <Typography className={classes.heading}>
                Select Pick Up Address
              </Typography>
            </div>
            <div className={classes.btn}>
              {/* <Link to="/slot"> */}
              <CustomButton
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={"Next"}
                onClick={handleSubmit}
                disabled={!checkoutAddressId}
              />
              {/* </Link> */}
            </div>
          </div>
        </Hidden>
        <Hidden xsDown>
          <Grid item xs={12} md={12}>
            {/* {addressTitle && <Typography className={classes.heading}>
              {addressTitle}
            </Typography>} */}
            <div className={clsx(classes.shoppingDiv)}>
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
              <Hidden smUp>
                <Typography className={classes.addressCount}>
                  {address?.length + (address?.length > 1 ? ' Saved Addresses' : " Saved Address")}
                </Typography>
              </Hidden>


              {/* address-starts */}
              {
                address?.length > 0 && address?.map((addressData: any) => {
                  return (
                    <div key={addressData._id}>
                      {(selectedEditAddressId === addressData._id) ?
                        <AddressForm
                          section={"order-return"}
                          setAddress={() => { }}
                          checkoutAddressId={checkoutAddressId}
                          setCheckoutAddressId={setCheckoutAddressId}
                          key={addressData._id}
                          flag={'edit'}
                          data={addressData}
                          setAddressVisibility={onHomeEditChange} />
                        :
                        <div className={classes.addressContainer}>
                          <div className={classes.addressContent}>
                            <div className={classes.imgContainer}>
                              <img src={addressData.addressType === "home" ? Utils.images.HOME_ICON : addressData.addressType === "office" ? Utils.images.OFFICE_ICON : Utils.images.OTHER_ADDRESS} alt="icon" />
                            </div>
                            <div className={classes.labelContainer}>
                              <div className={classes.label}>{addressData.addressType === "home" ? 'Home' : addressData.addressType === "office" ? 'Office' : ((addressData?.otherAddressType || ''))}</div>
                              <div className={classes.description}>
                                {addressData.address1}{addressData.address2 ? `, ${addressData.address2}`:""}{addressData.city ? `, ${addressData.city}`:""}{addressData.state ? `, ${addressData.state}`:""}{addressData.pincode ? `, ${addressData.pincode}`:""}{addressData.country ? `, ${addressData.country}`:""}
                              </div>
                              <div className={classes.description}>
                                Phone: {addressData?.mobileNo || ''}
                              </div>
                              <div className={classes.buttonContainer}>
                                <Button
                                  className={classes.addressButton}
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => {
                                    setConfirmPopUp(!confirm)
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
                                  onClick={() => onHomeEditChange(addressData._id)}
                                >
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                          {<GreenRadio
                            className={classes.radioButton}
                            checked={checkoutAddressId === addressData._id}
                            onChange={() => onSelectionChange(addressData)}
                            value={addressData.addressType}
                            name="radio-button-demo"
                            inputProps={{ "aria-label": "C" }}
                          />}
                        </div>
                      }
                      <Hidden xsDown>
                        <Divider className={classes.divider} />
                      </Hidden>
                    </div>
                  )
                })
              }
              {/* office-address-ends */}
              {/* <UseCode /> */}
              {/* <Divider className={classes.divider} /> */}
              {addressVisibility ? (
                <AddressForm
                  setAddress={() => { }}
                  checkoutAddressId={checkoutAddressId}
                  setCheckoutAddressId={setCheckoutAddressId}
                  flag={'add'}
                  setAddressVisibility={setAddressVisibility} />
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
        </Hidden>
        <Hidden smUp>
          <MobileAddress
            addButtonBottom={true}
            radioButton={true}
            checkoutAddressId={checkoutAddressId}
            setCheckoutAddressId={(id:any)=>setCheckoutAddressId(id)}
            addressTitle={""}
            section={"order-return"}
          />
        </Hidden>
      </div >
      <Hidden smUp>
       { !addressFlag&&<div className={classes.fixedButtonContainer}>
          <div className={classes.btn}>
            {/* <Link to="/slot"> */}
            <CustomButton
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              text={"Next"}
              onClick={handleSubmit}
              disabled={!checkoutAddressId}
            />
            {/* </Link> */}
          </div>
        </div>
}
      </Hidden>


    </Grid >

  );
};

export default Address;
