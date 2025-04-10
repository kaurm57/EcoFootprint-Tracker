import { Link } from 'react-router-dom';

const Navbar = ({

    categories,
    currentCategoryIndex,
    isCurrentCategoryComplete,
    handleCategoryClick,
    getCategoryButtonStyle,
    
    }) => (
<nav className="flex items-center justify-between mt-2 py-2 px-[2rem]">
  {/* Left: Logo */}
  <div>
    <Link to="/">
      <span className="text-2xl font-bold text-green-800 hover:text-green-700">
        EcoFootprint
      </span>
    </Link>
  </div>

  {/* Center: Tabs */}
  <div className="flex items-center space-x-4">
    {categories.map((cat, index) => (
      <button
        key={index}
        disabled={index > currentCategoryIndex && !isCurrentCategoryComplete()}
        onClick={() => handleCategoryClick(index)}
        className={`px-3 py-1 rounded-full ${getCategoryButtonStyle(index)} text-white`}
      >
        {cat.name}
      </button>
    ))}
  </div>

  {/* Right: Dummy element to balance the layout */}
  <div className="w-[calculated-width] invisible">
    {/* This empty element should have the same width as the logo container */}
  </div>
</nav>

  );

  export default Navbar;