import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Configs, PADDING_TOP } from '../../../common/config';
import { COLORS, Styles } from '../../../theme';
import DimensionUtils from '../../../utils/DimensionUtils';

export const myStylesAuth = () => {
    return useMemo(() => {
        return StyleSheet.create({
            main: {
                flex:1,
                backgroundColor: COLORS.GREEN,
                width: DimensionUtils.SCREEN_WIDTH,
                height: DimensionUtils.SCREEN_HEIGHT
            },
            tob: {
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: DimensionUtils.SCREEN_HEIGHT * 0.18,
                right: DimensionUtils.SCREEN_WIDTH * 0.18 ,
                transform : [
                    { rotateX: '-30deg' },
                    { rotateY: '0deg' },
                    { rotateZ: '40deg' }
                ]
            },
            tob1: {
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: DimensionUtils.SCREEN_HEIGHT * 0.5,
                width: 150,
                height: 30,
                right: -50,
                transform : [
                    { rotateX: '-30deg' },
                    { rotateY: '-20deg' },
                    { rotateZ: '90deg' }
                ]
            },
            tob2: {
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: DimensionUtils.SCREEN_HEIGHT * 0.16,
                right: DimensionUtils.SCREEN_WIDTH * 0.2 ,
                width: 200,
                height: 30,
                transform : [
                    { rotateX: '-30deg' },
                    { rotateY: '0deg' },
                    { rotateZ: '140deg' }
                ]
            },
            txt: {
                color: COLORS.WHITE,
                fontSize: Configs.FontSize.size20,
                borderRadius: 20
            },
            wrapContent: {
                paddingHorizontal: 16,
                flex: 1
            },
            wrapLogo: {
                alignItems: 'center',
                justifyContent: 'flex-start'
            },
            logo: {
                width: 200,
                height: 80,
                resizeMode: 'contain'
            },
            inputPhone: {
                borderRadius: 30,
                height: Configs.FontSize.size50,
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            },
            inputPass: {
                marginTop: 20,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '80%',
                height: Configs.FontSize.size50
            },
            rowInfo: {
                flexDirection: 'column',
                marginTop: 15,
                alignItems: 'flex-start',
                marginHorizontal: 4
            },
            wrapIcon: {
                flexDirection: 'row',
                marginTop: 20,
                marginBottom: Configs.IconSize.size30,
                justifyContent: 'center'
            },
            wrapAll: {
                flex: 1,
                paddingBottom: PADDING_TOP
            },
            checkbox: {
                justifyContent: 'flex-end',
                width: 50,
                height: 50
            },
            row: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: 20
            },
            inputStyle: {},
            height100: {
                height: 100
            },
            circle: {
                ...Styles.shadow,
                width: 50,
                height: 50,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 5
                // marginLeft: 15
            },
            bottom: {
                justifyContent: 'flex-start',
                flex: 1
            },
            content: {
                flex: 1.5,
                justifyContent: 'center',
                marginTop: 50
            },
            hisLop: {
                paddingVertical: 10,
                paddingLeft: 10
            },
            button: {
                backgroundColor: COLORS.GREEN,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
                paddingVertical: 15
            },
            txtSave: {
                fontFamily: Configs.FontFamily.medium,
                color: COLORS.BLACK,
                fontSize: Configs.FontSize.size12,
                marginLeft: 5
            },
            txtSubmit: {
                fontFamily: Configs.FontFamily.medium,
                color: COLORS.WHITE,
                fontSize: Configs.FontSize.size12
            }
        });
    } , []);
};
