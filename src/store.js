import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set) => ({
	user: null,
	login: (data) => {
		localStorage.setItem("jwtToken", data.token);
		set((state) => ({ user: { ...state.user, data } }));
	},
	logout: () => {
		localStorage.removeItem("jwtToken");
		set((state) => ({ user: null }));
	},
});

store = devtools(store);
store = persist(store, { name: "user" });
const useStore = create(store);

export default useStore;
