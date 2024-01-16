/* eslint-disable no-unused-vars */
"use client"
import { useEffect, useRef, useState } from 'react';
import { X, CaretDown, WarningOctagon } from '@phosphor-icons/react'
/**
 * Input with Badge Component
 *
 * @component
 * @param {string} label - The label text for the textarea. i.e. label='Label name'
 * @param {string} name - The name for the textarea. i.e. name='Name'
 * @param {Array} data - The data that will be shown in dropdown. i.e. [{ id: "1", name: "Computer Fundamentals" }]
 * @param {Array} value - The current value of the textarea. i.e. ['1','2']
 * @param {function} getValue - A callback function to handle  value changes. i.e. getValue={valuehandler}
 * @param {function} setValue - A callback function to handle  hookForm value. i.e. setValue={setValue}
 * @param {string} placeholder - The placeholder text for the textarea. i.e. placeholder='your text here'
 * @param {object} errors - Errors object of hookform. i.e. errors={errors["name"]}
 * @returns {JSX.Element} The rendered textarea element.
 */

export default function InputWithBadge({
  data = [],
  value,
  getValue = () => { },
  label,
  placeholder,
  setValue = () => { },
  name,
  errors,
  delCallBack = () => ({}),
}) {
  const [isOpen, setIsopen] = useState(false);
  const [selected, setSelected] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    if (value) {
      setSelected(data.filter(obj => value.some(item => item.name === obj.name)));
    }
  }, [value, data]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) setIsopen(false);
    };
    isOpen
      ? document.addEventListener('mousedown', handleOutsideClick)
      : document.removeEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleSelect = (value) => {
    const isFound = selected.find((item) => item?.name === value?.name);
    if (isFound) {
      setSelected(selected?.filter((item) => item?.name !== value?.name));
    } else {
      setSelected((prev) => [...prev, value]);
    }
  };
  const deleteHandler = (value) => {
    const newData = selected.filter((item) => item?.name !== value?.name);
    setSelected(newData);
    delCallBack(value.name);
  };

  useEffect(() => {
    getValue(selected);
    setValue(
      name || 'inputWithBadge',
      selected.map((item) => item?.name),
    );
  }, [selected]);

  return (
    <>
      {
        label ? <p className="pb-1 font-normal text-sm">{label}</p>
          : ''
      }

      <button
        type="button"
        className={`w-full min-h-[2.672rem] px-3 bg-white rounded shadow-inner border justify-between items-start gap-3 inline-flex relative  ${errors ? 'border-red ' : 'border-gray-400 '
          }`}
        ref={modalRef}
        onClick={() => {
          setIsopen((prev) => !prev);
        }}
      >
        <span className="flex items-center gap-2 flex-wrap p-1  min-h-[2.672rem]">
          {selected?.length === 0 && placeholder}
          {selected?.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-200 rounded items-center gap-1 flex p-1"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="text-neutral-800  text-xs font-normal pl-[0.25px]">
                {item?.name}
              </div>
              <span onClick={() => deleteHandler(item)}>
                <X size={18} />
              </span>
            </div>
          ))}
        </span>
        <div className="w-[1.375rem] h-3.5 mt-[0.844rem]  rounded-sm">
          <CaretDown size={18} />
        </div>

        {
          isOpen ? (
            <div className="top-[44px] left-0 absolute shadow-lg py-2 pr-2  rounded right-0 text-start max-h-[18rem] min-h-[2rem] overflow-y-auto no-scrollbar bg-white z-[1000]">
              {data.map((item, i) => {
                const isSelected = selected.find((itm, i) => itm?.name === item.name);
                return (
                  <div key={i} className="relative">
                    <div
                      className={`bg-blue-500 absolute left-0 top-0 bottom-0 rounded-r w-[0.188rem]  ${isSelected ? 'block ' : 'hidden'
                        } `}
                    />
                    <div
                      onClick={(e) => {
                        handleSelect(item);
                        setIsopen(!isOpen);
                        e.stopPropagation();
                      }}
                      className={`w-full ml-2 px-2 py-[0.625rem] rounded cursor-pointer hover:bg-dimBlue ${isSelected ? 'bg-dimBlue ' : ''
                        }`}
                    >
                      {item?.name}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ''
          )
        }
      </button>

      {
        errors && (
          <p className="text-red-600 text-sm font-normal leading-tight flex items-center gap-2 pt-1">
            <WarningOctagon size={18} />
            {errors.message}
          </p>
        )
      }
    </>
  );
}
