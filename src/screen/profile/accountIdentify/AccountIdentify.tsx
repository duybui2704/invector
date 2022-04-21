import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import { ImageOrVideo } from 'react-native-image-crop-picker';

import AfterIC from '@/assets/image/ic_identify_after.svg';
import BeforeIC from '@/assets/image/ic_identify_before.svg';
import AvatarIC from '@/assets/image/ic_KYC_avatar.svg';
import WarnIC from '@/assets/image/ic_warn_round_yellow.svg';
import { noteAvatar, noteKYC } from '@/common/constants';
import Languages from '@/common/Languages';
import { Button } from '@/components/elements/button';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { MyTextInput } from '@/components/elements/textfield';
import { TextFieldActions } from '@/components/elements/textfield/types';
import HeaderBar from '@/components/header';
import HideKeyboard from '@/components/HideKeyboard';
import PhotoPickerBottomSheet from '@/components/PhotoPickerBottomSheet';
import PopupNotifyNoAction from '@/components/PopupNotifyNoAction';
import { dataUser, typePhoto } from '@/mocks/data';
import { PopupActionTypes } from '@/models/typesPopup';
import { HtmlStyles } from '@/theme';
import FormValidate from '@/utils/FormValidate';
import ImageUtils from '@/utils/ImageUtils';
import { MyStylesAccountIdentify } from './styles';

const AccountIdentify = observer(() => {
    const styles = MyStylesAccountIdentify();
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
    }, [onChangeText, styles.inputStyle, styles.labelStyle, styles.wrapInput]);

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
    }, [styles.pickerContainer]);

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
    }, [afterIdentify, avatar, frontIdentify, onPressItemAvatar, onPressItemBehindPhoto, onPressItemFrontPhoto, onVerify, renderPhotoPicker, styles.accuracyWrap, styles.contentContainer, styles.titlePhoto, styles.txtNotePhoto, styles.wrapEdit]);

    return (
        <HideKeyboard style={styles.container}>
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
        </HideKeyboard>
    );
});

export default AccountIdentify;
