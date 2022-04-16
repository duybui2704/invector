import { observer } from 'mobx-react';
import React from 'react';
import { Text, View } from 'react-native';

import HeaderBar from '@/components/header';
import Languages from '@/common/Languages';


const DetailInvestment = observer(() => {
    return (
        <View>
            <HeaderBar title={Languages.account.title} hasBack />
        </View>
    );
});

export default DetailInvestment;


