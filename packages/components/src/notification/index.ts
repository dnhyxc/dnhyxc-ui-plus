import { ElNotification } from 'element-plus';
import 'element-plus/es/components/notification/style/css';
import { Params } from './types';

export const notification = ({
  title,
  message,
  type = 'success',
  duration = 1600,
  offset = 55,
  onClose,
  zIndex = 9999
}: Params) => {
  ElNotification({
    dangerouslyUseHTMLString: true,
    title,
    message,
    type,
    duration,
    offset,
    onClose,
    zIndex
  });
};
