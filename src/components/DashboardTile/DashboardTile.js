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
import React, { useContext, useEffect, useState } from 'react'
import {
  SpaceVertical,
  Button,
  Space,
  FloatingLabelField,
  InputText,
} from '@looker/components'
import { ExtensionContext40 } from '@looker/extension-sdk-react'

export const DashboardTile = ({ standalone }) => {
  const { extensionSDK } = useContext(ExtensionContext40)
  const [formOpen, setFormOpen] = useState(false)
  const [audienceTitle, setAudienceTitle] = useState('')
  const height = standalone ? 'calc(100vh - 100px)' : '100%'

  useEffect(() => {
    extensionSDK.rendered()
  }, [])

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

          <Space gap="medium" justify="center" height={'100%'} align="flex-end">
            <Button
              color="critical"
              onClick={() => {
                setFormOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log('create', audienceTitle)
              }}
              disabled={!audienceTitle}
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
