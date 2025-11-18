import { Routes, Route, Link } from 'react-router-dom'
import  ProductList from './features/products/ProductList'
import  ProductDetails  from './features/products/ProductDetails'

export default function App() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/" 
            aria-label="Home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 10px",
              borderRadius: "8px",
              color: "#0b6cff",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >Home</Link>

        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  )
}
