import Banner from "./banner";
import DonationUsed from "./donationUsed";
import ImageGallery from "./imageGallery";
import MiniBanner from "./minibanner";
import Overview from "./overview";


const Donation = () => {

  return (
    <div>
      <Banner />
      <MiniBanner />
      <Overview />
      <ImageGallery />
      <DonationUsed />
    </div>
  );
};

export default Donation;
