import React, { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

const Transition = forwardRef<unknown, SlideProps>(function Transition(
    props,
    ref,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SimpleDialog: React.FC<SimpleDialogProps> = ({ open, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="simple-dialog-description"
        >
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="simple-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SimpleDialog;
