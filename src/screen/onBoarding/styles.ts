import { COLORS } from "@/theme";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const MyStylesBoar = () => {
    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.WHITE,
            alignItems: 'center'
    }
    }), []);
}

