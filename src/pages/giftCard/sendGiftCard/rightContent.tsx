import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Utils from "../../../utils";
import CustomButton from "../../../components/common/button";
import { Hidden } from "@material-ui/core";

interface Props {
  activeStep: number;
  classes: any;
  handleBack: Function;
  handleNext: Function;
  error: string;
  selectedAmount: number;
  donationAmount: number;
  handleCheckout: Function;
}
const RightContent: React.FC<Props> = ({
  activeStep,
  classes,
  handleBack,
  handleNext,
  error,
  selectedAmount,
  donationAmount,
  handleCheckout,
}: Props) => {
  const history = useHistory();
  // useEffect(() => {
  // window.scrollTo(0, 0);
  // }, []);

  return (
    <div className={classes.btnContainer}>
      {activeStep !== 4 ? (
        <>
          {activeStep === 0 ? (
            <Hidden xsDown>
              <div className={classes.btnDiv}>
                <CustomButton
                  type="button"
                  color="primary"
                  fullWidth
                  variant="outlined"
                  text={"Cancel"}
                  onClick={() => history.push({ pathname: Utils.routes.GIFT_CARD, state: { pageName: "Gift Card" } })
                  }
                />
              </div>
            </Hidden>
          ) : (
            <Hidden xsDown>
              <div className={classes.btnDiv}>
                <CustomButton
                  type="button"
                  color="primary"
                  fullWidth
                  variant="outlined"
                  text={"Back"}
                  onClick={handleBack}
                />
              </div>
            </Hidden>
          )}
          <>
            <Hidden xsDown>
              <div className={classes.btnDiv}>
                <CustomButton
                  disabled={error ? true : false}
                  type="button"
                  color="primary"
                  fullWidth
                  variant="contained"
                  text={"Next"}
                  onClick={handleNext}
                />
              </div>
            </Hidden>
            <Hidden smUp>
              <div className={classes.btnDiv}>
                <CustomButton
                  disabled={error ? true : false}
                  type="button"
                  color="primary"
                  fullWidth
                  variant="contained"
                  text={"Continue"}
                  onClick={handleNext}
                />
              </div>
            </Hidden>
          </>
        </>
      ) : (
        <>
          <Hidden xsDown>
            <div className={classes.backButton}>
              <CustomButton
                type="button"
                color="primary"
                fullWidth
                variant="outlined"
                text={"Back"}
                onClick={handleBack}
              />
            </div>
          </Hidden>

          <div className={classes.checkOutBtn}>
            <CustomButton
              type="button"
              color="primary"
              fullWidth
              variant="contained"
              text={`Continue & Pay ₹ ${selectedAmount ? Utils.CommonFunctions.addCommaToAmount(selectedAmount + donationAmount) : 0
                }`}
              onClick={handleCheckout}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default RightContent;
