import React, { useRef, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";

/**
 * ðŸŒ TribeGraph.jsx
 * Clean replacement for the old A-Frame 3D view.
 * Uses react-force-graph-3d + Three.js (no aframe-extras).
 */
export default function TribeGraph() {
  const graphRef = useRef();

  // ðŸ”¹ Example dataset (replace with your real tribe data later)
  const data = {
    nodes: [
      { id: "User", group: 1 },
      { id: "Core4AI-001", group: 2 },
      { id: "Core4AI-002", group: 3 },
      { id: "Core4AI-003", group: 4 },
      { id: "Core4AI-004", group: 5 },
    ],
    links: [
      { source: "User", target: "Core4AI-001" },
      { source: "User", target: "Core4AI-002" },
      { source: "Core4AI-003", target: "Core4AI-004" },
    ],
  };

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;

    // ðŸŽ¨ Node appearance
    graph.nodeThreeObject(node => {
      const color = new THREE.Color(`hsl(${node.group * 60}, 90%, 55%)`);
      const geometry = new THREE.SphereGeometry(6);
      const material = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3 });
      return new THREE.Mesh(geometry, material);
    });

    // ðŸ’« Simple ambient + directional lighting
    graph.scene().add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(50, 50, 100);
    graph.scene().add(dirLight);
  }, []);

  return (
    <div className="w-full h-[80vh] bg-black rounded-2xl shadow-lg overflow-hidden">
      <ForceGraph3D
        ref={graphRef}
        graphData={data}
        nodeLabel="id"
        linkColor={() => "rgba(255,255,255,0.3)"}
        backgroundColor="#000000"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
      />
    </div>
  );
}
