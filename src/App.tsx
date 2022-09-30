import './App.css';
import { selectors, useMyStore } from './store';

function App() {
  const incrementClicked = useMyStore((action) => action.incrementClicked)
  // destructure to get related states/actions
  const [fetchDitto, isFetching] = useMyStore((store) => [store.fetchDitto, store.isFetchingDitto])

  const count = useMyStore(selectors.selectCount);
  const buttonColor = useMyStore(selectors.selectButtonColor);
  const dittoHeight = useMyStore((state) => state.ditto.height)

  return (
    <div className="App">
      <strong>{count}</strong>
      <button style={{ backgroundColor: buttonColor }} onClick={incrementClicked}>Click me</button>
      <div>
        <h3>Ditto</h3>
        {isFetching && <div>Loading...</div>}
        <button onClick={fetchDitto}>Get ditto height</button>
        <div>Height: {dittoHeight}</div>
      </div>
    </div>
  );
}

export default App;
