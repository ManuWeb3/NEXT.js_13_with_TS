'use client'
import React, { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary'
// CldImage - used to render the upoaded image

interface CloudinaryResult {
  public_id: string
  // the same prop that I expect in result.info.  ...
}

const UploadWidget = () => {
  const [publicId, setPublicId] = useState('') // initialize state variable publicId
  // for multiple-image upload production, use array of strings to init the state)

  return (
    <>
      {/* Execution Step # 3: Enter <CldImage>
      after the state var is set, entire comp. gets re-rendered at the same component in Viewport*/}

      {publicId && (
        <CldImage
          src={publicId}
          width={270}
          height={180}
          alt="Happy Halloween"
        />
      )}
      {/* even {} cannot come outside the Parent tag. Single Parent tag will encompass all categories of children*/
      /* if 'publicId' is truthy, then render the component <CldImage> with the properties*/
      /* Execution Step # 2: Enter <CldUploadWidget>
      at upload, all settings/appearances rendered on the widget*/}

      <CldUploadWidget
        uploadPreset="zhqpll4g"
        options={{
          sources: ['local'],
          cropping: true,
          multiple: false,
          styles: {
            palette: {
              window: '#5D005D',
              sourceBg: '#3A0A3A',
              windowBorder: '#AD5BA3',
              tabIcon: '#ffffcc',
              inactiveTabIcon: '#FFD1D1',
              menuIcons: '#FFD1D1',
              link: '#ffcc33',
              action: '#ffcc33',
              inProgress: '#00e6b3',
              complete: '#a6ff6f',
              error: '#ff1765',
              textDark: '#3c0d68',
              textLight: '#fcfffd',
            },
          },
        }}
        onUpload={(result, widget) => {
          if (result.event != 'success') return
          /*
          const info = result.info as CloudinaryResult
          setPublicId(info.public_id)
        */
          setPublicId((result.info as CloudinaryResult).public_id)
          // at setting the state var: publicId, entire component gets re-rendered
        }}
      >
        {/* below fn. comes inside <CldUploadWidget></CldUploadWidget> */}
        {({ open }) => (
          // Execution Step # 1: 'open' : opens up the widget

          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  )
}

export default UploadWidget

// Cannot include a button inside as <CldUploadWidget> expects a function
// destructured object (to get open function/method) inside JS function ({ open })
// due to btn-click event, it must be a client component
