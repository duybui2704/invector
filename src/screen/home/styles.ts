import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/DimensionUtils';
import {COLORS, Styles } from '@/theme';
import {Configs } from '@/common/Configs';


export const MyStylesHome = () => {
    return useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: COLORS.WHITE_GRAY1
            },
            txtCenter: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size16,
                color: COLORS.GRAY_7,
                marginTop: 10,
                marginBottom: 8,
                marginHorizontal: 15
            },
            txtNews: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size16,
                color: COLORS.GRAY_7,
                marginTop: 20,
                marginBottom: 8
            },
            marginHorizontal: {
                marginHorizontal: 15
            },
            viewTop: {
                position: 'absolute',
                top: SCREEN_HEIGHT * 0.08,
                width: '100%',
                alignItems: 'center'
            },
            viewTopLogo: {
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: SCREEN_HEIGHT * 0.045,
                position: 'absolute',
                top: 0
            },
            viewTopCenter: {
                position: 'absolute',
                left: '-2%',
                top: SCREEN_HEIGHT * 0.12,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10
            },
            txtSumInvest: {
                ...Styles.typography.medium,
                color: COLORS.WHITE,
                fontSize: Configs.FontSize.size16
            },
            txtSumInvestValue: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size32,
                color: COLORS.WHITE,
                marginLeft: SCREEN_WIDTH * 0.08,
                textAlign: 'center'
            },
            txtSumProfit: {
                ...Styles.typography.regular,
                color: COLORS.WHITE,
                paddingBottom: SCREEN_HEIGHT * 0.005
            },
            txtVND: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size20,
                color: COLORS.WHITE,
                marginHorizontal: 2,
                position: 'relative',
                bottom: 4
            },
            txtVNDSmall: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size10,
                color: COLORS.WHITE,
                marginHorizontal: 2,
                position: 'relative',
                bottom: 3
            },
            txtVPS: {
                ...Styles.typography.medium,
                fontSize: Configs.FontSize.size16,
                color: COLORS.RED_2
            },
            txtForEachTitleQuestion: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_7,
                marginRight: 8
            },
            txtTotalInterestReceived: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size20,
                color: COLORS.WHITE,
                marginHorizontal: 2,
                marginRight: 5
            },
            txtTotalInterestExtant: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size20,
                color: COLORS.WHITE,
                marginHorizontal: 2,
                marginLeft: 5
            },
            // txtTitleQuestion: {
            //     ...Styles.typography.medium,
            //     fontSize: Configs.FontSize.size16,
            //     color: COLORS.GRAY_7,
            //     paddingHorizontal: 16
            // },
            txtLeft: {
                marginLeft: '25%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            txtRight: {
                marginRight: '25%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '5%'
            },
            wrapRow: {
                flexDirection: 'row'
            },
            viewSumInvestValue: {
                flexDirection: 'row',
                alignItems: 'flex-end',
                paddingRight: 5,
                paddingVertical: SCREEN_HEIGHT * 0.002,
                width: '100%'
            },
            viewSumInvestValueCenter: {
                flexDirection: 'row',
                alignItems: 'flex-end',
                paddingRight: 5,
                paddingVertical: SCREEN_HEIGHT * 0.002,
                width: '100%',
                justifyContent: 'center'
            },
            wrapTotalInterest: {
                alignItems: 'center',
                marginVertical: SCREEN_HEIGHT * 0.005,
                width: '60%'
            },
            viewSmallMenuLoginAndroid: {
                // ...Styles.shadow,
                flexDirection: 'row',
                width: '92%',
                backgroundColor: COLORS.WHITE,
                borderRadius: 25,
                justifyContent: 'space-around',
                alignItems: 'center',
                position: 'absolute',
                top: SCREEN_HEIGHT / 3.55
            },
            viewSmallMenuLoginIOS: {
                ...Styles.shadow,
                flexDirection: 'row',
                width: '92%',
                backgroundColor: COLORS.WHITE,
                borderRadius: 25,
                justifyContent: 'space-around',
                alignItems: 'center',
                position: 'absolute',
                top: SCREEN_HEIGHT / 3.55
            },
            tab: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            txtTab: {
                ...Styles.typography.medium,
                color: COLORS.GRAY_12,
                paddingTop: 3
            },
            viewCenter: {
                marginHorizontal: 15,
                marginBottom: 20
            },
            newsItem: {
                ...Styles.shadow,
                width: SCREEN_WIDTH / 1.7,
                borderRadius: 10,
                marginHorizontal: 5,
                paddingBottom: 5
            },
            communicationImage: {
                width: SCREEN_WIDTH / 1.7,
                height: (SCREEN_WIDTH / 1.7 / 215) * 104,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10
            },
            newsContainer: {
                paddingLeft: 10,
                paddingTop: 10,
                paddingBottom: 20
            },
            txtCommunityTitle: {
                ...Styles.typography.medium,
                marginTop: 10,
                paddingHorizontal: 5
            },
            txtCommunityDes: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size11,
                color: COLORS.LIGHT_GRAY,
                marginVertical: 5,
                paddingHorizontal: 5
            },
            more: {
                width: '100%',
                paddingVertical: 10,
                marginBottom: 10,
                alignItems: 'center'
            },
            viewVfs: {
                ...Styles.shadow,
                flexDirection: 'row',
                backgroundColor: COLORS.WHITE,
                borderRadius: 15,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 8
            },
            txtVfs: {
                flex: 1,
                flexDirection: 'column',
                paddingLeft: 20
            },
            viewBanner: {
                marginTop: SCREEN_WIDTH * 0.02
            },
            viewTxtBottom: {
                width: '100%',
                paddingHorizontal: 16
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
                alignItems: 'center',
                paddingVertical: SCREEN_HEIGHT * 0.035
            },
            txtHello: {
                fontFamily: Configs.FontFamily.medium,
                fontSize: Configs.FontSize.size20,
                color: COLORS.WHITE
            },
            txtName: {
                fontFamily: Configs.FontFamily.medium,
                fontSize: Configs.FontSize.size32,
                color: COLORS.WHITE
            },
            txtInvest: {
                fontFamily: Configs.FontFamily.medium,
                fontSize: Configs.FontSize.size20,
                color: COLORS.WHITE
            },
            viewForeground: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            },
            viewRightTop: {
                position: 'absolute',
                right: 15
            },
            logo: {
                marginLeft: SCREEN_WIDTH * 0.05
            },
            imgNotify: {
                width: SCREEN_WIDTH * 0.08
            }
        }
        ), []);
};
