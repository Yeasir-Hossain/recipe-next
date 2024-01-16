"use client"

import InputWithBadge from '@/components/shared/input/InputWithBadge'
import ingredients from '../../../../ingredients.json'
import Input from '@/components/shared/input/Input'
import { useForm } from 'react-hook-form';
import { X } from "@phosphor-icons/react"
import Textarea from '@/components/shared/input/TextArea';
import { useEffect } from 'react';
import { useGlobalCtx } from '@/context/Global/GlobalProvider';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addRecipe, patchRecipe } from '@/lib/recipes';
import { createRecipe, updateRecipe } from '@/reducers/recipeSlice';

/**
 * React component for adding or editing a recipe.
 * 
 * @param {string} heading - The heading for the modal, default is 'Create'.
 * @param {string} btnText - The text for the submit button, default is 'Add'.
 * @param {string} id - The id of the recipe to be edited, default is an empty string for creating a new recipe.
 * @returns React component
 */
export default function AddEditModal({ heading = 'Create', btnText = 'Add', id = '' }) {
  const { closeModal } = useGlobalCtx();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeStore.recipe?.find((s) => s.id === id) || {}, shallowEqual);
  const { register, handleSubmit, setValue, setError, clearErrors, formState: { errors } } = useForm();

  /**
   * This funtion handles the add/update of a single recipe
   * If @id is passed, then the funtion triggers the update
   * else triggers the add operation
   * after successful add/update the modal is closed.
   */
  const onSubmit = (data) => {
    if (!data?.ingredients.length) {
      setError("ingredients", { message: "This field is required" });
      return;
    }
    if (!data.resource.length > 0) {
      delete data.resource;
    }
    data.ingredients = data.ingredients.join(',');

    // for add or update
    const recipePromise = id === '' || !id ? addRecipe(data) : patchRecipe(id, data);

    recipePromise
      .then((recipe) => {
        if (recipe.id) {
          const action = id === '' || !id ? createRecipe : updateRecipe;
          dispatch(action(recipe));
          closeModal('addeditRecipe');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        clearErrors();
      });
  };

  useEffect(() => {
    if (id !== '') {
      setValue('title', recipe.title);
      setValue('instructions', recipe.instructions);
    }
  }, [id]);
  return (
    <div className='md:w-[620px] w-[350px] rounded-lg bg-white md:pt-5 md:pb-6 py-3 border-b border-barbg md:px-5 px-3 '>
      <div className='flex justify-between mb-5'>
        <h1 className='text-blue font-semibold text-xl'>{heading} Recipe</h1>
        <button onClick={(e) => {
          e.stopPropagation();
          closeModal('addeditRecipe');
        }}>
          <X size={24} color='#363636' />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          label='Title'
          setValue={setValue}
          register={() =>
            register("title", {
              required: 'This field is required',
            })
          }
          id='title'
          errors={errors["title"]}
        />

        {/*
          the ingredient field is modified to match the local json as in backend I am saving it seperated by using comma 
          the local json is also modified to match the InputWithBadge component
        */}
        <InputWithBadge
          label="Ingredient"
          placeholder="Ingredients"
          data={ingredients.map((ingredient) => { return { id: ingredient.id, name: ingredient.label } })}
          name="ingredients"
          setValue={setValue}
          value={recipe?.id ? recipe.ingredients.split(',').map((ingredient, i) => { return { id: i, name: ingredient } }) : null}
          errors={errors["ingredients"]}
        />

        <Textarea
          name="instructions"
          label="Instructions"
          setValue={setValue}
          register={() =>
            register("instructions", {
              required: 'This field is required',
            })
          }
          id='instructions'
          errors={errors["instructions"]}
        />
        <Input type={'file'}
          name="resource"
          setValue={setValue}
          register={() =>
            register("resource")
          }
          id='resource'
          classNames={'border-transparent'}
          errors={errors["resource"]}
        />
        <div className='w-max ml-auto p-4'>
          <button onClick={() => closeModal('addeditRecipe')} className=' w-24 py-2 bg-white rounded mr-2 border border-barbg'>Cancel</button>
          <button type='submit' className=' w-24 py-2 bg-blue-500 text-white rounded'>{btnText}</button>
        </div>
      </form>
    </div>


  )
}
