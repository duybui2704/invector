import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import WarnIC from '@/assets/image/ic_warn_round_yellow.svg';
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
import { dataUser, typePhoto } from '@/mocks/data';
import ImageUtils from '@/utils/ImageUtils';
import PhotoPickerBottomSheet from '@/components/PhotoPickerBottomSheet';
import ToastUtils from '@/utils/ToastUtils';
import { PopupActionTypes } from '@/models/typesPopup';
import PopupNotifyNoAction from '@/components/PopupNotifyNoAction';

const AccountIdentify = observer(() => {
    const [identify, setIdentify] = useState<string>(dataUser.identify);
    const [avatar, setAvatar] = useState<ImageOrVideo>();
    const [frontIdentify, setFrontIdentify] = useState<ImageOrVideo>();
    const [afterIdentify, setBehindIdentify] = useState<ImageOrVideo>();

    const identifyRef = useRef<TextFieldActions>();
    const avatarRef = useRef<BottomSheetModal>();
    const frontIdentifyRef = useRef<BottomSheetModal>();
    const afterIdentifyRef = useRef<BottomSheetModal>();

    const popupConfirmRef = useRef<PopupActionTypes>();

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

    const renderPopupConfirm = useCallback((ref?: any) => {
        return <PopupNotifyNoAction
            ref={ref}
            renderIcon={<WarnIC />}
            renderTitle={Languages.accountIdentify.waitVerify}
            renderContent={Languages.accountIdentify.waitVerifyContent}
        />;
    }, []);

    const onVerify = useCallback(() => {
        if (onValidate()) {
            popupConfirmRef.current?.show();
        }
    }, [onValidate]);

    const renderPhotoPicker = useCallback((ref: any, label: string, image: any, icon: any, onPressItem?: any) => {
        return <PhotoPickerBottomSheet
            ref={ref}
            label={label}
            data={typePhoto}
            image={image}
            icon={icon}
            onPressItem={onPressItem}
            containerStyle={styles.pickerContainer}
            hasDash
            disable={!!dataUser?.front_facing_card && !!dataUser.card_back && !!dataUser.avatar}
        />;
    }, []);

    const onPressItemFrontPhoto = useCallback((item: any) => {
        if (item?.value === 'Camera') {
            ImageUtils.openCamera(setFrontIdentify);
        } else {
            ImageUtils.openLibrary(setFrontIdentify, 1);
        }
    }, []);
    const onPressItemBehindPhoto = useCallback((item: any) => {
        if (item?.value === 'Camera') {
            ImageUtils.openCamera(setBehindIdentify);
        } else {
            ImageUtils.openLibrary(setBehindIdentify, 1);
        }
    }, []);
    const onPressItemAvatar = useCallback((item: any) => {
        if (item?.value === 'Camera') {
            ImageUtils.openCamera(setAvatar);
        } else {
            ImageUtils.openLibrary(setAvatar, 1);
        }
    }, []);


    const renderPhoto = useMemo(() => {
        return (
            <View style={styles.wrapEdit}>
                <View style={styles.contentContainer}>
                    <Text style={styles.titlePhoto}>{Languages.accountIdentify.imageIdentify}</Text>
                    <Text style={styles.txtNotePhoto}>{noteKYC[0]}</Text>
                    <Text style={styles.txtNotePhoto}>{noteKYC[1]}</Text>
                    {renderPhotoPicker(frontIdentifyRef, Languages.accountIdentify.frontKYC, frontIdentify, <BeforeIC />, onPressItemFrontPhoto)}
                    {renderPhotoPicker(afterIdentifyRef, Languages.accountIdentify.behindKYC, afterIdentify, <AfterIC />, onPressItemBehindPhoto)}
                    <Text style={styles.titlePhoto}>{Languages.accountIdentify.avatarPhoto}</Text>
                    <Text style={styles.txtNotePhoto}>{noteAvatar[0]}</Text>
                    <Text style={styles.txtNotePhoto}>{noteAvatar[1]}</Text>
                    {renderPhotoPicker(avatarRef, Languages.accountIdentify.avatar, avatar, <AvatarIC />, onPressItemAvatar)}
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
    }, [afterIdentify, avatar, frontIdentify, onPressItemAvatar, onPressItemBehindPhoto, onPressItemFrontPhoto, onVerify, renderPhotoPicker]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.accountIdentify.accountIdentify} hasBack />
            <ScrollView showsVerticalScrollIndicator={false}>
                {dataUser.accuracy === 1 &&
                    <View style={styles.wrapTopHtml}>
                        <HTMLView
                            value={Languages.accountIdentify.noteTopIdentify}
                            stylesheet={HtmlStyles || undefined}
                        />
                    </View>}
                {renderKeyFeature(identifyRef, Languages.accountIdentify.KYC, identify, 'NUMBER', !!dataUser.identify)}
                {renderPhoto}
                {renderPopupConfirm(popupConfirmRef)}
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
        paddingBottom: 24,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.GRAY_13
    },
    pickerContainer: {
        marginBottom: -40
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
    }
});
