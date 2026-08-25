import { Routes, Route } from "react-router-dom";

import Navbar from "./sections/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import Enduro from "./sections/Enduro/Enduro";
import Parts from "./sections/Parts/Parts";
import About from "./sections/About/About";
import Footer from "./sections/Footer/Footer";

import Cart from "./pages/Cart/Cart";
import Support from "./sections/Support/Support.tsx";

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
                </Routes>
            </main>
            <Footer />
        </div>
    );
}