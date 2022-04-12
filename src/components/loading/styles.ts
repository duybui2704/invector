import {StyleSheet} from "react-native";
import {useMemo} from "react";
import {COLORS} from "@/theme";

const MyStyleLoading = () => {
    return useMemo(() =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 10000,
            width: '100%',
            height: '100%'
        },
        inline: {
            marginVertical: 10,
            alignItems: 'center'
        },
        activityIndicator: {
            width: 80,
            height: 80,
            borderRadius: 10,
            backgroundColor: COLORS.BACKDROP_2
        }
    })

, [] )
}
export default MyStyleLoading;
