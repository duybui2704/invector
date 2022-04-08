import {StyleSheet} from "react-native";
import {COLORS, Styles} from "@/theme";
import {Configs} from "@/common/config";
import {useMemo} from "react";

export const MyStylesPicker = () => {
    return useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column'
            },
            wrapInput: {
                width: '100%',
                borderColor: COLORS.GRAY_2,
                borderWidth: 1,
                paddingHorizontal: 15,
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: 40
            },
            wrapLabel: {
                flexDirection: 'row'
            },
            label: {
                ...Styles.typography.regular
            },
            red: {
                ...Styles.typography.medium,
                color: COLORS.RED
            },
            placeholder: {
                ...Styles.typography.regular,
                color: COLORS.GRAY_4
            },
            textValue: {
                ...Styles.typography.regular,
                color: COLORS.BLACK
            },
            leftIcon: {
                fontSize: Configs.IconSize.size18,
                color: COLORS.LIGHT_GRAY,
                marginRight: 10
            },
            rightIcon: {
                marginRight: 10,
                position: 'absolute',
                right: 0
                // top: 18
            },
            errorMessage: {
                fontSize: Configs.FontSize.size12,
                fontFamily: Configs.FontFamily.medium,
                color: COLORS.RED,
                marginLeft: 10
            }
        })

, [])
}
