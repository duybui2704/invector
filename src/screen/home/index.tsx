import { Touchable } from '@/components/elements/touchable';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import ScreenName, { TabsName } from '../../common/screenName';
import { HeaderBar } from '../../components/header';
import Navigator from '../../routers/Navigator';
import { styles } from './styles';



function Home() {
    const isFocused = useIsFocused();
    useEffect(() => {
        console.log('focus home:', isFocused);
        setTimeout(() => {
            StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
        }, 10);
    }, [isFocused]);

    return (
        <View style={styles.main}>
            <HeaderBar noHeader={false} noStatusBar isLight={true} exitApp />
            <Touchable style={{ width: 100, height: 50,marginTop:200 }}
                onPress={() => { Navigator.navigateToDeepScreen([TabsName.reportTabs], ScreenName.reportScreen); }}>
                <Text style={styles.txt}> Hello boy</Text>
            </Touchable>
        </View>
    );
};

export default Home;
