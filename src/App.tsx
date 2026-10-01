import { Routes, Route } from "react-router-dom";

import Navbar from "./sections/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import Enduro from "./sections/Enduro/Enduro";
import Parts from "./sections/Parts/Parts";
import About from "./sections/About/About";
import Footer from "./sections/Footer/Footer";
import Support from "./sections/Support/Support.tsx";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderPlaced from "./pages/OrderPlaced/OrderPlaced";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

export default function App() {
    return (
        <div id="top">
            <Navbar />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Hero />
                                <Enduro />
                                <Parts />
                                <About />
                                <Support />
                            </>
                        }
                    />

                    <Route path="/cart" element={<Cart />} />

                    <Route path="/checkout" element={<Checkout />} />

                    <Route path="/order-placed" element={<OrderPlaced />} />

                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}