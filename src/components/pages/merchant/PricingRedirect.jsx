import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PricingRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    async function redirect() {
      try {
        const res = await fetch("/api/merchant/products");
        if (!res.ok) throw new Error("Failed to load products");

        const products = await res.json();

        if (!products.length) {
          navigate("/merchant/products");
          return;
        }

        // redirect to first product pricing
        navigate(`/merchant/pricing/${products[0].id}`);
      } catch (err) {
        console.error("Pricing redirect failed:", err);
      }
    }

    redirect();
  }, [navigate]);

  return null;
}
