import { Playfair_Display, Montserrat, UnifrakturCook } from "next/font/google";

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900", "100", "200", "300"],
});

export const unifrakturCook = UnifrakturCook({
  subsets: ["latin"],
  variable: "--font-unifrakturCook",
  weight: ["700"],
});
