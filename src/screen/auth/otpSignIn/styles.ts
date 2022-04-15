import React, {useMemo} from "react";
import {StyleSheet} from "react-native";
import {COLORS, Styles} from "@/theme";
import {Configs} from "@/common/Configs";
import DimensionUtils from "@/utils/DimensionUtils";

export const MyStylesOtp = () => {
    return useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                marginTop: DimensionUtils.SCREEN_HEIGHT * 0.12
            },
            viewTop: {
                flexDirection: 'row',
                alignItems: 'center'
                // marginTop: DimensionUtils.SCREEN_HEIGHT * 0.1
            },
            containerBox: {
                paddingVertical: 16
            },
            confirmOtp: {
                ...Styles.typography.medium,
                marginTop: 10,
                color: COLORS.GRAY,
        
            },
            boxOtp: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: DimensionUtils.SCREEN_WIDTH * 0.02,
                marginBottom: DimensionUtils.SCREEN_WIDTH * 0.01,
                marginLeft: 8
            },
            viewOtp: {
                width: DimensionUtils.SCREEN_WIDTH * 0.12,
                height: DimensionUtils.SCREEN_WIDTH * 0.12,
                marginVertical: 10,
                marginHorizontal: 2,
                borderWidth: 1,
                borderRadius: DimensionUtils.SCREEN_WIDTH * 0.06,
                justifyContent: 'center',
                alignItems: 'center'
            },
            inputOtp: {
                ...Styles.typography.mediumSmall,
                color: COLORS.BLACK,
                justifyContent: 'center',
                alignItems: 'center'
            },
            notifyOtp: {
                marginTop: Configs.FontSize.size30
            },
            text: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_9,
                marginBottom: 20
            },
            resentCode: {
                ...Styles.typography.medium,
                color: COLORS.GREEN
            },
            color: {
                color: COLORS.RED_1
            },
            buttonResend: {
                alignItems: 'center'
            },
            resendCode: {
                width: DimensionUtils.SCREEN_WIDTH / 3
            },
            txtTitle: {
                fontSize: Configs.FontSize.size20,
                fontFamily: 'bold',
                color: COLORS.BLACK
            },
            tobConfirm: {
                marginTop: 10,
                width: DimensionUtils.SCREEN_WIDTH * 0.4,
                height: Configs.FontSize.size40,
                backgroundColor: COLORS.GREEN,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center'
            },
            txtConfirm: {
                color: COLORS.WHITE,
                fontSize: Configs.FontSize.size14
            },
            sentOtp: {
                width: DimensionUtils.SCREEN_WIDTH * 0.3,
                height: DimensionUtils.SCREEN_HEIGHT * 0.05,
                marginVertical: 20,
                marginHorizontal: 5
            },
            txtOtp: {
                color: COLORS.RED,
                fontSize: Configs.FontSize.size14
            }
        })
        , []);
};
