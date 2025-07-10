import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // ou une autre icône que tu préfères

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const threshold = window.innerHeight * 1; // 4x hauteur écran
      setVisible(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Vérifie au montage si on doit afficher le bouton
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // défilement doux
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
      className="
        fixed bottom-8 right-8 z-50
        bg-primary p-3 rounded-full shadow-lg
        hover:bg-primary/90 transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-primary/70
        flex items-center justify-center
        w-12 h-12 dark:text-black text-white
      "
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;
