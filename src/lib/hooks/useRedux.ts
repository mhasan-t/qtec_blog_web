import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "@/lib/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export function useRedux() {
	const useAppDispatch: () => AppDispatch = useDispatch;
	const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
	const useAppStore: () => AppStore = useStore;
	return { useAppDispatch, useAppSelector, useAppStore };
}
