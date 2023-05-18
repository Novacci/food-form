import './Form.scss';
import { useForm, Controller } from 'react-hook-form';
import Card from '../Card/Card';
import foodImage from '../Images/blueSandwich.jpg';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

type FormData = {
  name: string;
  preparation_time: string;
  type: DishType | string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
};

enum DishType {
  Pizza = 'pizza',
  Soup = 'soup',
  Sandwich = 'sandwich',
}

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [serverResponse, setServerResponse] = useState<JSON>();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      preparation_time: '',
      type: undefined,
      no_of_slices: undefined,
      diameter: undefined,
      spiciness_scale: 0,
      slices_of_bread: undefined,
    },
  });

  const watchSelectedType = watch('type');

  const closeErrorAlertHandler = () => {
    setError(false);
  };

  const closeSuccessAlertHandler = () => {
    setSuccess(false);
  };

  const removePizzaProperties = (data: FormData) => {
    delete data.diameter;
    delete data.no_of_slices;
  };

  const removeSoupProperies = (data: FormData) => {
    delete data.spiciness_scale;
  };

  const removeSandwichProperties = (data: FormData) => {
    delete data.slices_of_bread;
  };

  const sendData = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setServerResponse(await response.json());
      } else {
        throw Error(response.status.toString());
      }
    } catch (error: any) {
      setMessageError(error.message);
      setError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const timePattern = /^\d\d:\d\d$/;
  const onSubmit = (data: FormData) => {
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
    if (timePattern.test(data.preparation_time)) {
      data.preparation_time = data.preparation_time + ':00';
    }
    data.type = data.type.toLowerCase();
    sendData(data);
  };

  return (
    <Card>
      <Stack
        sx={{
          display: 'flex',
          width: 'auto',
          position: 'absolute',
          left: '50%',
          top: { xs: '10%', sm: '0' },
          transform: 'translate(-50%,-50%)',
        }}
        spacing={2}
      >
        {success && (
          <Alert onClose={() => closeSuccessAlertHandler()} severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>Data send completed with success!</strong>
          </Alert>
        )}
        {error && (
          <Alert onClose={() => closeErrorAlertHandler()} severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>Request failed with status: {messageError}</strong>
          </Alert>
        )}
      </Stack>

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

          {errors.name?.type === 'required' && (
            <p className="warning">This field is required</p>
          )}
          {errors.name?.type === 'minLength' && (
            <p className="warning">Your name is less than 4 characters</p>
          )}
        </div>
        <div>
          <label htmlFor="preparation_time">Preparation Time</label>
          <input
            id="preparation_time"
            type="time"
            placeholder="Preparation time"
            step={1}
            pattern="[0-2][0-4]:[0-5][0-9]:[0-5][0-9]"
            list="exampleTimesList"
            {...register('preparation_time', {
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
          {errors.preparation_time?.type === 'required' && (
            <p className="warning">This field is required</p>
          )}
        </div>
        <div>
          <label htmlFor="type">Dish Type</label>
          <select defaultValue="" {...register('type', { required: true })}>
            <option disabled value="">
              Choose your dish
            </option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </select>
          {errors.type?.type === 'required' && (
            <p className="warning">This field is required</p>
          )}
        </div>
        {watchSelectedType === DishType.Pizza && (
          <>
            <div>
              <label htmlFor="no_of_slices">Number of slices</label>
              <input
                id="no_of_slices"
                min="1"
                max="8"
                type="number"
                placeholder="Number of slices"
                {...register('no_of_slices', {
                  required: true,
                  max: 8,
                  min: 0,
                })}
              />
              {errors.no_of_slices?.type === 'required' && (
                <p className="warning">This field is required</p>
              )}
              {errors.no_of_slices?.type === 'min' && (
                <p className="warning">
                  You can not have less than 1 slice of your pizza
                </p>
              )}
              {errors.no_of_slices?.type === 'max' && (
                <p className="warning">
                  You can not have more than 8 slices of your pizza
                </p>
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
              <p className="warning">This field is required</p>
            )}
          </>
        )}
        {watchSelectedType === DishType.Soup && (
          <Box width={280}>
            <label htmlFor="spiciness_scale">Spiciness</label>
            <Controller
              name="spiciness_scale"
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
            {errors.spiciness_scale?.type === 'required' && (
              <p className="warning">This field is required</p>
            )}
            {errors.spiciness_scale?.type === 'min' && (
              <p className="warning">
                You need to have at least 1 in spiciness scale
              </p>
            )}
          </Box>
        )}
        {watchSelectedType === DishType.Sandwich && (
          <div>
            <label htmlFor="slices_of_bread">Slices of bread</label>
            <input
              min="1"
              max="8"
              id="slices_of_bread"
              type="number"
              placeholder="Slices of bread"
              {...register('slices_of_bread', {
                required: true,
                max: 10,
                min: 1,
              })}
            />
            {errors.slices_of_bread?.type === 'required' && (
              <p className="warning">This field is required</p>
            )}
            {errors.slices_of_bread?.type === 'min' && (
              <p className="warning">
                You can not have less than 1 slice of your bread
              </p>
            )}
            {errors.slices_of_bread?.type === 'max' && (
              <p className="warning">
                You can not have more than 10 slice of your bread
              </p>
            )}
          </div>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <input type="submit" />
        )}
      </form>
      {serverResponse && (
        <div className="server-response-position">
          <p>Server Response: </p>
          <pre>{JSON.stringify(serverResponse, null, 4)}</pre>
        </div>
      )}
    </Card>
  );
};

export default Form;
