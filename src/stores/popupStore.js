import { writable } from 'svelte/store';

const setupValues =
{
  visible: false,
  content: null,
  type: null
}

function createPopupStore() {
    const { subscribe, set, update } = writable(setupValues);

    return {
      subscribe,
      msg: async (content, type = null) => {
        console.log('iks');
        update(v => {
          v.visible = true
          v.content = content
          return v;
        })
        setTimeout(() => {
          update(v => {
            v.visible = false
            return v
          })
        }, 5000)
      },
      clear: () => {
        update(v => {
          v.visible = false
          v.content = null
          return v;
        })
      },
      reset: () => set({})
    };
}
export const popupStore = createPopupStore();
