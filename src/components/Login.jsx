import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../features/authSlice';
import { Button, Input, RadioButton } from '../components/index.js';
import { useDispatch } from 'react-redux';
import authService from "../firebase/auth";
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, watch } = useForm();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const stayLogIn = watch('stayLogIn', true);

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login({
                email: data.email,
                password: data.password,
                persistence: data.stayLogIn ? 'local' : 'session'
            });

            if (session) {
                const userData = await authService.getCurrentUser();
                console.log(userData);
                const serializeData = {
                    uid: userData.uid,
                    email: userData.email,
                };
                if (userData) dispatch(authLogin({ userData: serializeData }));
                navigate('/getStarted');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="w-1/2 bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mt-8 mb-8">Sign in <br /> to ZealGrid</h2>
            <form onSubmit={handleSubmit(login)}>
                <div className="relative mt-10 mb-10">
                    <Input
                        label="Email:"
                        type="email"
                        {...register('email', {
                            required: true,
                            validate: {
                                pattern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || "Email address must be Valid"
                            }
                        })}
                    />
                </div>
                <div className="relative mt-10 mb-10">
                    <Input
                        label='Password'
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: true,
                        })}
                    />
                    {showPassword ? (
                        <VisibilityOff
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    ) : (
                        <Visibility
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    )}
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="text-left">
                    <RadioButton
                        label='Stay LogIn'
                        checked={stayLogIn}
                        onChange={(e) => setValue('stayLogIn', e.target.checked)}
                        {...register('stayLogIn')}
                    />
                </div>
                <div className="text-right mb-6">
                    <Button type="button" className="text-indigo-600 hover:underline">Forgot Password?</Button>
                </div>
                <div className="mt-8 mb-6 text-center">
                    <Button
                        type="submit"
                        className="w-40 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login;
