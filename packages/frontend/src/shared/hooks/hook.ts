import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// במקום לייבא ולהשתמש ב- useDispatch() ו- useSelector() בכל פעם,
// נשתמש בגרסה שמכירה את ה-types שלנו

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;