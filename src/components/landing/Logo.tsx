import Pic from '../../assets/logo2.png';

function Logo() {
  return (
    <div className="flex items-center ml-85 mt-10  space-x-0.7">
      <img 
        src={Pic} 
        alt="logo" 
        className="w-15 h-15 object-contain"
      />
      <span className="text-1xl font-bold text-black">ShopEase</span>
    </div>
  );
}

export default Logo;
