import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Dash from 'react-native-dash';
import HTMLView from 'react-native-htmlview';

import AfterIC from '@/assets/image/ic_identify_after.svg';
import BeforeIC from '@/assets/image/ic_identify_before.svg';
import AvatarIC from '@/assets/image/ic_KYC_avatar.svg';
import { noteAvatar, noteKYC } from '@/common/constants';
import Languages from '@/common/Languages';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import HeaderBar from '@/components/header';
import { COLORS, HtmlStyles, Styles } from '@/theme';
import FormValidate from '@/utils/FormValidate';
import { Configs } from '@/common/Configs';
import { dataUser } from '@/mocks/data';
import { Touchable } from '@/components/elements/touchable';

const AccountIdentify = observer(() => {
    const [identify, setIdentify] = useState<string>('');

    const identifyRef = useRef<TextFieldActions>();

    const onChangeText = useCallback((value?: any) => {
        setIdentify(value);
    }, []);

    const renderKeyFeature = useCallback((ref: any, label: string, value: any, keyboardType?: any, disabled?: boolean) => {
        return (
            <View style={styles.wrapInput}>
                <Text style={styles.labelStyle}>{label}</Text>
                <MyTextInput
                    ref={ref}
                    isPhoneNumber={false}
                    placeHolder={label}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChangeText}
                    containerInput={styles.inputStyle}
                    disabled={disabled}
                />
            </View>
        );
    }, [onChangeText]);

    const onValidate = useCallback(() => {
        const errMsgIdentify = FormValidate.cardValidate(identify);

        identifyRef.current?.setErrorMsg(errMsgIdentify);

        if (`${errMsgIdentify}`.length === 0) {
            return true;
        } return false;
    }, [identify]);

    const onVerify = useCallback(() => {
        if (onValidate()) {
            console.log('name = ', identify);
        }
    }, [identify, onValidate]);

    const renderDash = useMemo(() => {
        return <Dash
            dashThickness={1}
            dashLength={10}
            dashGap={5}
            dashColor={COLORS.GRAY_13}
            style={styles.dash} />;
    }, []);

    const renderPhoto = useMemo(() => {
        return (
            <View style={styles.wrapEdit}>
                <View style={styles.contentContainer}>
                    <Text style={styles.titlePhoto}>{Languages.accountIdentify.imageIdentify}</Text>
                    <Text style={styles.txtNotePhoto}>{noteKYC[0]}</Text>
                    <Text style={styles.txtNotePhoto}>{noteKYC[1]}</Text>

                    <Touchable style={styles.wrapItemPhoto}>
                        <Text style={styles.identifyTextStyle}>{Languages.accountIdentify.beforeKYC}</Text>
                        <BeforeIC />
                    </Touchable>
                    {renderDash}
                    <Touchable style={styles.wrapItemPhoto}>
                        <Text style={styles.identifyTextStyle}>{Languages.accountIdentify.afterKYC}</Text>
                        <AfterIC />
                    </Touchable>
                    {renderDash}
                    <Text style={styles.titlePhoto}>{Languages.accountIdentify.avatarPhoto}</Text>
                    <Text style={styles.txtNotePhoto}>{noteAvatar[0]}</Text>
                    <Text style={styles.txtNotePhoto}>{noteAvatar[1]}</Text>

                    <Touchable style={styles.wrapItemPhoto}>
                        <Text style={styles.identifyTextStyle}>{Languages.accountIdentify.avatar}</Text>
                        <AvatarIC />
                    </Touchable>
                    {renderDash}
                </View>
                <HTMLView
                    value={Languages.accountIdentify.note}
                    stylesheet={HtmlStyles || undefined}
                />
                {dataUser.accuracy !== 1 && <Button
                    style={styles.accuracyWrap}
                    onPress={onVerify}
                    label={Languages.accountIdentify.confirmKYC}
                    buttonStyle={BUTTON_STYLES.GREEN_1}
                    isLowerCase />}
            </View>
        );
    }, [onVerify, renderDash]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.accountIdentify.accountIdentify} hasBack />
            <ScrollView showsVerticalScrollIndicator={false}>
                {dataUser.accuracy === 1 &&
                    <View style={styles.wrapTopHtml}><HTMLView
                        value={Languages.accountIdentify.noteTopIdentify}
                        stylesheet={HtmlStyles || undefined}
                    />
                    </View>}
                {renderKeyFeature(identifyRef, Languages.accountIdentify.KYC, identify, 'NUMBER')}
                {renderPhoto}
            </ScrollView>
        </View>
    );
});

export default AccountIdentify;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_5
    },
    wrapEdit: {
        paddingHorizontal: 16,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 16
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 26,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.GRAY_13
    },
    wrapInput: {
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 5
    },
    wrapTopHtml: {
        alignSelf: 'center',
        paddingHorizontal: 16
    },
    accuracyWrap: {
        width: '100%',
        borderRadius: 70,
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 8
    },
    txtAccuracy: {
        ...Styles.typography.medium,
        color: COLORS.GREEN,
        paddingHorizontal: 40
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: COLORS.GRAY_11,
        borderRadius: 30,
        marginVertical: 5
    },
    labelStyle: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7
    },
    wrapItemPhoto: {
        alignItems: 'center',
        paddingBottom: 8
    },
    identifyTextStyle: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_7,
        alignSelf: 'flex-start',
        paddingVertical: 8
    },
    titlePhoto: {
        ...Styles.typography.medium,
        color: COLORS.RED_2,
        paddingTop: 16
    },
    txtNotePhoto: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_12,
        fontSize: Configs.FontSize.size12,
        paddingVertical: 4
    },
    dash: {
        paddingTop: 2
    }
});
