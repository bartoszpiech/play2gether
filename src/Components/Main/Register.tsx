import { Box, Button, Grid, Link, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "hooks";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { registerUserThunk } from "Store/user-actions";
import * as Yup from "yup";

const INITIAL_FORM_STATE = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
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
    confirmPassword: Yup.string()
        .required("Wymagane")
        .oneOf([Yup.ref("password"), null], "Hasła muszą być takie same"),
    firstName: Yup.string()
        .required("Wymagane")
        .min(3, "Imię za krótkie - Co najmniej 3 znaki")
        .max(15, "Imię za długie - Maksymalnie 15 znaków"),
    lastName: Yup.string()
        .required("Wymagane")
        .min(3, "Nazwisko za krótkie - Co najmniej 3 znaki")
        .max(25, "Nazwisko za długie - Maksymalnie 25 znaków"),
});

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: INITIAL_FORM_STATE,
        validationSchema: FORM_VALIDATION,
        onSubmit: ({ firstName, lastName, email, password }) => {
            dispatch(registerUserThunk(firstName, lastName, email, password, navigate));
        },
    });

    return (
        <div className="container-fluid d-flex flex-column rounded-3 shadow my-xl-5 my-0 p-5">
            <h1 className="display-4 text-center mt-1">Stwórz konto</h1>
            <Box component={"form"} noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            id="email"
                            autoComplete="email"
                            label="Adres email"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="new-password"
                            label="Hasło"
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            autoComplete="new-password"
                            label="Potwierdzenie hasła"
                            fullWidth
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                            }
                            helperText={
                                formik.touched.confirmPassword && formik.errors.confirmPassword
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="firstName"
                            id="firstName"
                            autoComplete="given-name"
                            label="Imię"
                            fullWidth
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="lastName"
                            id="lastName"
                            autoComplete="family-name"
                            label="Nazwisko"
                            fullWidth
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!(formik.isValid && formik.dirty)}
                >
                    Rejestruj
                </Button>
                <Grid container justifyContent="flex-start">
                    <Grid item>
                        <Link component={NavLink} to="/login" variant="body2">
                            Masz już konto?
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Register;
