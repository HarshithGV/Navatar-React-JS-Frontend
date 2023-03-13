import RedirectWithTimer from './RedirectWithTimer';

const App = () => {
  return (
    <div>
      <h1>Welcome to Navatar Video conferencing Room</h1>
      <RedirectWithTimer link="https://react-ts-agora-uikit.vercel.app/" delay={10000} />
    </div>
  );
};

export default App;
