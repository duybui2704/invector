import { StyleSheet } from 'react-native';

import { Configs } from '../common/Configs';
import { COLORS } from './colors';

export const Styles = {
    flexColumn: {
        flex: 1
    },

    typography: StyleSheet.create({
        // white
        regular: {
            color: COLORS.BLACK,
            fontSize: Configs.FontSize.size14,
            fontFamily: Configs.FontFamily.regular
        },
        medium: {
            color: COLORS.BLACK,
            fontSize: Configs.FontSize.size14,
            fontFamily: Configs.FontFamily.medium
        },
        bold: {
            color: COLORS.BLACK,
            fontSize: Configs.FontSize.size14,
            fontFamily: Configs.FontFamily.bold
        }
    }),
    shadow: {
        backgroundColor: COLORS.WHITE,
        shadowColor: COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 1
    },
    heavyShadow: {
        backgroundColor: COLORS.WHITE,
        shadowColor: COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 1,
        shadowRadius: 14,
        elevation: 10
    },
    textTransform: {
        textTransform: 'uppercase'
    }
};

export const HtmlStyles = {
    a: {
        ...Styles.typography.regular,
        color: COLORS.BLACK,
        fontSize: Configs.FontSize.size13,
        textAlign: 'center'
    },
    b: {
        ...Styles.typography.medium,
        color: COLORS.BLACK,
        fontSize: Configs.FontSize.size13,
        textAlign: 'center'
    },
    w: {
        ...Styles.typography.regular,
        color: COLORS.WHITE,
        fontSize: Configs.FontSize.size13,
        textAlign: 'center'
    },
    g: {
        ...Styles.typography.medium,
        color: COLORS.GREEN,
        fontSize: Configs.FontSize.size12
    },
    r: {
        ...Styles.typography.medium,
        color: COLORS.RED,
        fontSize: Configs.FontSize.size13,
        marginTop: 5
    },
    s: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size12,
        padding: 15
    },
    t: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size12,
        textAlign: 'center'
    },
    m: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size12,
        color: COLORS.DARK_GRAY
    }
};

export const HtmlStylesSeen = {
    w: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_2,
        fontSize: Configs.FontSize.size14,
        marginTop: 5
    },
    b: {
        ...Styles.typography.medium,
        color: COLORS.GRAY_2,
        fontSize: Configs.FontSize.size14,
        marginTop: 5
    },
    span: {
        ...Styles.typography.medium,
        color: COLORS.BLUE,
        fontSize: Configs.FontSize.size14,
        marginTop: 5
    },
    a: {
        ...Styles.typography.medium,
        color: COLORS.BLUE,
        fontSize: Configs.FontSize.size14,
        marginTop: 5
    }
};
