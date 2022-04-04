import React, { useCallback, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Images from '../../asset/Images';
import string from '../../common/string';
import { styles } from './styles';
import DimensionUtils from '../../utils/DimensionUtils';
 
export const assets = [Images.bg_introduce1, Images.bg_introduce2, Images.bg_introduce3];
export const width = DimensionUtils.SCREEN_WIDTH;
const Introduce = () => {
    return (
        <View style={styles.container} >
            <ScrollView snapToInterval={width} decelerationRate='normal' horizontal>
                {assets.map((source, index) => (
                    <View key={source} style={styles.picture}>
                        <ImageBackground style={styles.image} {...{ source }} resizeMode={'stretch'}>
                            <View style={styles.viewTxt}>
                                <Text style={styles.txt1}>{index === 0 ? string.txtIntroduce1 : 'aaa'}</Text>
                                <Text style={styles.txt2}>{string.txtIntroduce2}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
export default Introduce;
