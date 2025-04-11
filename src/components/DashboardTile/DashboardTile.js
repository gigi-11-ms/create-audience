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
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  SpaceVertical,
  Button,
  Space,
  InputText,
  Spinner,
  Span,
} from '@looker/components'
import { ExtensionContext40 } from '@looker/extension-sdk-react'
import { createAudience } from '../../api'

export const DashboardTile = ({ standalone }) => {
  const {
    extensionSDK,
    coreSDK,
    tileSDK: {
      tileHostData: { dashboardFilters, dashboardId },
    },
    ...rest
  } = useContext(ExtensionContext40)
  const [formOpen, setFormOpen] = useState(false)
  const [audienceTitle, setAudienceTitle] = useState('')
  const [filters, setFilters] = useState()
  const [filtersLoading, setFiltersLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const fetchDashboardFilters = async ({ sdk, dashboardId }) => {
      setFiltersLoading(true)
      try {
        const dashboardElements = await sdk.ok(
          sdk.dashboard_dashboard_elements(dashboardId)
        )
        const filters =
          dashboardElements[0]?.result_maker?.filterables[0]?.listen
        setFilters(filters)
      } catch (error) {
        console.error('Something went wrong')
      } finally {
        setFiltersLoading(false)
      }
    }
    if (coreSDK && dashboardId)
      fetchDashboardFilters({ sdk: coreSDK, dashboardId })
  }, [dashboardId])

  const height = standalone ? 'calc(100vh - 100px)' : '100%'

  const handleCreate = useCallback(async () => {
    try {
      setIsLoading(true)
      const email = await extensionSDK.userAttributeGetItem('email')
      const username = await extensionSDK.userAttributeGetItem('name')

      const adjustedFilters = {}
      filters.forEach(({ dashboard_filter_name: name, field }) => {
        adjustedFilters[field] = dashboardFilters[name]
      })

      await createAudience({
        audienceTitle,
        email,
        username,
        dashboardFilters: adjustedFilters,
      })
      setFormOpen(false)
      setAudienceTitle('')
      setIsSuccess(true)
    } catch (error) {
      console.error(error)
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }, [dashboardFilters, audienceTitle, filters])

  useEffect(() => {
    extensionSDK.rendered()
  }, [])

  if (isLoading)
    return (
      <Space justify="center">
        <Spinner />
      </Space>
    )

  if (isSuccess)
    return (
      <Space justify="center">
        <Span>Audience created!</Span>
        <Button
          onClick={() => {
            setIsSuccess(false)
            setFormOpen(true)
          }}
        >
          Create New Audience
        </Button>
      </Space>
    )

  return (
    <SpaceVertical
      p="xxxxxlarge"
      width="100%"
      align="center"
      height={height}
      justify="center"
    >
      {formOpen ? (
        <Space gap="medium" padding={16}>
          <Space justify="center">
            <InputText
              value={audienceTitle}
              onChange={(e) => setAudienceTitle(e.currentTarget.value)}
              placeholder="Audience Title"
            />
          </Space>

          <Space
            gap="medium"
            justify="fled-end"
            height={'100%'}
            align="flex-end"
            flex={1}
          >
            <Button
              color="neutral"
              onClick={() => {
                setFormOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!audienceTitle || filtersLoading}
            >
              Create
            </Button>
          </Space>
        </Space>
      ) : (
        <Button
          onClick={() => {
            setFormOpen(true)
          }}
        >
          Create Audience
        </Button>
      )}
    </SpaceVertical>
  )
}
