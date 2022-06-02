import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as NavLink } from "react-router-dom";

import { useAppDispatch } from "hooks";
import { loginUserThunk } from "Store/user-actions";
import { Box, Button, Grid, Link, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const INITIAL_FORM_STATE = {
    email: "",
    password: "",
};

const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().required("Wymagane").email("Email niepoprawny"),
    password: Yup.string()
        .required("Wymagane")
        .min(8, "Hasło za krótkie - co najmniej 8 znaków")
        .max(20, "Hasło za długie - maksymalnie 20 znaków")
        .matches(/(?=.*[a-z])/, "Musi zawierać mała literę")
        .matches(/(?=.*[A-Z])/, "Musi zawierać dużą literę")
        .matches(/(?=.*[0-9])/, "Musi zawierać cyfrę")
        .matches(/(?=.*[!@#$%^&*])/, "Musi zawierać znak specjalny (! @ # $ % ^ & *)"),
});

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // const formSubmitHandler = (event: React.SyntheticEvent) => {
    //     event.preventDefault();

    //     dispatch(loginUserThunk(email, password, navigate));
    // };

    const formik = useFormik({
        initialValues: INITIAL_FORM_STATE,
        validationSchema: FORM_VALIDATION,
        onSubmit: ({ email, password }) => {
            dispatch(loginUserThunk(email, password, navigate));
        },
    });

    useEffect(() => {
        formik.validateForm();
    }, []);

    return (
        <div className="container-fluid d-flex flex-column rounded-3 shadow my-xl-5 my-0 p-5">
            {/* <form onSubmit={formSubmitHandler}>
                <h1 className="display-4 text-center">Logowanie</h1>
                <div className="mt-4">
                    <label className="form-label mb-1">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-3">
                    <label className="form-label mb-1">Hasło</label>
                    <input
                        type="password"
                        className="form-control mb-1"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <NavLink to="/register" className="link-secondary">
                        Play2Gether
                    </NavLink>
                </div>

                <button type="submit" className="btn myBtn col-12 mt-4">
                    Zaloguj się
                </button>
            </form> */}
            <h1 className="display-4 text-center">Logowanie</h1>
            <Box component={"form"} noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    name="email"
                    id="email"
                    autoComplete="email"
                    label="Adres email"
                    fullWidth
                    margin="normal"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    label="Hasło"
                    fullWidth
                    margin="normal"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Pamiętaj mnie"
                    /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                    disabled={!(formik.isValid && formik.dirty)}
                >
                    Zaloguj
                </Button>
                <Grid container justifyContent="flex-start">
                    <Grid item>
                        <Link component={NavLink} to="/register" variant="body2">
                            Nie masz konta?
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Login;
