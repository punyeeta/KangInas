import Icon1 from "../../assets/services_icon1.png"
import Icon2 from "../../assets/services_icon2.png"
import Icon3 from "../../assets/services_icon3.png"

interface FeatureItem {
  image: string; // URL or import path for the image
  title: string;
  description: string;
  bgColor?: string;
}


const FeatureItem: React.FC<FeatureItem> = ({ image, title, description, bgColor = "#2E2E78" }) => {
  return (
    <div className="w-62">
      <div className={`text-white flex items-center p-6 rounded-lg shadow-sm`} style={{ backgroundColor: bgColor }}>
        <img src={image} alt={title} className="w-16 h-16 mr-4" />
        <div>
          <h3 className="text-lg font-bold uppercase">{title}</h3>
        </div>
      </div>
      <p className="text-sm text-center text-[#6C6C6C] mt-4 mb-2">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-15 md:p-24 md:flex-row md:items-baseline md:justify-around md:gap-5">
        <FeatureItem image={Icon1} title="EASY ORDER SYSTEM." description="Seamlessly place your orders with just a few taps for a hassle-free experience."/>
        <FeatureItem image={Icon2} title="QUALITY FOOD." description="Savor expertly crafted dishes made with the finest and local ingredients." bgColor="#EC4024"/>
        <FeatureItem image={Icon3} title="QUICK DELIVERY." description="Enjoy fast, fresh, and flavorful meals delivered straight to your doorstep."/>
    </div>
  )
}

export default Features
