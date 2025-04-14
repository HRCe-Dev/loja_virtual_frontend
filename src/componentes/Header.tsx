import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100 border-b border-gray-300 gap-4">
      {/* Logo */}
      <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
        <Link href="/">
          <Image
            src="/HRC - Serviços_e_comercio.svg"
            alt="hrce logo"
            width={130}
            height={130}
            className="h-auto"
          />
        </Link>
      </div>

      {/* Search bar */}
      <div className="w-full md:w-1/2">
        <div className="flex items-center bg-white rounded-lg px-3 py-2 w-full shadow-sm">
          <input
            type="text"
            name="searchbar"
            id="searchbar"
            placeholder="O que estás à procura?"
            className="w-full ml-2 outline-none text-sm"
          />
          <Search className="text-gray-700 ml-2" size={22} />
        </div>
      </div>

      {/* Select + nav */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        {/* Select */}
        <select
          name="ilha"
          id="ilha"
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value="sv">São Vicente</option>
          <option value="sa">Santo Antão</option>
          <option value="sn">São Nicolau</option>
          <option value="bv">Boa Vista</option>
        </select>

        {/* Links */}
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-blue-500 text-sm hover:underline">
            Login/SignIn
          </Link>
          <Link href="/cart">
            <ShoppingCart className="text-gray-700" size={22} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
