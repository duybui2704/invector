import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import HeaderBar from '@/components/header';
import Languages from '@/common/Languages';
import { MyStylesPolicy } from './styles';
import { LINKS } from '@/api/constants';

const Policy = observer(() => {
    const styles = MyStylesPolicy();

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.account.policy} hasBack />
            {/* <View style={styles.wrapAllContent}> */}
            <WebView source={{ uri: LINKS.POLICY }} />
            {/* </View> */}
        </View >
    );
});

export default Policy;
