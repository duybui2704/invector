import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dash from 'react-native-dash';
import { ScrollView } from 'react-native-gesture-handler';
import { VietQR } from 'vietqr';

// import AlertIc from '@/assets/images/ic_alert.svg';
import { MyImageView } from '@/components/image';
import { COLORS, Styles } from '@/theme';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import Utils from '@/utils/Utils';
import { BankInformationModel } from '@/models/invest';
import { Touchable } from '@/components/elements/touchable';
import Languages from '@/common/Languages';
import HeaderBar from '@/components/header';
import { Configs } from '@/common/Configs';
import Navigator from '@/routers/Navigator';

const vietQR = new VietQR({
    clientID: 'de8a0804-a76d-41e5-8ad6-31503ce7d5f4',
    apiKey: '17c29f09-4ea2-4417-b9c2-7f020d35de42'
});

const info = {
    name_account: 'DINH TRUONG GIANG',
    bin: '970432',
    account:'318989788',
    description:'Chuyển tiền bún đậu',
    money:'1000000',
    name_bank:'VP Bank'
};

const TransferScreen = observer(({ route }: any) => {

    const [link, setLink] = useState<string>('');
    const data = info;
    console.log(data);

    useEffect(() => {
        console.log(Utils.formatMoney(data?.money));
        const url = vietQR.genQuickLink({
            bank: data?.bin,
            accountName: data?.name_account,
            accountNumber: data?.account,
            amount: Utils.formatTextToNumber(data?.money),
            memo: data?.description,
            template: 'compact',
            media: '.jpg'
        });
        setLink(url);
    }, []);

    const copyToClipboard = useCallback((text: string) => {
    }, []);

    const renderItem = useCallback((label: string, value: string) => {

        const onPress = () => {
            copyToClipboard(value);
        };

        return (
            <>
                <Text style={styles.txtLabel}>{label}</Text>
                <View style={styles.wrapItem}>
                    <Text style={styles.txtValue}>{value}</Text>
                    <Touchable onPress={onPress} style={styles.btCopy}>
                        <Text style={styles.txtCopy}>{Languages.transferScreen.copy}</Text>
                    </Touchable>
                </View>
            </>
        );
    }, [copyToClipboard]);

    const renderItemInfo = useCallback((label: string, value: string) => {
        return (
            <>
                <Text style={styles.txtLabel}>{label}</Text>
                <Text style={styles.redText}>{value}</Text>
            </>
        );
    }, []);

    const renderItemBank = useCallback((label: string, value: string) => {
        return (
            <View style={styles.row}>
                <Text style={styles.label1}>{label}</Text>
                <Text style={styles.value1}>{value}</Text>
            </View>
        );
    }, []);

    const onGoBack = useCallback(()=>{
        Navigator.goBack();
    },[]);

    return (
        <View style={styles.container}>
            <HeaderBar
                onGoBack={onGoBack}
                hasBack
                title={Languages.transferScreen.title} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.wrapContent}>
                    <Text style={styles.txtDes}>{Languages.transferScreen.description}</Text>
                    <Text style={styles.label}>{Languages.transferScreen.bank}</Text>
                    <View style={styles.wrapBank}>
                        <Text>{data?.name_bank}</Text>
                    </View>
                    <Dash
                        dashThickness={1}
                        dashLength={10}
                        dashGap={2}
                        dashColor={COLORS.GRAY_11} />
                    {renderItemInfo(Languages.transferScreen.receiver, data?.name_account)}
                    {renderItem(Languages.transferScreen.account, data?.account)}
                    <View style={styles.wrapMoney}>
                        <Text style={styles.txtLabel}>{Languages.transferScreen.money}</Text>
                        <Text style={styles.redText}>{data?.money}</Text>
                    </View>
                    {renderItem(Languages.transferScreen.content, data?.description)}
                    <View style={styles.wrapAlert}>
                        {/* <AlertIc /> */}
                        <Text style={styles.txtAlert}>{Languages.transferScreen.alert}</Text>
                    </View>
                    <Text style={styles.label}>{Languages.transferScreen.or}</Text>
                    <View style={styles.wrapQr}>
                        {!!link&&<MyImageView
                            style={styles.qr}
                            imageUrl={link}
                            resizeMode={'stretch'}
                        />}
                        <View style={styles.wrapInfo}>
                            <Text style={styles.txtCompany}>{data?.name_account?.toLocaleUpperCase()}</Text>
                            {renderItemBank(Languages.transferScreen.bankName, data?.name_bank)}
                            {renderItemBank(Languages.transferScreen.bankAccount, data?.account)}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
});

export default TransferScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapContent: {
        marginHorizontal: 16
    },
    txtDes: {
        ...Styles.typography.regular,
        marginVertical: 24,
        color: COLORS.BLACK
    },
    label: {
        ...Styles.typography.medium,
        color: COLORS.BLACK,
        marginBottom: 10
    },
    wrapBank: {
        paddingVertical: 12,
        paddingLeft: 16,
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        borderColor: COLORS.GRAY_11,
        marginBottom: 8,
        borderRadius: 20
    },
    wrapItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: COLORS.GRAY_13,
        borderWidth: 1,
        borderColor: COLORS.GRAY_11,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 8

    },
    txtLabel: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size12,
        marginVertical: 8
    },
    btCopy: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        backgroundColor: COLORS.GREEN,
        borderRadius: 20
    },
    txtCopy: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size12,
        color: COLORS.WHITE
    },
    txtValue: {
        ...Styles.typography.medium
    },
    wrapMoney: {
        marginBottom: 8
    },
    wrapAlert: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        backgroundColor: COLORS.WHITE,
        borderRadius: 8,
        paddingHorizontal: 5,
        marginTop: 16,
        marginBottom: 24
    },
    txtAlert: {
        ...Styles.typography.regular,
        color: COLORS.RED_2,
        marginLeft: 5,
        width: SCREEN_WIDTH - 62,
        fontSize: Configs.FontSize.size12
    },
    wrapQr: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        width: '100%',
        paddingTop: 40,
        borderRadius: 20
    },
    qr: {
        alignSelf: 'center',
        width: 260,
        height: 260,
        marginBottom: 20
    },
    wrapInfo: {
        borderTopColor: COLORS.GRAY_7,
        borderTopWidth: 1,
        paddingTop: 16,
        paddingHorizontal: 8,
        paddingBottom: 20
    },
    txtCompany: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        alignItems: 'center'
    },
    label1: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size20,
        color: COLORS.GRAY_6
    },
    value1: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size20

    },
    redText: {
        ...Styles.typography.regular,
        color: COLORS.GREEN
    }
});
