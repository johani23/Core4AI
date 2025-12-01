export default function InfluenceXpBar({ xp, xpToNext }) {
  const pct = Math.min(100, Math.floor((xp / xpToNext) * 100));
  return (
    <div className='mt-4 mb-6'>
      <div className='w-full bg-gray-700 h-3 rounded-full'>
        <div
          style={{ width: pct + "%" }}
          className='h-3 bg-purple-400 rounded-full'>
        </div>
      </div>
      <div className='text-xs text-gray-300 mt-1'>{xp} / {xpToNext} XP</div>
    </div>
  );
}
