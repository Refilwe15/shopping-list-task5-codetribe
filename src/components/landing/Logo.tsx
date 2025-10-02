import Pic from '../../assets/logo.png';

function Logo() {
  return (
    <div className="flex items-center ml-80 mt-10  space-x-2">
      <img 
        src={Pic} 
        alt="logo" 
        className="w-15 h-15 object-contain"
      />
      <p className="text-sm font-semibold text-gray-700">RM</p>
    </div>
  );
}

export default Logo;
