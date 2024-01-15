'use client'
import { WarningOctagon } from '@phosphor-icons/react'
/**
 * Input Component
 * @param {*} args
 * @param {String} args.type  Type of the input Field
 * @param {String} args.label Label text for input
 * @param {boolean} args.required required prop
 * @param {Function} args.register Register Function to set value using hookform
 * @param {String} args.classNames Tailwind classes
 * @param {String} args.varient Tailwind varient
 * @param {any} args.StartIcon React icon
 * @param {any} args.EndIcon React icon
 * @param {String} args.labelVarient Tailwind varient for label
 * @param {String} args.iconVarient Tailwind varient for icon
 * @param {Object} args.errors Hookform error state
 * @returns
 */
export default function Input({
  type = 'text',
  label = '',
  required = false,
  register = () => { },
  classNames = '',
  // StartIcon,
  // EndIcon,
  varient = '',
  labelVarient = '',
  iconVarient = '',
  errors,
  ...props
}) {

  return (
    <>
      {
        label !== '' ? <p className={`pb-2 font-normal text-sm lg:text-sm leading-5 ${labelVarient} `}>{label}</p> : ''
      }
      <div className="relative">
        <input
          onWheel={(e) => type === 'number' && e.target.blur()}
          type={type}
          className={`w-full rounded-[0.25rem]  outline-none border-dimGray border h-[2.25rem] }${errors ? 'border-red bg-[#FFF4F4]' : ''} placeholder:text-zinc-500  lg:text-sm font-normal tracking0-tight focus:placeholder:opacity-0 ${varient} ${classNames}`}
          {...register()}
          {...props}
          required={required}
          autoComplete='off'
          spellCheck="false"

        />
        {/* {StartIcon ? <StartIcon className={`h-[1.563rem] w-[1.563rem] absolute top-2 left-2 ${iconVarient}`} /> : ''}
        {EndIcon ? <EndIcon className={`h-[1.563rem] w-[1.563rem] absolute top-2 right-2 ${iconVarient}`} /> : ''} */}
      </div>
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