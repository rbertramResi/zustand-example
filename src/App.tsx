import './App.css';
import { selectors, useMyStore } from './store';

function App() {
  const incrementClicked = useMyStore((action) => action.incrementClicked)
  const fetchDitto = useMyStore((state) => state.fetchDitto)
  const count = useMyStore(selectors.selectCount);

  const buttonColor = useMyStore(selectors.selectButtonColor);
  const dittoHeight = useMyStore((state) => state.ditto.height)

  return (
    <div className="App">
      <strong>{count}</strong>
      <button style={{ backgroundColor: buttonColor }} onClick={incrementClicked}>Click me</button>
      <div>
        <h3>Ditto</h3>
        <button onClick={fetchDitto}>Get ditto height</button>
        <div>Height: {dittoHeight}</div>
      </div>
    </div>
  );
}

export default App;
