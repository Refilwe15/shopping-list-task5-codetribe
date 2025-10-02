import Icon from '../../assets/landingIcon.png';

function SideIcon() {
  return (
    <div className="">
      <img 
        src={Icon} 
        alt="sideicon" 
               className="w-150 h-150 right-80 top-38 absolute"
      />
    </div>
  );
}

export default SideIcon;
