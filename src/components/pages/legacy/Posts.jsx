// src/context/ProfileContext.js
import { getUserXP, getUserBadges } from "../services/api";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const xpData = await getUserXP(1); // userId=1 (Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Âª)
      setXp(xpData.xp);
      setLevel(xpData.level);

      const badgeData = await getUserBadges(1);
      setBadges(badgeData);
    }
    fetchData();
  }, []);

  const addXP = (amount) => {
    setXp((prev) => {
      const newXP = prev + amount;
      setLevel(Math.floor(newXP / 100) + 1); // Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Å¾ 100 Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â·ÃƒËœÃ‚Â© ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Level Up
      return newXP;
    });
  };

  return (
    <ProfileContext.Provider value={{ xp, level, badges, addXP }}>
      {children}
    </ProfileContext.Provider>
  );
};


