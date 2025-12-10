import { FaRobot } from 'react-icons/fa';

const SecurityNote = () => {
  return (
    <div className="security-note flex items-center justify-center gap-3 px-6 py-4 bg-primary/10 border border-primary/25 rounded-xl max-w-xs mx-auto my-8 text-primary font-semibold text-sm md:text-base backdrop-blur-sm">
      <FaRobot className="text-lg" />
      <span>Форма защищена от спама и ботов</span>
    </div>
  );
};

export default SecurityNote;