import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/products";

export function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi IOMBiz Support! I have an inquiry regarding your inventory.")}`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-whatsapp text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all border-4 border-white"
        aria-label="Corporate Support"
      >
        <MessageCircle className="w-8 h-8" fill="currentColor" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-28 right-8 z-50 w-12 h-12 bg-primary text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all"
          aria-label="Return to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
