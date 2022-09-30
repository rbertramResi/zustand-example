import produce from 'immer';
import create from 'zustand';

const DITTO_API = 'https://pokeapi.co/api/v2/pokemon/ditto';

type CounterState = {
  count: number;
  ditto: { height: number };
  isFetchingDitto: boolean;
}
type CounterActions = {
  incrementClicked: () => void;
  resetCounter: () => void;
  fetchDitto: () => Promise<void>
}
type CounterStore = CounterState & CounterActions;

// we can separate actions to make them easier to test
// or write them inline in the create function
const resetCounterAction = (): Partial<CounterState> => ({ count: 0 });


const immerSet = <T, S extends Function>(set: S) => (cb: Param<T>) => set(produce(cb));
// state and actions go in this in this 
export const useMyStore = create<CounterStore>((set, get) => {
  // todo define set state and remove second generic
  const s = immerSet<CounterState, any>(set);

  return {
    //state
    count: 0,
    ditto: { height: 0 },
    isFetchingDitto: false,

    // actions
    incrementClicked: () => s((state: CounterState) => ({ count: state.count + 1 })),
    resetCounter: () => s(resetCounterAction),

    // async action example
    fetchDitto: async () => {
      if (get().isFetchingDitto) {
        return
      }
      s(() => ({ isFetchingDitto: true }))

      const dittoResponse = await fetch(DITTO_API)
      const ditto = await dittoResponse.json();

      s(() => ({ ditto, isFetchingDitto: false }))
    },
  }
})


// could include selector pattern in store
// or they can be placed inline in component
export const selectors = {
  selectButtonColor(state: CounterState): 'green' | 'orange' {
    return state.count % 2 === 0 ? 'green' : 'orange';
  },
  selectCount(state: CounterState): number {
    return state.count;
  },
}
// these can be moved to a helper in real life
type Param<T> = (state: T) => Partial<T> | void
// type SetParam = Parameters<Parameters<typeof create>[0]>[0]; 

