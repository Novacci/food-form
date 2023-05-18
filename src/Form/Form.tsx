import './Form.scss';
import { useForm, Controller } from 'react-hook-form';
import Card from '../Card/Card';
import foodImage from '../Images/blueSandwich.jpg';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

type FormData = {
  name: string;
  preparationTime: number;
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
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      preparationTime: 0,
      type: undefined,
      numberOfSlices: undefined,
      diameter: undefined,
      spiciness: 0,
      slicesOfBread: undefined,
    },
  });

  console.log(errors);

  const watchSelectedType = watch('type');

  const removePizzaProperties = (data: any) => {
    delete data.diameter;
    delete data.numberOfSlices;
  };

  const removeSoupProperies = (data: any) => {
    delete data.spiciness;
  };

  const removeSandwichProperties = (data: any) => {
    delete data.slicesOfBread;
  };

  const onSubmit = (data: any) => {
    if (watchSelectedType === DishType.Pizza) {
      removeSoupProperies(data);
      removeSandwichProperties(data);
    } else if (watchSelectedType === DishType.Soup) {
      removeSandwichProperties(data);
      removePizzaProperties(data);
    } else if (watchSelectedType === DishType.Sandwich) {
      removeSoupProperies(data);
      removePizzaProperties(data);
    }
    console.log(data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={foodImage} alt="Food" />

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register('name', {
              required: 'This is required',
              maxLength: 80,
              minLength: {
                value: 4,
                message: 'Min length is 4',
              },
            })}
          />

          {errors.name?.type === 'required' && <p>This field is required</p>}
          {errors.name?.type === 'minLength' && (
            <p>Your name is less than 4 characters</p>
          )}
        </div>
        <div>
          <label htmlFor="preparationTime">Preparation Time</label>
          <input
            id="preparationTime"
            type="time"
            placeholder="Preparation time"
            step={1}
            list="exampleTimesList"
            {...register('preparationTime', {
              required: true,
              max: 24,
              min: 0,
            })}
          />
          <datalist id="exampleTimesList">
            <option value="00:15:00" />
            <option value="00:30:00" />
            <option value="00:45:00" />
            <option value="01:00:00" />
            <option value="01:15:00" />
            <option value="01:30:00" />
          </datalist>
          {errors.preparationTime?.type === 'required' && (
            <p>This field is required</p>
          )}
        </div>
        <div>
          <label htmlFor="type">Dish Type</label>
          <select defaultValue="" {...register('type', { required: true })}>
            <option disabled value="">
              Choose your dish
            </option>
            <option value="Pizza">Pizza</option>
            <option value="Soup">Soup</option>
            <option value="Sandwich">Sandwich</option>
          </select>
        </div>
        {errors.type?.type === 'required' && <p>This field is required</p>}
        {watchSelectedType === DishType.Pizza && (
          <>
            <div>
              <label htmlFor="numberOfSlices">Number of slices</label>
              <input
                id="numberOfSlices"
                min="1"
                max="8"
                type="number"
                placeholder="Number of slices"
                {...register('numberOfSlices', {
                  required: true,
                  max: 8,
                  min: 0,
                })}
              />
              {errors.numberOfSlices?.type === 'required' && (
                <p>This field is required</p>
              )}
              {errors.numberOfSlices?.type === 'min' && (
                <p>You can not have less than 1 slice of your pizza</p>
              )}
              {errors.numberOfSlices?.type === 'max' && (
                <p>You can not have more than 8 slices of your pizza</p>
              )}
            </div>
            <div>
              <label htmlFor="diameter">Diameter</label>
              <input
                min="0"
                max="60"
                id="diameter"
                type="number"
                placeholder="Diameter"
                {...register('diameter', { required: true, max: 60, min: 0 })}
              />
            </div>
            {errors.diameter?.type === 'required' && (
              <p>This field is required</p>
            )}
          </>
        )}
        {watchSelectedType === DishType.Soup && (
          <Box width={280}>
            <label htmlFor="spiciness">Spiciness</label>
            <Controller
              name="spiciness"
              control={control}
              rules={{ required: true, min: 1, max: 10 }}
              render={({ field }) => (
                <Slider
                  defaultValue={1}
                  valueLabelDisplay="auto"
                  min={1}
                  max={10}
                  step={1}
                  {...field}
                />
              )}
            />
            {errors.spiciness?.type === 'required' && (
              <p>This field is required</p>
            )}
            {errors.spiciness?.type === 'min' && (
              <p>You need to have at least 1 in spiciness scale</p>
            )}
          </Box>
        )}
        {watchSelectedType === DishType.Sandwich && (
          <div>
            <label htmlFor="slicesOfBread">Slices of bread</label>
            <input
              min="1"
              max="8"
              id="slicesOfBread"
              type="number"
              placeholder="Slices of bread"
              {...register('slicesOfBread', {
                required: true,
                max: 10,
                min: 1,
              })}
            />
            {errors.slicesOfBread?.type === 'required' && (
              <p>This field is required</p>
            )}
            {errors.slicesOfBread?.type === 'min' && (
              <p>You can not have less than 1 slice of your bread</p>
            )}
            {errors.slicesOfBread?.type === 'max' && (
              <p>You can not have more than 10 slice of your bread</p>
            )}
          </div>
        )}

        <input type="submit" />
      </form>
    </Card>
  );
};

export default Form;
