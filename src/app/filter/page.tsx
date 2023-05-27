"use client";

import React, { useState } from "react";
import {
  Card,
  CardMedia,
  Stack,
  Checkbox,
  Button,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import queryString from "query-string";

import { useRouter } from "next/navigation";

const ImageGrid = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [organicChecked, setOrganicChecked] = useState(false);
  const [packagingChecked, setPackagingChecked] = useState(false);
  const [radious, setRadious] = React.useState<number>(5);

  const router = useRouter();

  const Item = styled("div")({
    display: "flex",
    alignItems: "left",
    justifyContent: "left",
  });

  const marks = [
    {
      value: 1,
      label: "1 KM",
    },
    {
      value: 50,
      label: "50 KM",
    },
  ];

  const images = [
    {
      url: "eggs.svg",
      label: "Eggs",
      id: "egg",
    },
    {
      url: "dairy.svg",
      label: "Milk",
      id: "milk",
    },
    {
      url: "meat.svg",
      label: "Meat",
      id: "meat",
    },
    {
      url: "dairy_products.svg",
      label: "Dairy Products",
      id: "dairy_products",
    },
    {
      url: "vegetables.svg",
      label: "Vegetables",
      id: "vegetables",
    },
    {
      url: "fruit.svg",
      label: "Fruits",
      id: "fruits",
    },
    // Add more image URLs and labels here
  ];

  const GridContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: "16px",
    paddingLeft: "15px",
    paddingRight: "15px",
  });


  interface CardContainerProps {
    isSelected?: boolean;
  }

  const CardContainer = styled(Card)<CardContainerProps>(({ isSelected }) => ({
    width: "calc(33.33% - 15px)", // 3 images per row, with 15px spacing between cards
    marginBottom: "16px",
    border: isSelected ? "2px solid green" : "2px solid white", // Add custom border styles for selected images
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    "&:hover": {
      borderColor: "green",
    },
  }));

  const Media = styled(CardMedia)({
    height: 0,
    paddingTop: "100%", // 1:1 aspect ratio (square image)
  });

  const handleImageClick = (image) => {
    const isSelected = selectedImages.some(
      (selectedImage) => selectedImage.url === image.url
    );

    if (isSelected) {
      setSelectedImages(
        selectedImages.filter(
          (selectedImage) => selectedImage.url !== image.url
        )
      );
    } else {
      setSelectedImages([...selectedImages, image]);
    }
    console.log(selectedImages);
  };

  const handleOrganicChange = (event) => {
    setOrganicChecked(event.target.checked);
  };

  const handlePackagingChange = (event) => {
    setPackagingChecked(event.target.checked);
  };

  const handleRadiousChange = (event: Event, newRadious: number | number[]) => {
    setRadious(newRadious as number);
    console.log(radious);
  };

  const handleSubmit = () => {
    // Handle the form submission here
    console.log("Form submitted!");
    console.log("Selected Images:", selectedImages);
    console.log("Organic Checked:", organicChecked);
    console.log("Packaging Checked:", packagingChecked);
    console.log("Readious:", radious);

    const qs = queryString.stringify(
      {
        radious: radious,
        selectedCategory: selectedImages.map((image) => image.id),
        organicChecked,
        packagingChecked,
      },
      { arrayFormat: "comma" }
    );
    console.log("QS", qs);

    router.push(`/?${qs}`);
  };

  return (
    <GridContainer>
      <Stack spacing={1}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3>Filters</h3>
        </div>
        <Item>
          <h4>Food Categories</h4>
        </Item>
        <Item>
          Show only shops which offer all of the selected food categories
        </Item>
        <GridContainer>
          {images.map((image, index) => (
            <CardContainer
              key={index}
              isSelected={selectedImages.some(
                (selectedImage) => selectedImage.url === image.url
              )}
              onClick={() => handleImageClick(image)}
            >
              <Stack>
                <Media image={image.url} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <a>{image.label}</a>
                </div>
              </Stack>
            </CardContainer>
          ))}
        </GridContainer>
        <Item>
          <h4>Include only shops which</h4>
        </Item>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={organicChecked}
                onChange={handleOrganicChange}
              />
            }
            label="Offer organic products"
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={packagingChecked}
                onChange={handlePackagingChange}
              />
            }
            label="Offer eco-friendly packaging"
          />
        </div>
        <Item>
          <h4>Show results in </h4>
        </Item>
        <GridContainer>
          <Slider
            defaultValue={5}
            value={radious}
            aria-label="Custom marks"
            min={1}
            max={50}
            marks={marks}
            step={1}
            valueLabelDisplay="on"
            onChange={handleRadiousChange}
          />
        </GridContainer>

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </GridContainer>
  );
};

export default ImageGrid;
