import Pic from '../assets/logo.png';

function Logo() {
  return (
    <div className="flex items-center space-x-2 p-4">
      {/* Logo image */}
      <img 
        src={Pic} 
        alt="logo" 
        className="w-8 h-8 object-contain" 
      />

      {/* Brand text */}
      <p className="text-lg font-semibold text-gray-800">RM</p>
    </div>
  );
}

export default Logo;
