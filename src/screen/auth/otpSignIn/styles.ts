import React, {useMemo} from "react";
import {StyleSheet} from "react-native";
import {COLORS, Styles} from "@/theme";
import {Configs} from "@/common/config";
import DimensionUtils from "@/utils/DimensionUtils";

export const MyStylesOtp = () => {
    return useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1
            },
            viewTop: {
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -8
                // marginTop: DimensionUtils.SCREEN_HEIGHT * 0.1
            },
            containerBox: {
                paddingVertical: 16,
                paddingHorizontal: 16
            },
            confirmOtp: {
                ...Styles.typography.bold,
                fontSize: Configs.FontSize.size14,
                marginTop: 10
            },
            boxOtp: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: DimensionUtils.SCREEN_HEIGHT * 0.02,
                marginBottom: DimensionUtils.SCREEN_HEIGHT * 0.01,
                // marginLeft: DimensionUtils.SCREEN_WIDTH * 0.12
            },
            viewOtp: {
                width: DimensionUtils.SCREEN_WIDTH * 0.12,
                height: DimensionUtils.SCREEN_WIDTH * 0.12,
                marginVertical: 6,
                marginHorizontal: 4,
                borderWidth: 1,
                borderRadius: DimensionUtils.SCREEN_WIDTH * 0.06,
                justifyContent: 'center',
                alignItems: 'center'
            },
            inputOtp: {
                ...Styles.typography.medium,
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
                fontSize: Configs.FontSize.size24,
                fontWeight: '600',
                color: COLORS.BLACK,
                padding: 5
            },
            tobConfirm: {
                marginTop: 10,
                marginLeft: -8,
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
                marginLeft: 5
            },
            txtOtp: {
                color: COLORS.RED,
                fontSize: Configs.FontSize.size14
            }
        })
        , [])
}
