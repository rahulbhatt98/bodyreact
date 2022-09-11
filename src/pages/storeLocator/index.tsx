import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hidden } from "@material-ui/core";
import FindNearestBanner from "./findNearestBanner";
import FindNearestStore from "./findNearestStore";
import RefillScheme from "./RefillScheme";
import { getLocation } from "./action";
import MobileBanner from "./mobileBanner";
import request from "../../utils/request";
import Utils from "../../utils";
import { ReducersModal } from "../../models";

const initialDetails = [
  {
    id: 1,
    imgPath: "/assets/img/1.png",
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    address: "New Delhi, India",
  },
  {
    id: 2,
    imgPath: "/assets/img/2.png",
    name: "Mary Rosamund",
    email: "agra@rosie.com",
    address: "Tbilisi, India",
  },
  {
    id: 3,
    imgPath: "/assets/img/3.png",
    name: "Sherlock Watson",
    email: "irene@johnlock.com",
    address: "Baker Street, India",
  },
  {
    id: 4,
    imgPath: "/assets/img/4.png",
    name: "John Holmes",
    email: "mary@johnlock.com",
    address: "Baker Street, India",
  },
  {
    id: 5,
    imgPath: "/assets/img/5.png",
    name: "Mycroft Lestrade",
    email: "britishgovt@gmail.com",
    address: "London, India",
  },
];

const StoreLocator = () => {
  const dispatch = useDispatch();
  const { storesNearest } = useSelector(
    (state: ReducersModal) => state.storeReducer
  );

  React.useEffect(() => {
    window.scrollTo(0, 0)
    getLocation();
    getNearestStores();
  }, []);

  const getNearestStores = () => {
    // dispatch({ type: "reset-store-list" });
    request
      .get(Utils.endPoints.STORE_NEAREST)
      .then((resp) => {
        dispatch({
          type: "store-nearest",
          payload: { storesNearest: resp.data.data },
        });
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          // dispatch({
          //   type: "show-alert",
          //   payload: {
          //     type: "error",
          //     message: err.response.data.message,
          //   },
          // });
        }
      });
  };

  return (
    <div>
      <Hidden xsDown>
        <FindNearestStore details={initialDetails} />
      </Hidden>
      <Hidden smUp>
        <MobileBanner />
      </Hidden>

      <Hidden xsDown>
        {/* <FindNearestBanner /> */}
        <div >
          {storesNearest.length > 0 &&
            storesNearest &&
            storesNearest?.map((data, index) => {
              return (
                <RefillScheme
                  image={data.web_img_path}
                  heading={data?.title}
                  subHeading={Utils.CommonFunctions.replaceHtmlTag(
                    data?.description
                  )}
                  buttonText="Discover More"
                  isReverse={index % 2 == 0 ? false : true}
                />
              );
            })}
        </div>
        {/* <RefillScheme
          heading="OUR REFILL SCHEME"
          subHeading="Summer is officially here and we couldn’t be happier
                about it. But what does that mean for our skin?
                We all know the importance of using SPF daily,
                but we have a secret unsung hero for the summer
                months. A face toner is essential to leave skin clean
                as a whistle and prep your skin for
                moisture and protection."
          buttonText="Discover More"
          isReverse={false}
        />
        <RefillScheme
          heading="RAISE UP WITH SELF LOVE"
          subHeading="Summer is officially here and we couldn’t be happier
                about it. But what does that mean for our skin? 
                We all know the importance of using SPF daily, 
                but we have a secret unsung hero for the summer 
                months. A face toner is essential to leave skin clean
                 as a whistle and prep your skin for 
                moisture and protection."
          buttonText="Join the Uprising"
          isReverse={true}
        /> */}
      </Hidden>
    </div>
  );
};

export default StoreLocator;
