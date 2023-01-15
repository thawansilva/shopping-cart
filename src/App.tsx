import { Navbar } from "./components/Navbar";
import ShoppingProducts from "./components/ShoppingProducts";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { FilterProvider } from "./context/FilterContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  // Adicionar no github
  return (
    <FilterProvider>
      <ShoppingCartProvider>
        <Navbar />
        <main className="container mx-auto px-5">
          <div className="md:px-0 md:flex justify-around md:justify-between">
            <Sidebar />
            <ShoppingProducts />
          </div>
        </main>
      </ShoppingCartProvider>
    </FilterProvider>
  );
}

export default App;
