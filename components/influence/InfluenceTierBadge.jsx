export default function InfluenceTierBadge({ tier, score }) {
  return (
    <div className='p-4 rounded-xl bg-purple-900/30 border border-purple-500 text-white mb-4'>
      <div className='text-lg font-bold'>{tier}</div>
      <div className='text-sm opacity-70'>Influence Score: {score}</div>
    </div>
  );
}
