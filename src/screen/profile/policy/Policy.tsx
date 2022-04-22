import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';

import HeaderBar from '@/components/header';
import Languages from '@/common/Languages';
import { MyStylesPolicy } from './styles';

const Policy = observer(() => {
    const styles = MyStylesPolicy();

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.account.policy} hasBack />
            <View style={styles.wrapAllContent}>
               
            </View>
        </View >
    );
});

export default Policy;
