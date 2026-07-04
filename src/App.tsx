import { Routes, Route } from "react-router-dom";

import Navbar from "./sections/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import Enduro from "./sections/Enduro/Enduro";
import Parts from "./sections/Parts/Parts";
import Uniqueness from "./sections/Uniqueness/Uniqueness";
import About from "./sections/About/About";
import FAQ from "./sections/FAQ/FAQ";
import Testimonials from "./sections/Testimonials/Testimonials";
import Contact from "./sections/Contact/Contact";
import Footer from "./sections/Footer/Footer";

import Cart from "./pages/Cart/Cart";

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
                                <Uniqueness />
                                <About />
                                <FAQ />
                                <Testimonials />
                                <Contact />
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