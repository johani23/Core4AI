export default function InfluenceReputation({ reputation }) {
  return (
    <div className='p-4 bg-white/10 rounded-xl text-white mb-6'>
      <div className='font-bold'>Reputation</div>
      <div className='text-xl'>{reputation}%</div>
    </div>
  );
}
