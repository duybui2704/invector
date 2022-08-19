/**
 * @format
 */
import Bugsnag from '@bugsnag/react-native';
import {AppRegistry} from 'react-native';

import { name as appName } from './app.json';
import App from '@/routers/Routers';

if (!__DEV__) {
    console.log = () => {};
}

Bugsnag.start();
AppRegistry.registerComponent(appName, () => App);
