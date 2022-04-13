import { BottomSheetBackdrop, BottomSheetBackdropProps, useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';
import React from 'react';

export const CustomBackdropBottomSheet = (props: BottomSheetBackdropProps) => {
    return <BottomSheetBackdrop {...props} pressBehavior="close" />;
};

