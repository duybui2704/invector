import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';

import AfterIC from '@/assets/image/ic_identify_after.svg';
import BeforeIC from '@/assets/image/ic_identify_before.svg';
import AvatarIC from '@/assets/image/ic_KYC_avatar.svg';
import WarnIC from '@/assets/image/ic_warn_round_yellow.svg';
import { noteAvatar, noteKYC, STATE_VERIFY_ACC } from '@/common/constants';
import Languages from '@/common/Languages';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { TextFieldActions } from '@/components/elements/textfield/types';
import { MyTextInput } from '@/components/elements/textfield/index';
import HeaderBar from '@/components/header';
import HideKeyboard from '@/components/HideKeyboard';
import PhotoPickerBottomSheet from '@/components/PhotoPickerBottomSheet';
import PopupNotifyNoAction from '@/components/PopupNotifyNoAction';
import { typePhoto } from '@/mocks/data';
import { PopupActionTypes } from '@/models/typesPopup';
import { HtmlStyles } from '@/theme';
import FormValidate from '@/utils/FormValidate';
import ImageUtils from '@/utils/ImageUtils';
import { MyStylesAccountIdentify } from './styles';
import SessionManager from '@/manager/SessionManager';
import { useAppStore } from '@/hooks';
import ToastUtils from '@/utils/ToastUtils';
import Utils from '@/utils/Utils';
import { isIOS } from '@/common/Configs';
import { UpLoadImage } from '@/models/common-model';
import { UserInfoModal } from '@/models/user-models';

const AccountIdentify = observer(() => {
    const { apiServices, userManager } = useAppStore();
    const styles = MyStylesAccountIdentify();
    const [identityAcc, setIdentity] = useState<string>(SessionManager.userInfo?.identity || '');
    const [avatar, setAvatar] = useState<UpLoadImage>();
    const [frontIdentify, setFrontIdentify] = useState<UpLoadImage>();
    const [afterIdentify, setBehindIdentify] = useState<UpLoadImage>();

    const identifyRef = useRef<TextFieldActions>();
    const avatarRef = useRef<BottomSheetModal>();
    const frontIdentifyRef = useRef<BottomSheetModal>();
    const afterIdentifyRef = useRef<BottomSheetModal>();

    const popupConfirmRef = useRef<PopupActionTypes>();

    const onChangeText = useCallback((value?: string) => {
        setIdentity(value || '');
    }, []);

    const fetchIdentityVerify = useCallback(async () => {
        const res = await apiServices.auth.identityVerify(
            identityAcc,
            {
                ...frontIdentify?.images?.[0],
                uri: isIOS ? frontIdentify?.images?.[0]?.path?.replace('file://', '') : frontIdentify?.images?.[0]?.path,
                type: frontIdentify?.images?.[0]?.mime,
                name: Utils.getFileName(frontIdentify?.images?.[0])
            },
            {
                ...afterIdentify?.images?.[0],
                uri: isIOS ? afterIdentify?.images?.[0]?.path?.replace('file://', '') : afterIdentify?.images?.[0]?.path,
                type: afterIdentify?.images?.[0]?.mime,
                name: Utils.getFileName(afterIdentify?.images?.[0])
            },
            {
                ...avatar?.images?.[0],
                uri: isIOS ? avatar?.images?.[0]?.path?.replace('file://', '') : avatar?.images?.[0]?.path,
                type: avatar?.images?.[0]?.mime,
                name: Utils.getFileName(avatar?.images?.[0])
            }
        );
        if (res.success) {
            popupConfirmRef.current?.show();
            const resUser = await apiServices.auth.getUserInfo();
            if (resUser.success) {
                const data = resUser.data as UserInfoModal;
                userManager.updateUserInfo({
                    ...userManager.userInfo,
                    ...data,
                    identity: identityAcc,
                    avatar: avatar?.images?.[0]?.path,
                    front_facing_card: frontIdentify?.images?.[0]?.path,
                    card_back: afterIdentify?.images?.[0]?.path
                });
            }

        }
    }, [afterIdentify?.images, apiServices.auth, avatar?.images, frontIdentify?.images, identityAcc, userManager]);

    const renderInput = useCallback((ref: any, label: string, value: any, keyboardType?: any, disabled?: boolean, length?: number) => {
        return (
            <View style={styles.wrapInput}>
                <Text style={styles.labelStyle}>{label}</Text>
                <MyTextInput
                    ref={ref}
                    isPhoneNumber={false}
                    placeHolder={label}
                    keyboardType={keyboardType}
                    value={value}
                    maxLength={length}
                    onChangeText={onChangeText}
                    containerInput={styles.inputStyle}
                    disabled={disabled}
                />
            </View>
        );
    }, [onChangeText, styles.inputStyle, styles.labelStyle, styles.wrapInput]);

    const onValidate = useCallback(() => {
        const errMsgIdentify = FormValidate.cardValidate(identityAcc);

        identifyRef.current?.setErrorMsg(errMsgIdentify);

        if (`${errMsgIdentify}`.length === 0) {
            return true;
        } return false;
    }, [identityAcc]);

    const renderPopupConfirm = useCallback((ref?: any) => {
        return <PopupNotifyNoAction
            ref={ref}
            renderIcon={<WarnIC />}
            renderTitle={Languages.accountIdentify.waitVerify}
            renderContent={Languages.accountIdentify.waitVerifyContent}
        />;
    }, []);

    const onVerify = useCallback(async () => {
        if (onValidate() && avatar && frontIdentify && afterIdentify) {
            fetchIdentityVerify();
        }
        else {
            ToastUtils.showMsgToast(Languages.errorMsg.errEmptyIdentity);
        }
    }, [afterIdentify, avatar, fetchIdentityVerify, frontIdentify, onValidate]);

    const renderPhotoPicker = useCallback((ref: any, label: string, image: any, icon: any, onPressItem?: any, imageSource?: string, disable?: boolean) => {
        return <PhotoPickerBottomSheet
            ref={ref}
            label={label}
            data={typePhoto}
            image={image}
            icon={icon}
            onPressItem={onPressItem}
            containerStyle={styles.pickerContainer}
            hasDash
            imageSource={imageSource}
            disable={disable}
        />;
    }, [styles.pickerContainer]);

    const onPressItemFrontPhoto = useCallback((item: any) => {
        if (item?.text === 'Camera') {
            ImageUtils.openCamera(setFrontIdentify);
        } else {
            ImageUtils.openLibrary(setFrontIdentify, 1);
        }
    }, []);

    const onPressItemBehindPhoto = useCallback((item: any) => {
        if (item?.text === 'Camera') {
            ImageUtils.openCamera(setBehindIdentify);
        } else {
            ImageUtils.openLibrary(setBehindIdentify, 1);
        }
    }, []);

    const onPressItemAvatar = useCallback((item: any) => {
        if (item?.text === 'Camera') {
            ImageUtils.openCamera(setAvatar);
        } else {
            ImageUtils.openLibrary(setAvatar, 1);
        }
    }, []);


    const renderPhoto = useMemo(() => {
        return (
            <HideKeyboard>
                <View style={styles.contentContainer}>
                    <Text style={styles.titlePhoto}>{Languages.accountIdentify.imageIdentify}</Text>
                    <Text style={styles.txtNotePhoto}>{noteKYC[0]}</Text>
                    <Text style={styles.txtNotePhoto}>{noteKYC[1]}</Text>
                    {renderPhotoPicker(frontIdentifyRef,
                        Languages.accountIdentify.frontKYC,
                        frontIdentify,
                        <BeforeIC />,
                        onPressItemFrontPhoto,
                        SessionManager.userInfo?.front_facing_card,
                        SessionManager.userInfo?.front_facing_card ? !!SessionManager.userInfo?.front_facing_card : !!frontIdentify?.images?.[0]?.path
                    )}
                    {renderPhotoPicker(afterIdentifyRef,
                        Languages.accountIdentify.behindKYC,
                        afterIdentify,
                        <AfterIC />,
                        onPressItemBehindPhoto,
                        SessionManager.userInfo?.card_back,
                        SessionManager.userInfo?.card_back ? !!SessionManager.userInfo?.card_back : !!afterIdentify?.images?.[0]?.path
                    )}
                    <Text style={styles.titlePhoto}>{Languages.accountIdentify.avatarPhoto}</Text>
                    <Text style={styles.txtNotePhoto}>{noteAvatar[0]}</Text>
                    <Text style={styles.txtNotePhoto}>{noteAvatar[1]}</Text>
                    {renderPhotoPicker(avatarRef,
                        Languages.accountIdentify.avatar,
                        avatar,
                        <AvatarIC />,
                        onPressItemAvatar,
                        SessionManager.userInfo?.avatar,
                        SessionManager.userInfo?.avatar ? !!SessionManager.userInfo?.avatar : !!avatar?.images?.[0]?.path
                    )}
                </View>
            </HideKeyboard>
        );
    }, [afterIdentify, avatar, frontIdentify, onPressItemAvatar, onPressItemBehindPhoto, onPressItemFrontPhoto, renderPhotoPicker, styles.contentContainer, styles.titlePhoto, styles.txtNotePhoto]);

    const renderTop = useMemo(() => {
        return (
            <HTMLView
                value={Languages.accountIdentify.noteTopIdentify}
                stylesheet={HtmlStyles || undefined}
            />
        );
    }, []);

    const renderBottom = useMemo(() => {
        return (
            <>
                <HTMLView
                    value={Languages.accountIdentify.note}
                    stylesheet={HtmlStyles || undefined}
                />
                <Button
                    style={styles.accuracyWrap}
                    onPress={onVerify}
                    label={Languages.accountIdentify.confirmKYC}
                    buttonStyle={BUTTON_STYLES.GREEN_1}
                    isLowerCase />
            </>
        );
    }, [onVerify, styles.accuracyWrap]);

    return (
        <View style={styles.container}>
            <HeaderBar isLight={false} title={Languages.accountIdentify.accountIdentify} hasBack />
            <ScrollView style={styles.wrapAll}>

                {SessionManager.userInfo?.tinh_trang?.status === STATE_VERIFY_ACC.VERIFIED && renderTop}
                {renderInput(identifyRef, Languages.accountIdentify.KYC, SessionManager.userInfo?.identity, 'NUMBER', !!SessionManager.userInfo?.identity, 12)}
                {renderPhoto}
                {SessionManager?.userInfo?.tinh_trang?.status === STATE_VERIFY_ACC.NO_VERIFIED && renderBottom}
                {renderPopupConfirm(popupConfirmRef)}
            </ScrollView>
        </View >

    );
});

export default AccountIdentify;
