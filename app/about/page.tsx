import { MainHeader } from "../(homepage)/main-header";
import { AboutHeroSection } from "./heroabout";

const AboutPage =() => {



    return (
        <div className="bg-gray-950 min-h-screen">
            <MainHeader />
            <AboutHeroSection />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                        About Us
                    </h1>
                    <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-400">
                        Our mission is to provide the best products and services to our customers.
                    </p>
                </div>
            </main>
        </div>
    )
}


export default AboutPage;