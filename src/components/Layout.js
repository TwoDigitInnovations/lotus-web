import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
