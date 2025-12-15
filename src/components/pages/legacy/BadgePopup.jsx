// src/components/BadgePopup.jsx

const BadgePopup = ({ badge, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-yellow-200 text-black px-4 py-2 rounded-xl shadow-lg animate-bounce">
      ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¦ New Badge Unlocked: <strong>{badge.name}</strong>
    </div>
  );
};

export default BadgePopup;


