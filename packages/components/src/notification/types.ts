export interface Params {
  type: 'success' | 'warning' | 'info' | 'error';
  title?: string;
  message?: string;
  duration?: number;
  offset?: number;
  onClose?: () => void;
  zIndex?: number;
}
