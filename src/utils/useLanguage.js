import { useSelector, useDispatch } from 'react-redux';
import { selectLanguage, setLanguage } from '../store/safetyKitSlice';
import { TRANSLATIONS } from './translations';

/**
 * useLanguage Custom Hook
 * Provides reactive global language state and localized translation dictionaries.
 * Consumes Redux Toolkit store and syncs with localStorage automatically.
 */
export function useLanguage() {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);

  const changeLanguage = (newLang) => {
    dispatch(setLanguage(newLang));
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return {
    language,
    setLanguage: changeLanguage,
    t
  };
}

export default useLanguage;
