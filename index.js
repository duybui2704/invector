/**
 * @format
 */

import Bugsnag from '@bugsnag/react-native';
import {AppRegistry} from 'react-native';

import { name as appName } from './app.json';
import App from '@/routers/Routers';

Bugsnag.start();
AppRegistry.registerComponent(appName, () => App);
