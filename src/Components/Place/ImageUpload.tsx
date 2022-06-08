import React from "react";
import { SetStateAction } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Stack, Button, Grid, TextareaAutosize, TextField } from "@mui/material";

export function ImageUploader(props: any) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
        props.setNewImages(imageList);
    };

    return (
        <div className="App">
            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <div>
                        <Button variant="contained" sx={{ mt: 1, mb: 2 }} onClick={onImageUpload}>
                            Dodaj zdjęcie/a
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 1, mb: 2 }}
                            onClick={onImageRemoveAll}
                        >
                            Usuń wszystkie
                        </Button>

                        <Stack direction="row" spacing={2} sx={{ overflow: "auto" }}>
                            {imageList.map((image, index) => (
                                <div key={index}>
                                    <img src={image.dataURL} alt="" width="200" height="200" />
                                    <div className="image-item__btn-wrapper">
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            onClick={() => onImageUpdate(index)}
                                        >
                                            Aktualizuj
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => onImageRemove(index)}
                                        >
                                            Usuń
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </Stack>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}
