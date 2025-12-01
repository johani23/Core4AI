// ============================================================
// ðŸ’¬ SocialFeed.jsx (v3.1 â€œRole-Aware Feedâ€)
// ------------------------------------------------------------
// âœ… Displays posts with likes, comments, buy buttons
// âœ… Shows contextual create button for creators
// ============================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePosts } from "@context/PostsContext";
import ContextualCreateButton from "@components/ContextualCreateButton";

export default function SocialFeed({ userRole="creator" }) {
  const { posts, likePost, addComment } = usePosts();
  const [commentText, setCommentText] = useState({});

  const handleLike = (id)=>likePost(id,1);
  const handleComment = (id)=>{
    const t=commentText[id]; if(!t?.trim())return;
    addComment(id,t.trim()); setCommentText({...commentText,[id]:""});
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-xl font-bold text-purple-400">Creator Feed</h2>
        <ContextualCreateButton page="feed" userRole={userRole}/>
      </div>

      {posts.filter(p=>p.mode!=="offers").length===0 && (
        <p className="text-gray-500 text-center mt-20">No posts yet. Be the first to share!</p>
      )}

      {posts.filter(p=>p.mode!=="offers").map(post=>(
        <motion.div key={post.id} layout initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-purple-400 font-semibold">
              {post.mode==="promote"?"ðŸŽ¯ Promotion":post.mode==="collab"?"ðŸ¤ Collab":"ðŸ§ Post"}
            </h3>
            <span className="text-xs text-gray-500">
              {new Date(post.id).toLocaleString()}
            </span>
          </div>

          <p className="text-gray-200 mb-4 whitespace-pre-wrap">{post.content||post.offerName}</p>

          {post.merchant && (
            <div className="bg-purple-800/20 border border-purple-700 rounded-lg p-3 mb-4 flex justify-between items-center">
              <span className="text-purple-300 text-sm">{post.merchant}</span>
              <button onClick={()=>alert(`ðŸ›ï¸ Buying ${post.merchant}`)}
                className="text-sm bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 rounded-md text-white hover:opacity-90 transition">
                Buy Now
              </button>
            </div>
          )}

          <div className="flex items-center gap-4 mb-2">
            <button onClick={()=>handleLike(post.id)} className="text-pink-400 text-sm hover:scale-110 transition">
              â¤ï¸ {post.likes||0}
            </button>
            <span className="text-gray-500 text-sm">ðŸ’¬ {post.comments?.length||0}</span>
          </div>

          <div className="flex gap-2 items-center mt-2">
            <input value={commentText[post.id]||""}
              onChange={e=>setCommentText({...commentText,[post.id]:e.target.value})}
              placeholder="Write a comment..."
              className="flex-grow bg-black/40 border border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-200 focus:ring-1 focus:ring-purple-500"/>
            <button onClick={()=>handleComment(post.id)}
              className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 rounded-md hover:opacity-90 transition">
              Send
            </button>
          </div>

          {post.comments?.length>0 && (
            <div className="mt-3 space-y-1">
              {post.comments.map((c,i)=>(
                <div key={i} className="text-gray-400 text-sm bg-black/20 rounded-md px-3 py-1">{c}</div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
