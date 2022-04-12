import {StyleSheet} from 'react-native';
import {useMemo} from "react";
import {COLORS} from "@/theme";
import {Configs, PADDING_TOP} from "@/common/Configs";
import DimensionUtils from "@/utils/DimensionUtils";

export const MyStylesOtp = () => {
    return useMemo(() =>
        StyleSheet.create({
          main: {
              flex:1
          },
            txt: {
                color: COLORS.WHITE,
                fontSize: Configs.FontSize.size20,
                borderRadius: 20
            },
            inputPhone: {
                marginTop: 15,
                borderRadius: 30,
                height: Configs.FontSize.size40,
                width: '85%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            },
            rowInfo: {
                marginTop: -10,
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
                height: DimensionUtils.SCREEN_HEIGHT * 0.3
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
            txtOtp: {
                fontSize: Configs.FontSize.size14,
                fontWeight: '600',
                color: COLORS.GRAY,
                padding: 5
            },
            tobLogin: {
                marginTop: 20,
                width: DimensionUtils.SCREEN_WIDTH * 0.4,
                height: Configs.FontSize.size40,
                backgroundColor: COLORS.GREEN,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center'
            }
        })
    , [])
}
