import Icon from '../assets/landingIcon.png';

function SideIcon() {
  return (
    <img 
      src={Icon} 
      alt="sideicon" 
      className="w-32 h-32 fixed top-1/2 left-6 transform -translate-y-1/2 opacity-90"
    />
  );
}

export default SideIcon;
