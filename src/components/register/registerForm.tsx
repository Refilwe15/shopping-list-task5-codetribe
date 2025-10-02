import Picture from "../../components/login/picture"; // we’ll keep Picture as a separate component

function RegisterForm() {
  return (
    <>
    <Picture />
    <form className="w-140  h-150 p-8 bg-white rounded-lg shadow-md ml-110 mt-33">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
      <p className="text-gray-500 text-sm mb-6">
        Fill in your details to create a new account
      </p>

   

      {/* Surname */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="surname"
        >
          Full Name :
        </label>
        <input
          id="surname"
          type="text"
          placeholder="Enter your surname"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email :
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phone"
        >
          Phone :
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password :
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        Register
      </button>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 font-semibold hover:underline">
          Login here
        </a>
      </p>
    </form>
    </>
  );
}

export default RegisterForm;