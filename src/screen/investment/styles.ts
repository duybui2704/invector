import { StyleSheet } from 'react-native';

import { Configs, STATUSBAR_HEIGHT } from '@/common/Configs';
import { Styles } from '@/theme';
import { COLORS } from '@/theme/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/DimensionUtils';



const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    wrapContent: {
        marginHorizontal: 16
    },
    txt: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size15,
        color: COLORS.BLACK
    },
    investTab: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: COLORS.GRAY_13,
        padding: 4,
        borderRadius: 26,
        marginBottom: 12
    },
    btInvest: {
        width: (SCREEN_WIDTH - 40) / 3,
        alignItems: 'center',
        paddingVertical: 4,
        borderRadius: 26
    },
    txtBtInvest: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size12
    },
    txtBtnStatus: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size11
    },
    input: {
        borderRadius: 26,
        borderWidth: 1,
        borderColor: COLORS.GRAY_11,
        height: 32,
        width: '90%'
    },
    wrapSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconFilter: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.GRAY_11,
        marginBottom: 26
    },
    item: {
        paddingTop: 8,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.GRAY_11,
        marginBottom: 8
    },
    rowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8
    },
    rowBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingVertical: 8
    },
    txtMoney: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size20,
        color: COLORS.GREEN
    },
    txtInterest: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size12,
        color: COLORS.GRAY_12
    },
    txtPercent: {
        ...Styles.typography.medium,
        color: COLORS.RED
    },
    wrapText: {
        alignItems: 'flex-end'
    },
    greenText: {
        ...Styles.typography.medium,
        color: COLORS.GREEN
    },
    btInvestNow: {
        backgroundColor: COLORS.GREEN,
        flexDirection: 'row',
        paddingVertical: 5,
        borderRadius: 20,
        paddingHorizontal: 7,
        alignItems: 'center'

    },
    txtInvestNow: {
        ...Styles.typography.medium,
        color: COLORS.WHITE,
        fontSize: Configs.FontSize.size12,
        marginRight: 5
    },
    txtFormality: {
        ...Styles.typography.medium
    },
    flatList: {
        paddingBottom: 150
    },
    txtYellow: {
        ...Styles.typography.medium,
        color: COLORS.YELLOW_2
    }
});
export default styles;
