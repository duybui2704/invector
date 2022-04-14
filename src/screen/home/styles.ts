import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import DimensionUtils from '@/utils/DimensionUtils';
import { COLORS, Styles } from '@/theme';


export const MyStylesHome = () => {
    return useMemo(() =>
        StyleSheet.create({
            main: {
                flex: 1,
                backgroundColor: COLORS.WHITE_GRAY1
            },
            txt: {
                fontSize: 18,
                color: COLORS.BLACK,
                fontWeight: '600'
            },
            viewTop: {
                position: 'absolute',
                top: DimensionUtils.SCREEN_HEIGHT * 0.12,
                height: DimensionUtils.SCREEN_HEIGHT * 0.3,
                width: '100%',
                // justifyContent: 'center',
                alignItems: 'center'
            },
            txt1: {
                fontSize: 14,
                fontWeight: '600',
                color: COLORS.WHITE
            },
            txt2: {
                fontSize: 24,
                fontWeight: '600',
                color: COLORS.WHITE
            },
            txt3: {
                fontSize: 14,
                fontWeight: '600',
                color: COLORS.GRAY,
                marginHorizontal: 20
            },
            txt4: {
                fontSize: 16,
                fontWeight: '600',
                color: COLORS.WHITE,
                marginHorizontal: 20
            },
            viewTop1: {
                flexDirection: 'row'
            },
            viewTop2: {
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginLeft: 20
            },
            viewTop3: {
                flexDirection: 'column',
                alignItems: 'center'
            },
            viewTxt: {
                paddingVertical: 5,
                marginLeft: -8
            },
            viewTxt1: {
                paddingVertical: 5,
                marginLeft: -35
            },
            viewTob: {
                ...Styles.shadow,
                flexDirection: 'row',
                // marginHorizontal: '5%',
                width: '90%',
                height: DimensionUtils.SCREEN_HEIGHT * 0.08,
                backgroundColor: COLORS.WHITE,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center'
            },
            tob: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            txtTob: {
                fontSize: 10,
                fontWeight: '600',
                color: COLORS.GRAY,
                marginHorizontal: 20
            },
            viewCenter: {
                marginTop: DimensionUtils.SCREEN_HEIGHT * 0.22,
                marginHorizontal: 10
            },
            item: {
                width: '100%',
                height: DimensionUtils.SCREEN_HEIGHT * 0.2,
                borderRadius: 10,
                backgroundColor: COLORS.WHITE,
                marginVertical: 5
            },
            itemChild: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 8
            },
            itemRight: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                position: 'absolute',
                right: 0
            },
            itemLeft: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                position: 'absolute',
                left: -13
            },
            viewTobRight: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 8
            },
            tobItem: {
                width: 120,
                height: 30,
                backgroundColor: COLORS.GREEN,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            },
            more: {
                width: '100%',
                height: 50,
                alignItems: 'center'
            },
            viewVfs: {
                ...Styles.shadow,
                flexDirection: 'row',
                // marginHorizontal: '5%',
                width: '100%',
                height: DimensionUtils.SCREEN_HEIGHT * 0.12,
                backgroundColor: COLORS.WHITE,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center'
            },
            txtVfs: {
                flexDirection: 'column'
            },
            viewBottom: {
                ...Styles.shadow,
                flexDirection: 'column',
                // marginHorizontal: '5%',
                width: '100%',
                height: DimensionUtils.SCREEN_HEIGHT * 0.22,
                backgroundColor: COLORS.WHITE,
                borderRadius: 15,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginVertical: 20,
                padding: 10
            },
            icon: {
                justifyContent: 'flex-end',
                alignItems: 'center'
            },
            txtQuestion: {
                flex:1,
                flexDirection: 'row',
                paddingVertical: 5
            },
            viewTxtBottom: { 
                width: '95%' 
            }
        }
        ), []);
};
