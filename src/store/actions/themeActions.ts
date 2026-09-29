export const TOGGLE_THEME = 'theme/TOGGLE_THEME';

export interface ToggleThemeAction {
  type: typeof TOGGLE_THEME;
}

export type ThemeActionTypes = ToggleThemeAction;

export const toggleTheme = (): ToggleThemeAction => ({
  type: TOGGLE_THEME,
});
