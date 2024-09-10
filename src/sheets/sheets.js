import {registerSheet} from 'react-native-actions-sheet';
import PermissionSettingSheet from './PermissionSettingSheet';
import NoInternetSheet from './NoInternetSheet';

registerSheet('permission-setting-sheet', PermissionSettingSheet);
registerSheet('no-internet-sheet', NoInternetSheet);

export {};
