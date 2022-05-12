import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import DimensionUtils from '@/utils/DimensionUtils';
import {COLORS, Styles} from '@/theme';
import {Configs} from '@/common/Configs';


export const MyStylesHome = () => {
    return useMemo(() =>
        StyleSheet.create({
            main: {
                flex: 1,
                backgroundColor: COLORS.WHITE_GRAY1
            },
            txt: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size16
            },
            txtCenter: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size16,
                color: COLORS.BLACK,
                marginTop: 10,
                marginBottom: 5
            },
            viewTop: {
                position: 'absolute',
                left: '-2%',
                top: DimensionUtils.SCREEN_HEIGHT * 0.12,
                height: DimensionUtils.SCREEN_HEIGHT * 0.3,
                width: '100%',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: 10
            },
            viewTopLogo: {
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: 10,
                position: 'absolute',
                top: 0
            },
            viewTopCenter: {
                position: 'absolute',
                left: '-2%',
                top: DimensionUtils.SCREEN_HEIGHT * 0.12,
                height: DimensionUtils.SCREEN_HEIGHT * 0.18,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10
            },
            txt1: {
                ...Styles.typography.medium,
                color: COLORS.WHITE
            },
            txt2: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size24,
                color: COLORS.WHITE
            },
            txt3: {
                ...Styles.typography.regular,
                color: COLORS.WHITE,
                fontSize: Configs.FontSize.size12
            },
            txt4: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size16,
                color: COLORS.WHITE,
                marginHorizontal: 2
            },
            txt5: {
                ...Styles.typography.regular,
                color: COLORS.BLACK,
                fontSize: Configs.FontSize.size12
            },
            txt7: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size16,
                color: COLORS.WHITE,
                marginHorizontal: 2,
                marginRight: 5,
                marginTop: 5
            },
            txt6: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size16,
                color: COLORS.WHITE,
                marginHorizontal: 2,
                marginLeft: 5,
                marginTop: 5
            },
            txtLeft: {
                marginLeft: '30%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            txtRight: {
                marginRight: '30%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            viewTop1: {
                flexDirection: 'row',
                height: DimensionUtils.SCREEN_HEIGHT * 0.08
            },
            viewTop2: {
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginBottom: 5,
                height: DimensionUtils.SCREEN_HEIGHT * 0.045,
                marginHorizontal: 30
            },
            viewTop3: {
                flexDirection: 'column',
                alignItems: 'center',
                marginHorizontal: 10,
                marginVertical: 10,
                width: '60%'
            },
            viewTxt: {
                paddingTop: 4
                // alignItems: 'flex-end'
            },
            viewTxt1: {
                paddingVertical: 5,
                marginLeft: -35
            },
            viewTob: {
                ...Styles.shadow,
                flexDirection: 'row',
                width: '90%',
                marginHorizontal: '5%',
                height: DimensionUtils.SCREEN_HEIGHT * 0.08,
                backgroundColor: COLORS.WHITE,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: DimensionUtils.SCREEN_HEIGHT / 3.4
            },
            tob: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            txtTob: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size10,
                color: COLORS.GRAY
            },
            viewCenter: {
                paddingHorizontal: 10,
                marginBottom: 20
            },
            item: {
                width: '100%',
                height: DimensionUtils.SCREEN_HEIGHT * 0.2,
                borderRadius: 10,
                backgroundColor: COLORS.WHITE,
                marginVertical: 5,
                padding: 5
            },
            itemChild: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5
            },
            itemRight: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                position: 'absolute',
                right: 5
            },
            itemLeft: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                position: 'absolute',
                left: 5
            },
            viewTobRight: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 8
            },
            tobItem: {
                width: DimensionUtils.SCREEN_WIDTH * 0.3,
                height: DimensionUtils.SCREEN_HEIGHT * 0.04,
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
                backgroundColor: COLORS.WHITE,
                borderRadius: 15,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems:'center'
            },
            logoVfs: {
                padding: 20,
                left: 10
            },
            txtVfs: {
                flex: 1,
                flexDirection: 'column',
                paddingLeft: 20
            },
            viewBottom: {
                ...Styles.shadow,
                flexDirection: 'column',
                width: '100%',
                backgroundColor: COLORS.WHITE,
                borderRadius: 15,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginVertical: 10,
                padding: 10
            },
            icon: {
                justifyContent: 'flex-end',
                alignItems: 'center'
            },
            txtQuestion: {
                flex: 1,
                flexDirection: 'row',
                paddingVertical: 8,
                alignItems: 'center'
            },
            txtQuestionTop: {
                flex: 1.2,
                flexDirection: 'row',
                paddingVertical: 5,
                alignItems: 'center'
            },
            viewTxtBottom: {
                width: '95%'
            },
            viewFlatList: {
                marginBottom: 0,
            },
            footerFlatList: {
                marginHorizontal: 5
            },
            txtLogin: {
                fontSize: Configs.FontSize.size16,
                color: COLORS.GREEN,
                fontFamily: Configs.FontFamily.bold,
                textAlign: 'center'
            },
            tobAuth: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            txtHello: {
                fontFamily: Configs.FontFamily.bold,
                fontSize: Configs.FontSize.size20,
                color: COLORS.WHITE
            },
            txtName: {
                fontFamily: Configs.FontFamily.bold,
                fontSize: Configs.FontSize.size24,
                color: COLORS.WHITE
            },
            txtInvest: {
                fontFamily: Configs.FontFamily.bold,
                fontSize: Configs.FontSize.size18,
                color: COLORS.WHITE
            },
            viewForeground: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            },
            viewRightTop: {
                position: 'absolute',
                right: 10
            },
            logo: {
                marginLeft: DimensionUtils.SCREEN_WIDTH * 0.05
            },
            imgNotify: {
                width: DimensionUtils.SCREEN_WIDTH * 0.08,
                height: DimensionUtils.SCREEN_WIDTH * 0.08
            }
        }
        ), []);
};
