import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "hooks";
import { newPlaceThunk } from "Store/place-actions";

import NewPlaceMap from "Components/Maps/NewPlaceMap";

import CSS from "csstype";
import { uiActions } from "Store/ui-slice";
import MultipleSelect from "./MultipleSelect";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ImageUploader } from "./ImageUpload";

const newLocationMap: CSS.Properties = {
    minHeight: "200px",
};

const INITIAL_FORM_STATE = {
    name: "",
    description: "",
};

const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
        .required("Wymagane")
        .min(5, "Nazwa za krótka - co najmniej 5 znaków")
        .max(50, "Nazwa za długa - maksymalnie 50 znaków"),
    description: Yup.string()
        .required("Wymagane")
        .min(20, "Opis za krótki - co najmniej 20 znaków")
        .max(200, "Opis za długi - maksymalnie 200 znaków"),
});

function NewPlace() {
    const [marker, setMarker] = useState(null);
    const [sports, setSports] = useState<string[]>([]);
    const [images, setImages] = React.useState([]);

    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.user.token);

    const formik = useFormik({
        initialValues: INITIAL_FORM_STATE,
        validationSchema: FORM_VALIDATION,
        onSubmit: ({ name, description }) => {
            if (!marker) {
                dispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Ustaw lokalizacje klikając w mapę",
                    })
                );
            } else if (sports.length == 0) {
                dispatch(
                    uiActions.showNotification({
                        open: true,
                        type: "error",
                        message: "Ustaw co najmniej jeden sport ",
                    })
                );
            } else {
                dispatch(newPlaceThunk(name, description, sports, marker, images, navigate, token));
            }
        },
    });

    return (
        <Box
            className="bg-white container-fluid d-flex flex-column rounded-3 shadow my-xl-5 my-0 px-5 py-2"
            component={"form"}
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
        >
            <h1 className="display-3 text-center">Nowy Obiekt</h1>

            <TextField
                name="name"
                id="name"
                label="Nazwa"
                fullWidth
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
                name="description"
                id="description"
                label="Opis"
                multiline
                rows={2}
                maxRows={4}
                fullWidth
                margin="normal"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />

            <div className="mt-3">
                <MultipleSelect
                    multiple={true}
                    sportsType={null}
                    sports={sports}
                    setSports={setSports}
                />
            </div>

            <div className="my-2 flex-grow-1" style={newLocationMap}>
                <NewPlaceMap marker={marker} setMarker={setMarker} />
            </div>

            <div className="my-2">
                <ImageUploader setNewImages={setImages}></ImageUploader>
            </div>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                disabled={!(formik.isValid && formik.dirty)}
            >
                Dodaj
            </Button>
        </Box>
    );
}

export default NewPlace;
