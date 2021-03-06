/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>

#import <ReactABI27_0_0/ABI27_0_0RCTInvalidating.h>
#import <ReactABI27_0_0/ABI27_0_0RCTRootView.h>
#import <ReactABI27_0_0/ABI27_0_0RCTView.h>

@class ABI27_0_0RCTBridge;
@class ABI27_0_0RCTTouchHandler;

@interface ABI27_0_0RCTRootContentView : ABI27_0_0RCTView <ABI27_0_0RCTInvalidating>

@property (nonatomic, readonly, weak) ABI27_0_0RCTBridge *bridge;
@property (nonatomic, readonly, assign) BOOL contentHasAppeared;
@property (nonatomic, readonly, strong) ABI27_0_0RCTTouchHandler *touchHandler;
@property (nonatomic, readonly, assign) CGSize availableSize;

@property (nonatomic, assign) BOOL passThroughTouches;
@property (nonatomic, assign) ABI27_0_0RCTRootViewSizeFlexibility sizeFlexibility;

- (instancetype)initWithFrame:(CGRect)frame
                       bridge:(ABI27_0_0RCTBridge *)bridge
                     ReactABI27_0_0Tag:(NSNumber *)ReactABI27_0_0Tag
               sizeFlexiblity:(ABI27_0_0RCTRootViewSizeFlexibility)sizeFlexibility NS_DESIGNATED_INITIALIZER;

@end
