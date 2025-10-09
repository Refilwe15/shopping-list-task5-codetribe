function Footer(){
    return (
        <>
        <footer className="bg-gray-800 text-white py-7.5  bottom-0 w-full mt-66">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </footer>
        </>
    )

}
export default Footer;