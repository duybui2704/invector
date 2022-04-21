import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Configs, PADDING_TOP } from '@/common/Configs';
import { COLORS, Styles } from '@/theme';
import DimensionUtils from '@/utils/DimensionUtils';

export const MyStylesSign = () => {
    return useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                marginLeft: 10,
                width: '85%'
            },
            main: {
                flex: 1,
                backgroundColor: COLORS.GREEN,
                width: DimensionUtils.SCREEN_WIDTH,
                height: DimensionUtils.SCREEN_HEIGHT
            },
            wrapLoginTxt: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 15
            },
            txtTitleModal: {
                ...Styles.typography.regular,
                color: COLORS.GRAY,
                marginHorizontal: 20
            },
            inputPass: {
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                height: Configs.FontSize.size40,
                marginBottom: 10
            },
            containerOverViewPicker:{
                marginTop: 12,
                borderRadius: 20,
                borderWidth: 1 ,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                height: Configs.FontSize.size40,
                borderColor: COLORS.GRAY_11
            },
            valuePicker:{
                ...Styles.typography.regular,
                color: COLORS.GRAY_12                
            },
            containerPicker:{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 20
            },
            containerPlaceholderPicker:{
            },
            rowInfo: {
                flexDirection: 'column',
                alignItems: 'flex-start'
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
                marginBottom: 20
            },
            content: {
                marginTop: DimensionUtils.SCREEN_HEIGHT * 0.05,
                justifyContent: 'center',
                width: '90%',
                height: DimensionUtils.SCREEN_HEIGHT / 2.5
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
                ...Styles.typography.regular,
                color: COLORS.GRAY_12,
                marginLeft: 10
            },
            txtSubmit: {
                ...Styles.typography.medium,
                color: COLORS.WHITE,
                fontSize: Configs.FontSize.size14
            },
            txtTitle: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size20,
                color: COLORS.GRAY_7,
                marginRight: 6
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
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size16,
                color: COLORS.WHITE
            }
        });
    }, []);
};
