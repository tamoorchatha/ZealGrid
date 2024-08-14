import {Login} from "../components/index";
import TT from "../assets/TT.svg";
import ZealGrid from "../assets/ZealGrid.svg";
import RadioButton from "../assets/RadioButton.svg";

export default function Signin() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F9F9F9" }}>
      <div className="flex w-full max-w-screen-lg mx-auto p-8 relative">
        <Login />
      <div className="w-1/2 relative flex items-center justify-center">
          <div className="absolute" style={{ top: '20px', left: '70%', transform: 'rotate(-10.45deg)' }}>
            <img src={TT} alt="TT SVG" style={{ width: '162.87px', height: '112.46px' }} />
          </div>
          <div className="absolute" style={{ top: '50%', left: '70%', transform: 'translateY(-50%)' }}>
            <img src={ZealGrid} alt="Zeal Grid SVG" className="w-48" />
          </div>
          <div className="absolute" style={{ bottom: '20px', left: '70%' }}>
            <img src={RadioButton} alt="Radio Button SVG" className="w-24 transform rotate-25" />
          </div>
        </div>

      </div>
    </div>
  );
}
