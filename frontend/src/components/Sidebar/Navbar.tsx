import { Link as ScrollLink } from 'react-scroll'
const Navbar: React.FC = () => {
  return (
    <nav className="hidden md:flex flex-grow justify-center space-x-12">
      {["Home", "About", "Services", "Team"].map((item) => (
        <ScrollLink
          key={item}
          to={item.toLowerCase()} // Must match the section's ID
          smooth={true} // Enables smooth scrolling
          duration={500} // Scroll animation time
          spy={true} // Highlights active section
          offset={-50} // Adjusts for fixed headers
          className="text-base font-semibold text-[#ed3f25] cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#ed3f25] after:transition-all after:duration-300 hover:after:w-full"
        >
          {item}
        </ScrollLink>
      ))}
    </nav>
  );
};

export default Navbar;
