import { getAllPost } from "@/actions/blogs";
import CategoryBlogSection from "@/components/(others)/CategoryBlogSection";
import Footer from "@/components/(others)/Footer";
import Header from "@/components/(others)/Header";
import HeroSection from "@/components/(others)/HeroSection";
import LatestBlogSection from "@/components/(others)/LatestBlogSection";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const blogs = await getAllPost();

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto pb-14">
        <HeroSection />
        {/* Autres sections de ta page */}
        {blogs.length > 0 && <LatestBlogSection blogs={blogs} />}

        <div className="py-4">
          <Separator />
        </div>
        {/* catgeory section */}
        {blogs.length > 0 && (
          <CategoryBlogSection blogs={blogs} category="nature" />
        )}
        <div className="py-4">
          <Separator />
        </div>
        {blogs.length > 0 && (
          <CategoryBlogSection blogs={blogs} category="it" />
        )}
      </main>
      <Footer />
    </>
  );
}
