import { makeStyles, createStyles, Theme } from "@material-ui/core";
import GiftBanner from "./giftBanner";
import HaveYouSeen from "../haveYouSeen";
import SendGift from "./sendGift";
import CreateGiftHim from "./createGiftHim";
import SomethingCatch from "./somethingCatch";
import {useHistory} from "react-router-dom";
import Utils from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    giftRoot: {
      padding: theme.spacing(4, 6),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3, 2),
      },
    },
  })
);

function CreateGiftCard() {
  const classes = useStyles();
  const history = useHistory();
 
  return (
    <div>
      <GiftBanner
        data={{
          title: "Lorem ipsum dolor",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporut labore et magna aliquaad, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporut labore et magna aliquaad, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporut labore et magna aliquaad, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporut labore et magna aliquaad, quis nostrud exercitation ullamco laboris  ",
        }}
      />
      <div className={classes.giftRoot}>
        <SendGift />
      </div>
      <CreateGiftHim
        heading="Create Gift for Him"
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
      <CreateGiftHim
        heading="Create Gift for Her"
        subHeading="Summer is officially here and we couldn’t be happier
                about it. But what does that mean for our skin?
                We all know the importance of using SPF daily,
                but we have a secret unsung hero for the summer
                months. A face toner is essential to leave skin clean
                as a whistle and prep your skin for
                moisture and protection."
        buttonText="Join the Uprising"
        isReverse={true}
      />
      <SomethingCatch />
      <HaveYouSeen />
    </div>
  );
}

export default CreateGiftCard;
