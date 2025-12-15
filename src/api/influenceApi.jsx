export async function fetchInfluenceScore() {
  try {
    const r = await fetch('/api/influence/buyer_001');
    return await r.json();
  } catch {
    return {
      tier: 'Rising Micro-Influencer',
      score: 72,
      xp: 150,
      xp_to_next: 350,
      reputation: 44,
      tribe: 'Techy Tribe'
    };
  }
}

