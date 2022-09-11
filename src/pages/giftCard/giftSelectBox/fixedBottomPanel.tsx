import { makeStyles, Button } from "@material-ui/core";
import Utils from "../../../utils";

const useStyles = makeStyles((theme) => ({
  staticBottomContainer: {
    background: "#f9f6ed",
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 9,
    left: 0,
  },
  button: {
    background: "var(--main-opacity) !important",
    border: "1px solid var(--main-opacity) !important",
    boxSizing: "border-box",
    borderRadius: "4px",
    color: "var(--white)",
    font: `normal  ${theme.spacing(1.4)}px Work Sans`,
    fontWeight: 600,
    lineHeight: "16px",
    padding: theme.spacing(1.2),
    margin: theme.spacing(1, 0),
    width: "96%",
  },
  mainBottomContainer: {},
  btnDiv: {
    flexBasis: "15%",
  },

  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecond: {
    borderRadius:"4px",
    color: "var(--main-opacity)",
    border: "1px solid var(--main-opacity) ",
    padding: theme.spacing(0.8, 2),
    width: "94%",
  },
}));

const FixedBottomPanel = (props: any) => {
  const classes = useStyles();
  const activeStep = props.activeStep;
  const handleNext = () => {
    if (
      (activeStep === 1 ||
        //  && selectedAddress
        activeStep !== 1) &&
      activeStep < 4
    )
      props.setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if ((activeStep === 1 || activeStep !== 1) && activeStep < 4) {
      props.setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
    }
  };

  return (
    <div>
      <div className={classes.staticBottomContainer}>
        <div className={classes.mainBottomContainer}>
          <div className={classes.btnContainer}>
            {activeStep === 0 && (
              <>
                <div className={classes.btnDiv}>
                  <Button
                    fullWidth
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}
            {(activeStep === 1) && (
              <>
                <div className={classes.btnDiv}>
                  <Button
                    fullWidth
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                </div>
                <div className={classes.btnDiv}>
                  <Button
                    fullWidth
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}
            {(activeStep === 2) && (
              <>
                <div className={classes.btnDiv}>
                  <Button
                    fullWidth
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                </div>
                <div className={classes.btnDiv}>
                  <Button
                    fullWidth
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}
            {activeStep === 4 && (
              <>
                <div className={classes.btnDiv}>
                  <Button
                    fullWidth
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                </div>
               
              </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedBottomPanel;
