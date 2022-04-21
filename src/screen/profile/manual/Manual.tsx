import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';

import HeaderBar from '@/components/header';
import Languages from '@/common/Languages';
import { MyStylesManual } from './styles';

const Manual = observer(() => {
    const styles = MyStylesManual();

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.account.useManual} hasBack />
            <View style={styles.wrapAllContent}>
               
            </View>
        </View >
    );
});

export default Manual;
