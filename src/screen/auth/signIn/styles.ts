import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Configs, PADDING_TOP} from '../../../common/config';
import {COLORS, Styles} from '../../../theme';
import DimensionUtils from '../../../utils/DimensionUtils';

export const myStylesSign = () => {
    return useMemo(() => {
        return StyleSheet.create({
            main: {
                flex: 1,
                backgroundColor: COLORS.GREEN,
                width: DimensionUtils.SCREEN_WIDTH,
                height: DimensionUtils.SCREEN_HEIGHT
            },
            txt: {
                color: COLORS.WHITE,
                fontSize: Configs.FontSize.size20,
                borderRadius: 20
            },
            inputPass: {
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                marginVertical: 5,
                height: Configs.FontSize.size40
            },
            Picker: {
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginVertical: 5,
                height: 40,
            },

            rowInfo: {
                marginTop: -15,
                flexDirection: 'column',
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
                paddingBottom: PADDING_TOP,
                marginTop: DimensionUtils.SCREEN_HEIGHT / 3,
                height: DimensionUtils.SCREEN_HEIGHT / 3,
                width: '80%',
                position: 'absolute',
                top: -20
            },
            checkbox: {
                justifyContent: 'flex-end',
                marginTop: 10,
                width: 30,
                height: 30,
                alignItems: 'center'
            },
            row: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginVertical: 8
            },
            content: {
                marginTop: 30,
                justifyContent: 'center',
                marginHorizontal: 10,
                height: DimensionUtils.SCREEN_HEIGHT * 0.5
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
            },
            txtTitle: {
                fontSize: Configs.FontSize.size24,
                fontWeight: '600',
                color: COLORS.BLACK,
                padding: 5
            },
            tobLogin: {
                width: DimensionUtils.SCREEN_WIDTH * 0.4,
                height: Configs.FontSize.size40,
                backgroundColor: COLORS.GREEN,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center'
            },
            viewBottom: {
                flexDirection: 'row',
                position: 'absolute',
                top: DimensionUtils.SCREEN_HEIGHT * 0.5,
                left: 0,
                width: DimensionUtils.SCREEN_WIDTH,
                height: DimensionUtils.SCREEN_HEIGHT * 0.1,
                alignItems: 'center'
            },
            txtLogin: {
                fontSize: 16,
                fontWeight: '600',
                color: COLORS.WHITE
            },
            image: {
                position: 'absolute',
                zIndex: -1
            },
            form: {
                // height: SCREEN_HEIGHT - (HEADER_PADDING + STATUSBAR_HEIGHT)
            },
            swapInput: {
                paddingHorizontal: 15,
                paddingTop: 15
            },
            formInput: {
                marginBottom: 15,
                borderRadius: 20,
                height: 40
            },
            startVal: {
                ...Styles.typography.regular,
                color: COLORS.RED
            },
            label: {
                ...Styles.typography.regular,
                marginBottom: 5
            },
            buttonContainer: {
                marginVertical: 20
            },
            channelContainer: {
                marginTop: 0,
                marginBottom: 15
            }
        });
    }, []);
};
