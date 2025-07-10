import { getAllPost } from "@/actions/blogs";
import Header from "@/components/(others)/Header";
import HeroSection from "@/components/(others)/HeroSection";

export default async function Home() {
  const blogs = await getAllPost();

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto">
        <HeroSection blogs={blogs} />
        {/* Autres sections de ta page */}
      </main>
    </>
  );
}
