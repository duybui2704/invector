import {useMemo} from "react";
import {StyleSheet} from "react-native";
import {COLORS, Styles} from "@/theme";
import {Configs} from "@/common/Configs";
import DimensionUtils from "@/utils/DimensionUtils";

export const MyStylesOtpInvest = () => {
    return useMemo(() =>
        StyleSheet.create({
            main: {
                flex: 1,
                backgroundColor: COLORS.WHITE_GRAY,
                marginVertical: 16,
                alignItems: 'center'
            },
            title: {
                ...Styles.typography.bold,
                fontSize: Configs.FontSize.size16
            },
            txt: {
                ...Styles.typography.regular,
                fontSize: Configs.FontSize.size14,
                color: COLORS.BLACK,
                padding: 25,
                textAlign: 'center'
            },
            inputOtp: {
                ...Styles.typography.mediumSmall,
                color: COLORS.BLACK,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            },
            viewOtp: {
                width: DimensionUtils.SCREEN_WIDTH * 0.12,
                height: DimensionUtils.SCREEN_WIDTH * 0.12,
                marginVertical: 10,
                marginHorizontal: 2,
                borderWidth: 1,
                borderRadius: DimensionUtils.SCREEN_WIDTH * 0.07,
                justifyContent: 'center',
                alignItems: 'center'
            },
            boxOtp: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: DimensionUtils.SCREEN_WIDTH * 0.01,
                marginBottom: DimensionUtils.SCREEN_WIDTH * 0.01,
                marginLeft: 8
            },
            tobModal: {
                flexDirection: 'column',
                width: '100%',
                height: DimensionUtils.SCREEN_HEIGHT / 2.5,
                backgroundColor: COLORS.WHITE,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
            },
        })
        ,[])
    ;
}
