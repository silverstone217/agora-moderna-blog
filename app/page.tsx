import { getAllPost } from "@/actions/blogs";
import Footer from "@/components/(others)/Footer";
import Header from "@/components/(others)/Header";
import HeroSection from "@/components/(others)/HeroSection";
import NewestBlog from "@/components/(others)/NewestBlog";
import { Suspense } from "react";

export default async function Home() {
  const blogs = await getAllPost();

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto pb-14 min-h-screen">
        <HeroSection />
        {/* Autres sections de ta page */}
        <Suspense
          fallback={
            <div className="text-lg text-gray-500 text-center">
              Charement...
            </div>
          }
        >
          <NewestBlog blogs={blogs} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
