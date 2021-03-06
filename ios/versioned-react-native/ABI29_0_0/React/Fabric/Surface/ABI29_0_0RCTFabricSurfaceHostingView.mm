/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "ABI29_0_0RCTFabricSurfaceHostingView.h"

#import "ABI29_0_0RCTFabricSurface.h"

@implementation ABI29_0_0RCTFabricSurfaceHostingView

- (instancetype)initWithBridge:(ABI29_0_0RCTBridge *)bridge
                    moduleName:(NSString *)moduleName
             initialProperties:(NSDictionary *)initialProperties
{
  ABI29_0_0RCTFabricSurface *surface = [[ABI29_0_0RCTFabricSurface alloc] initWithBridge:bridge
                                                            moduleName:moduleName
                                                     initialProperties:initialProperties];
  return [self initWithSurface:surface];
}

@end

