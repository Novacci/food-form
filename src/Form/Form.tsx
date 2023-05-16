import './Form.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Form = () => {
  //   const [selectedOption, setSelectedOption] = useState(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   const onSubmit = (data) => console.log(data);
  console.log(errors);

  //   const selectOptionHandler = (event) => {
  //     setSelectedOption(event.target.value);
  //   };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Name </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register('Name', { required: true, min: 0, maxLength: 80 })}
          />
        </div>
        <div>
          <label htmlFor="preparationTime">Preparation Time </label>
          <input
            id="preparationTime"
            type="time"
            placeholder="Preparation time"
            step={1}
            {...register('Preparation time', {
              required: true,
              max: 24,
              min: 0,
            })}
          />
        </div>
        <div>
          <label htmlFor="type">Dish Type </label>
          <select {...register('Type', { required: true })}>
            <option value="Pizza">Pizza</option>
            <option value="Soup">Soup</option>
            <option value="Sandwich">Sandwich</option>
          </select>
        </div>
        <div>
          <label htmlFor="numberOfSlices">Number of slices </label>
          <input
            id="numberOfSlices"
            type="number"
            placeholder="Number of slices"
            {...register('Number of slices', {
              required: true,
              max: 8,
              min: 0,
            })}
          />
        </div>
        <div>
          <label htmlFor="diameter">Diameter </label>
          <input
            id="diameter"
            type="number"
            placeholder="Diameter"
            {...register('Diameter', { required: true, max: 60, min: 0 })}
          />
        </div>
        <div>
          <label htmlFor="spiciness">Spiciness</label>
          <input
            id="spiciness"
            type="range"
            placeholder="Spiciness"
            {...register('Spiciness', { required: true, max: 10, min: 1 })}
          />
        </div>
        <div>
          <label htmlFor="slicesOfBread">Slices of bread </label>
          <input
            id="slicesOfBread"
            type="number"
            placeholder="Slices of bread"
            {...register('Slices of bread', { max: 10, min: 1 })}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;
