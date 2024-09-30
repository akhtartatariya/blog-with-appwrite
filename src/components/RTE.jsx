import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Controller } from 'react-hook-form'
import { conf } from '../conf/conf'
const RTE = ({ control, name, label, className = "", defaultValue = '', ...props }, ref) => {
    return (
        <>
            {label && <label className='text-[#0E1731] text-sm font-semibold mb-1 block text-left'>{label}</label>}
            <Controller name={name || 'content'} control={control} render={({ field: { onChange } }) => (
                <Editor
                    apiKey={conf.tinyMCEApiKey}
                    initialValue={defaultValue}
                    init={{
                        height: 500,
                        menubar: true,
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}

                    onEditorChange={onChange}
                    {...props}
                    ref={ref}
                />
            )} />
        </>
    )
}

export default React.forwardRef(RTE)
