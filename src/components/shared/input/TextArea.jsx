/**
 * TextArea Component
 *
 * @component
 * @param {string} label - The label text for the textarea.
 * @param {string} name - The name attribute for the textarea.
 * @param {string} id - The id attribute for the textarea.
 * @param {string} value - The current value of the textarea.
 * @param {function} onChange - A callback function to handle textarea value changes.
 * @param {string} placeholder - The placeholder text for the textarea.
 * @param {bool} required - Whether the textarea is required or not.
 * @param {bool} disabled - Whether the textarea is disabled or not..
 * @returns {JSX.Element} The rendered textarea element.
 */

import { WarningOctagon } from '@phosphor-icons/react'

export default function Textarea({
  label,
  onChange,
  errors,
  register = () => { },
  placeholder = '',
  ...rest
}) {
  return (
    <>
      {
        label && <p className={`pb-1 font-normal text-xs lg:text-sm  `}>{label}</p>
      }
      <textarea
        spellCheck="off"
        placeholder={placeholder}
        {...register()}
        {...rest}
        onChange={onChange}
        className={`p-3 border border-[#AEB4B9] rounded w-full h-[120px] resize-none outline-none self-stretch placeholder:text-zinc-500 text-sm font-normal leading-tight ${errors ? "border-[#D82C0D] bg-[#FFF4F4]" : ""
          }`}
      ></textarea>
      {
        errors && (
          <p className="text-red-600 text-sm font-normal leading-tight flex items-center gap-2 pt-1">
            <WarningOctagon />
            {errors.message}
          </p>
        )
      }
    </>
  );
}
