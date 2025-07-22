import Link from "next/link";
import { FiMail, FiTwitter, FiGithub, FiArrowUpRight } from "react-icons/fi";
import { Input } from "@/components/ui/input"; // Assurez-vous que le chemin est correct
import { Button } from "@/components/ui/button"; // Assurez-vous que le chemin est correct

const links = [
  { name: "Accueil", href: "/" },
  { name: "Blogs", href: "/blogs" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "Apropos", href: "/apropos" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background/80 dark:bg-background/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row items-center lg:justify-between gap-6">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/10 p-2">
            <FiArrowUpRight className="w-6 h-6 text-primary" />
          </span>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Agora Moderna
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-4 justify-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary 
              transition-colors px-2 py-1 rounded focus-visible:outline-none 
              focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Socials and Newsletter */}
        <div className="flex flex-col items-center lg:items-end gap-4 lg:gap-3">
          {/* Socials */}
          <div className="flex gap-3">
            <a
              href="mailto:contact@agoramoderna.com"
              aria-label="Envoyer un e-mail"
              className="p-2 rounded-full hover:bg-primary/10 transition"
            >
              <FiMail className="w-5 h-5 text-muted-foreground hover:text-primary transition" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="p-2 rounded-full hover:bg-primary/10 transition"
            >
              <FiTwitter className="w-5 h-5 text-muted-foreground hover:text-primary transition" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
              className="p-2 rounded-full hover:bg-primary/10 transition"
            >
              <FiGithub className="w-5 h-5 text-muted-foreground hover:text-primary transition" />
            </a>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full max-w-sm">
            <p className="text-sm text-muted-foreground text-center lg:text-right mb-2">
              Recevez nos dernières actualités et articles directement par
              e-mail.
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2">
              <label htmlFor="email-newsletter" className="sr-only">
                Adresse e-mail
              </label>
              <Input
                type="email"
                id="email-newsletter"
                placeholder="Votre adresse e-mail"
                className="flex-1 min-w-0 text-xs font-medium" // Permet à l'input de se contracter sur mobile
              />
              <Button type="submit" className="shrink-0">
                {` S'abonner`}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="text-xs text-center text-muted-foreground py-4 border-t border-border">
        © {new Date().getFullYear()} Agora Moderna. Tous droits réservés.
      </div>
    </footer>
  );
}
