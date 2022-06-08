import { Button, TextField } from "@mui/material";
import NewPlaceMap from "Components/Maps/NewPlaceMap";
import CSS from "csstype";
import { useAppDispatch, useAppSelector } from "hooks";
import "moment/locale/pl"; // without this line it didn't work
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    adminAcceptedPlaceThunk,
    adminDeniedPlaceThunk,
    getCurrentPlaceThunk,
} from "Store/place-actions";
import { placeActions } from "Store/place-slice";
import MultipleSelect from "./MultipleSelect";
import Slideshow from "./Slideshow";

const newLocationMap: CSS.Properties = {
    minHeight: "200px",
};

function Review() {
    const account = useAppSelector((state) => state.user.account);
    const token = useAppSelector((state) => state.user.token);
    const currentPlace = useAppSelector((state) => state.place.currentPlace);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sports, setSports] = useState<string[]>([]);
    const [marker, setMarker] = useState<any>(null);

    let { placeId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const acceptHandler = () => {
        dispatch(
            adminAcceptedPlaceThunk(placeId, name, description, sports, marker, navigate, token)
        );
    };

    const deniedHandler = () => {
        dispatch(adminDeniedPlaceThunk(placeId, navigate, token));
    };

    useEffect(() => {
        fetchData();
        return function cleanup() {
            dispatch(placeActions.leavePlace());
        };
    }, []);

    useEffect(() => {
        if (currentPlace) {
            setName(currentPlace!.name);
            setDescription(currentPlace!.description);
            setSports(currentPlace!.sports);

            let marker = {
                latitude: currentPlace!.geometry.coordinates[1],
                longitude: currentPlace!.geometry.coordinates[0],
            };
            setMarker(marker);
        }
    }, [currentPlace]);

    const fetchData = () => {
        dispatch(getCurrentPlaceThunk(placeId, token));
    };

    return (
        <div className="container-fluid rounded-3 shadow p-0">
            {currentPlace && (
                <>
                    <Slideshow images={currentPlace?.images} />

                    <h1 className="display-3 my-2 text-center">Nowy Obiekt</h1>

                    <TextField
                        name="name"
                        id="name"
                        label="Nazwa"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="mt-3">
                        <MultipleSelect multiple={true} sports={sports} setSports={setSports} />
                    </div>

                    <div className="my-3" style={{ height: "300px" }}>
                        <NewPlaceMap marker={marker} setMarker={setMarker} />
                    </div>

                    <Button
                        onClick={acceptHandler}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Dodaj
                    </Button>
                    <Button
                        onClick={deniedHandler}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Usuń
                    </Button>
                </>
            )}
        </div>
    );
}

export default Review;
