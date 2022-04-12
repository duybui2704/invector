import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState
} from 'react';
import { StyleSheet, Text } from 'react-native';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';

import { COLORS, Styles } from '../theme';
import DateUtils from '../utils/DateUtils';
import { Touchable } from './elements/touchable';
import ICCalender from '@/asset/icon/ic_calender.svg';
import { Configs } from '@/common/Configs';
import Languages from '@/common/Languages';

interface DatePickerTransactionProps extends DatePickerProps {
  title?: string;
  onConfirmDatePicker?: (date: Date,tag?:string) => void;
  onCancelDatePicker?: () => void;
  onDateChangeDatePicker?: (date: Date, tag?: string) => void;
}

type DatePickerTransactionActions = {
  show?: (content?: string) => any;
  hide?: (content?: string) => any;
  setContent?: (message: string) => void;
};

const DatePickerTransaction = forwardRef<DatePickerTransactionActions, DatePickerTransactionProps>(
    (
        {
            title,
            onConfirmDatePicker,
            onDateChangeDatePicker,
            maximumDate,
            minimumDate,
            onCancel,
            date
        }: DatePickerTransactionProps,
        ref
    ) => {
        const [visible, setVisible] = useState<boolean>(false);
        const [dateValue,setDateValue] = useState<Date | string| undefined >();
        const show = useCallback(() => {
            setVisible(true);
        }, []);

        const hide = useCallback(() => {
            setVisible(false);
            onCancel?.();
        }, [onCancel]);

        useImperativeHandle(ref, () => ({
            show,
            hide
        }));

        const onChange = useCallback(
            (value: Date) => {
                onDateChangeDatePicker?.(date, title || '');
            },
            [date, onDateChangeDatePicker, title]
        );

        const onConfirm = useCallback(
            (value: Date) => {
                setDateValue?.(value);
                onConfirmDatePicker?.(value, title || '');
                hide?.();
                console.log('date',dateValue?.toLocaleString());
            },
            [dateValue, hide, onConfirmDatePicker, title]
        );

        return (
            <>
                <Touchable style={styles.itemPicker} onPress={show}>
                    <Text style={styles.placeholderDate}>
                        {dateValue ? DateUtils.formatDateSecondPicker(dateValue.toLocaleString()) : title}
                    </Text>
                    <ICCalender/>
                    <DatePicker
                        modal
                        mode='datetime'
                        open={visible}
                        locale={'vi'}
                        androidVariant={'iosClone'}
                        date={date || new Date()}
                        title={title}
                        onDateChange={onChange}
                        onCancel={hide}
                        onConfirm={onConfirm}
                        maximumDate={maximumDate}
                        minimumDate={minimumDate}
                        confirmText={Languages.common.agree}
                        cancelText={Languages.common.cancel}
                    />
                </Touchable>
            </>
        );
    }
);

export default DatePickerTransaction;

const styles = StyleSheet.create({
    itemPicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: (SCREEN_WIDTH - 60) / 2,
        borderWidth: 1,
        borderColor: COLORS.GRAY_11,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 45,
        alignItems: 'center',
        backgroundColor: COLORS.WHITE
    },
    placeholderDate: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_6,
        fontSize: Configs.FontSize.size12
    }
});