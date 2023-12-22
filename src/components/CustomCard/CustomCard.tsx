import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import {CardProps} from "../../types/types";

const CustomCard: React.FC<CardProps> = ({ image, title, description }) => {
    return (
        <Card sx={{ width: 350, height: 150, margin: 1 }}>
            <CardActionArea>
                {image && <CardMedia component="img" height="140" image={image} alt={title} />}
                <CardContent>
                    {title && (
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                    )}
                    {description && (
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CustomCard;
