import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

import { COLORS } from '@/theme';
import { Configs, PADDING_TOP } from '@/common/Configs';
import DimensionUtils from '@/utils/DimensionUtils';

const styles = () => {
    return useMemo(() =>
        StyleSheet.create({
            main: {
                flex: 1
            }
        })
        , []);
};
export default styles;
