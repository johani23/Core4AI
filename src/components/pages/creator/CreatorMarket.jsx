// ============================================================
// ðŸ’Ž CreatorMarket.jsx (MVP-53.5 Visual Dynamics)
// ============================================================

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useVISSocket from "@hooks/useVISSocket";

const API_BASE = "http://127.0.0.1:8000";

export default function CreatorMarket() {
  const [market, setMarket] = useState([]);

  const fetchMarket = () => {
    fetch(`${API_BASE}/market`)
      .then((r) => r.json())
      .then((d) => setMarket(d.market || []));
  };

  useEffect(() => { fetchMarket(); const i=setInterval(fetchMarket,5000); return ()=>clearInterval(i); }, []);

  // Live WebSocket updates
  useVISSocket((pkt)=>{
    if(pkt.type==="vis_update"){
      setMarket((prev)=>prev.map((c,j)=>j===pkt.creator_id-1?{...c,vis:pkt.new_vis,price:pkt.token_price}:c));
    }
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">Creator League Market</h1>
      <table className="w-full text-left border-t border-gray-700">
        <thead className="text-gray-400 text-sm uppercase">
          <tr><th>#</th><th>Name</th><th>VIS</th><th>Token Price</th><th>Momentum</th></tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {market.map((c,i)=>(
              <motion.tr key={i}
                initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                transition={{duration:0.4}}
                className="border-b border-gray-800 hover:bg-gray-900 cursor-pointer"
                onClick={()=>window.location.href=`/creator/${i+1}`}>
                <td className="py-1 text-gray-500">{i+1}</td>
                <td>{c.name}</td>
                <td className="text-green-400">{c.vis.toFixed(3)}</td>
                <td className="text-blue-400">{c.price.toFixed(2)} CT</td>
                <td className="w-1/3">
                  <motion.div className="h-2 bg-yellow-400 rounded-full"
                    initial={{width:0}} animate={{width:`${Math.min(c.vis*100,100)}%`}}
                    transition={{duration:0.6}}/>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
