/*

 MIT License

 Copyright (c) 2023 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */
import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { ComponentsProvider } from '@looker/components'
import { ExtensionContext40 } from '@looker/extension-sdk-react'
import { MountPoint } from '@looker/extension-sdk'
import { DashboardTile } from './components/DashboardTile/DashboardTile'

const getDefaultRouteComponent = (mountPoint, isRendering, visConfig) => {
  const config = isRendering
    ? {
        ...visConfig,
        valueCountUp: false,
        waveAnimateTime: 0,
        waveRiseTime: 0,
        waveAnimate: false,
        waveRise: false,
      }
    : visConfig

  if (mountPoint === MountPoint.dashboardVisualization) {
    return <div>This Extension can only be used as Dashboard Tile</div>
  }

  return <DashboardTile config={config} />
}

const emptyConfig = {}

export const TileExtension = () => {
  const { lookerHostData, visualizationData } = useContext(ExtensionContext40)
  // The default visualization configuration can be overridden by the explore.
  // Make the overrides available to the visualization.
  const visConfig = visualizationData?.visConfig
  const mountPoint = lookerHostData?.mountPoint
  const isRendering = lookerHostData?.isRendering
  const component = useMemo(
    () =>
      getDefaultRouteComponent(
        mountPoint,
        isRendering,
        visConfig || emptyConfig
      ),
    [mountPoint, isRendering, visConfig]
  )

  return (
    <ComponentsProviderWrapper>
      <ComponentsProvider>{component}</ComponentsProvider>
    </ComponentsProviderWrapper>
  )
}

const ComponentsProviderWrapper = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`
