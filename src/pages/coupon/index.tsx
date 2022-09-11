import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import Utils from "../../utils";
import { useHistory } from "react-router";

/**
 * Components
 */
import CodeForm from "./codeForm";
import CodeList from './codeList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 8),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3, 2),
      },
    },
  })
);

const CouponListing: React.FC<any> = () => {
  const classes = useStyles();
  const history = useHistory();
  const  shoppingBagReducer : any = useSelector(
    (state: ReducersModal) => state.shoppingBagReducer
  );

  useEffect(() => {
    // if (shoppingBagReducer?.coupons?.length) {
    if (shoppingBagReducer?.coupons?.findIndex((item: any) => Utils.constants.appliedCouponType.indexOf(item?.belongsTo) > -1) > -1) {
      history.push(Utils.routes.SHOPPING_BAG)
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className={classes.root}>

        <CodeForm />
        <CodeList />
      </div>

    </div>
  );
};

export default CouponListing;
