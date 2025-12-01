import { useInfluence } from '@/context/influence/InfluenceContext';
import InfluenceTierBadge from '@/components/influence/InfluenceTierBadge';
import InfluenceXpBar from '@/components/influence/InfluenceXpBar';
import InfluenceReputation from '@/components/influence/InfluenceReputation';

export default function InfluenceHome() {
  const { influence, loading } = useInfluence();

  if (loading || !influence)
    return <div className='text-center text-gray-300 mt-20'>Loading Influence...</div>;

  return (
    <div className='max-w-4xl mx-auto text-white mt-10' dir='rtl'>
      <h1 className='text-3xl font-bold mb-6'>??????? ??????? Core4</h1>

      <InfluenceTierBadge tier={influence.tier} score={influence.score} />
      <InfluenceXpBar xp={influence.xp} xpToNext={influence.xp_to_next} />
      <InfluenceReputation reputation={influence.reputation} />
    </div>
  );
}
