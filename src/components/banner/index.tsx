import React, { useCallback, useMemo } from 'react';
import {
    StyleSheet, View
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';

import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import { IconSize } from '@/theme/iconsize';
import { BannerModel } from '@/models/banner';
import {Touchable} from "@/components/elements/touchable";
import Utils from '@/utils/Utils';
import {MyStylesBanner} from "@/components/banner/styles";

const Banner = ({ banners }: any) => {
    const styles = MyStylesBanner();
    const renderBannerItem = useCallback(({ item }: { item: BannerModel }) => {

        const onOpenLink = () => {
            Utils.openURL(item.link);
        };

        return (
            <Touchable onPress={onOpenLink}
                       disabled={!item.link}>
                <FastImage
                    source={{ uri: item.image_mobile || item.image_mb }}
                    resizeMode={'cover'}
                    style={styles.bannerImage} />
            </Touchable>
        );
    }, []);
    const renderBanner = useMemo(() => {
        return <View style={styles.bannerContainer}>
            {banners && <Carousel
              data={banners}
              renderItem={renderBannerItem}
              sliderWidth={SCREEN_WIDTH + 20}
              itemWidth={IconSize.sizeBanner.width}
              autoplay
              loop
              autoplayDelay={2500}
            />}
        </View>;
    }, [banners, renderBannerItem]);

    return (
        renderBanner
    );
};

export default Banner;
