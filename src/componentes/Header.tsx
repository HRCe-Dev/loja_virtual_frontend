import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/HRC - Serviços_e_comercio.svg"
            alt="hrce logo"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div>
        <div className="flex flex-row text-center bg-white rounded-lg px-3 py-2 w-150 ">
          <input
            type="text"
            name="searchbar"
            id="searchbar"
            placeholder="O que estás à procura?"
            className="w-full ml-2 outline-none"
          />
          <Search className="text-black mr-2 font-bold" size={25} />
        </div>
      </div>
      <div>
        <select name="ilha" id="ilha">
          <option value="sv">São Vicente</option>
          <option value="sa">Santo Antão</option>
          <option value="sn">São Nicolau</option>
          <option value="bv">Boa Vista</option>
        </select>
      </div>
      <nav className="flex flex-row items-center gap-4 mr-4">
        <Link
          href="/cadastro"
          className="text-blue-500 text-sm hover:underline"
        >
          Login/SignIn
        </Link>
        <Link href="/cart">
          <ShoppingCart />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
