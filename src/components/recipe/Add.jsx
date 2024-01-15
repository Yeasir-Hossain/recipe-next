"use client"
import InputWithBadge from '@/components/shared/input/InputWithBadge'
import ingredients from '../../../ingredients.json'
import Input from '@/components/shared/input/Input'
import { useForm } from 'react-hook-form';

export default function Add() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!data?.ingredients.length) {
      setError("ingredients", { message: "This field is required" });
    }
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWithBadge
        label="Ingredient"
        placeholder="Ingredients"
        data={ingredients.map((ingredient) => { return { id: ingredient.id, name: ingredient.label } })}
        name="ingredients"
        setValue={setValue}
        errors={errors["ingredients"]}
      />
      <Input type={'file'}
        name="resource"
        setValue={setValue}
        register={() =>
          register("resource")
        }
        id='resource'
        errors={errors["resource"]}
      />
      <Input type={'submit'} />
    </form>
  )
}
