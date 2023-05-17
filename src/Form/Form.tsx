import './Form.scss';
import { useForm } from 'react-hook-form';
import Card from '../Card/Card';
import foodImage from '../Images/blueSandwich.jpg';

type FormData = {
  name: string;
  preparationTime: string;
  type: DishType;
  numberOfSlices: number;
  diameter: number;
  spiciness: number;
  slicesOfBread: number;
};

enum DishType {
  Pizza = 'Pizza',
  Soup = 'Soup',
  Sandwich = 'Sandwich',
}

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      preparationTime: '00:00:00',
      type: undefined,
      numberOfSlices: undefined,
      diameter: undefined,
      spiciness: 0,
      slicesOfBread: undefined,
    },
  });

  console.log(errors);

  const watchSelectedType = watch('type');
  console.log(watchSelectedType);
  const watchSpiciness = watch('spiciness');

  return (
    <Card>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <img src={foodImage} alt="Food" />

        <div>
          <label htmlFor="name">Name </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register('name', {
              required: 'This is required',
              min: 0,
              maxLength: 80,
              minLength: {
                value: 4,
                message: 'Min length is 4',
              },
            })}
          />
          {/* <p>{errors.name?.message}</p> */}
        </div>
        <div>
          <label htmlFor="preparationTime">Preparation Time </label>
          <input
            id="preparationTime"
            type="time"
            placeholder="Preparation time"
            step={1}
            {...register('preparationTime', {
              required: true,
              max: 24,
              min: 0,
            })}
          />
        </div>
        <div>
          <label htmlFor="type">Dish Type </label>
          <select {...register('type', { required: true })}>
            <option selected={true} disabled={true}>
              Choose your dish
            </option>
            <option value="Pizza">Pizza</option>
            <option value="Soup">Soup</option>
            <option value="Sandwich">Sandwich</option>
          </select>
        </div>

        {watchSelectedType === DishType.Pizza && (
          <>
            <div>
              <label htmlFor="numberOfSlices">Number of slices </label>
              <input
                id="numberOfSlices"
                type="number"
                placeholder="Number of slices"
                {...register('numberOfSlices', {
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
                {...register('diameter', { required: true, max: 60, min: 0 })}
              />
            </div>
          </>
        )}
        {watchSelectedType === DishType.Soup && (
          <div>
            <label htmlFor="spiciness">Spiciness</label>
            <input
              id="spiciness"
              type="range"
              placeholder="Spiciness"
              min="1"
              max="10"
              {...register('spiciness', {
                required: true,
                max: 10,
                min: 1,
              })}
            />
          </div>
        )}
        {watchSelectedType === DishType.Sandwich && (
          <div>
            <label htmlFor="slicesOfBread">Slices of bread </label>
            <input
              id="slicesOfBread"
              type="number"
              placeholder="Slices of bread"
              {...register('slicesOfBread', {
                required: true,
                max: 10,
                min: 1,
              })}
            />
          </div>
        )}

        <input type="submit" />
      </form>
    </Card>
  );
};

export default Form;
