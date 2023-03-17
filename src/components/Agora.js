import RedirectWithTimer from './RedirectWithTimer';
import { getSelectedTime } from './selectedTime';

const App = () => {
  const selectedTime = getSelectedTime();
  return (
    <div>
      <h1>Welcome to Navatar Video conferencing Room</h1>
      <h1>{selectedTime}</h1>
      <RedirectWithTimer link="https://react-ts-agora-uikit.vercel.app/" delay={10000} />
    </div>
  );
};

export default App;
