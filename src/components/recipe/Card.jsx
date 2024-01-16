"use client"

import Link from 'next/link'
import { Trash, ArrowRight, PencilSimple } from "@phosphor-icons/react"
import { useGlobalCtx } from '@/context/Global/GlobalProvider'
import DelModal from './modal/DelModal'
import AddEditModal from './modal/AddEditModal'

/**
 * React component representing a card for displaying recipe information.
 * 
 * @param {string} id - The unique identifier of the recipe.
 * @param {string} title - The title of the recipe.
 * @returns React component
 */
export default function Card({ id, title }) {
  const { openModal } = useGlobalCtx()

  // Handles the deletion of the recipe by opening the Delete Recipe modal.
  const handleDelete = () => {
    openModal('deleteRecipe', <DelModal id={id} />)
  }

  // Handles the update of the recipe by opening the Add/Edit Recipe modal in update mode.
  const handleAddUpdate = () => {
    openModal('addeditRecipe', <AddEditModal id={id} heading='Update' btnText='Update' />)
  }
  return (
    <div className="flex justify-between items-center rounded-md shadow-lg hover:shadow-xl transition-all duration-500 bg-white py-2 px-3 w-full">
      <div>
        <p className="font-semibold text-lg">{title}</p>
      </div>
      <div className='flex justify-center items-center space-x-2'>
        <button className='text-red-600' onClick={handleDelete}><Trash size={18} /></button>
        <button onClick={handleAddUpdate}><PencilSimple size={18} /></button>
        <Link href={`/${id}`}>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
