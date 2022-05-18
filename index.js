/**
 * @format
 */

import {AppRegistry} from 'react-native';

import { name as appName } from './app.json';
import App from '@/routers/Routers';

AppRegistry.registerComponent(appName, () => App);
