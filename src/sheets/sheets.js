import {registerSheet} from 'react-native-actions-sheet';
import BasicSheet from './BasicSheet';
import PermissionSettingSheet from './PermissionSettingSheet';

registerSheet('basic-sheet', BasicSheet);
registerSheet('permission-setting-sheet', PermissionSettingSheet);

export {};
