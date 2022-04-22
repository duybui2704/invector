import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';

import HeaderBar from '@/components/header';
import Languages from '@/common/Languages';
import { MyStylesHelp } from './styles';

const Help = observer(() => {
    const styles = MyStylesHelp();

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.account.answer} hasBack />
            <View style={styles.wrapAllContent}>
               
            </View>
        </View >
    );
});

export default Help;
