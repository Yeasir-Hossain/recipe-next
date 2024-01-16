"use client"

import { useGlobalCtx } from "@/context/Global/GlobalProvider";
import { deleteResource } from "@/lib/cloudinary";
import { deleteRecipe } from "@/lib/recipes";
import { removeRecipe } from "@/reducers/recipeSlice";
import { Trash, X } from "@phosphor-icons/react"
import { useDispatch } from "react-redux";

/**
 * React component for the Delete Recipe modal.
 * 
 * @param {string} id - The id of the recipe to be deleted.
 * @returns React component
 */
export default function DelModal({ id }) {
  const { closeModal } = useGlobalCtx();
  const dispatch = useDispatch();

  /**
 * Function to handle the deletion of the recipe.
 * Deletes the recipe using the deleteRecipe API call, dispatches the removeRecipe action,
 * and closes the modal.
 */
  const handleDelete = () => {
    deleteRecipe(id).then((res) => {
      if (res.id) {
        if (res.resource) {
          // behind the scene delete image from cloudinary
          deleteResource(res.resource)
        }
        dispatch(removeRecipe({ id }))
        closeModal('deleteRecipe')
      }
    }).catch((err) => { console.log(err); });
  }
  return (
    <div className='md:w-[620px] w-[350px] rounded-md overflow-hidden bg-white'>
      <div className='md:pt-5 md:pb-6 py-3 md:px-5 px-3 flex justify-between items-center'>
        <h1 className='text-text_black font-semibold text-xl flex gap-1 items-center'>
          <Trash size={18} />
          <span>Delete</span>
        </h1>
        <button onClick={() => closeModal('deleteRecipe')}>
          <X size={24} color='#363636' />
        </button>
      </div>
      <div className='flex flex-col md:px-10 px-5 py-5'>
        <p>This action can't be undone</p>
      </div>
      <div className='w-max ml-auto p-4'>
        <button onClick={() => closeModal('deleteRecipe')} className=' w-24 py-2 bg-white rounded mr-2 border border-barbg'>Cancel</button>
        <button onClick={() => handleDelete()} className='w-24 py-2 bg-[#FB8484] text-white rounded'>Delete</button>
      </div>
    </div>
  )
}
