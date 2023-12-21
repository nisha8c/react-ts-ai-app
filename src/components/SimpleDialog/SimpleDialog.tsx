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
    text: string,
    titleText: string
}

const Transition = forwardRef<unknown, SlideProps>(function Transition(
    props,
    ref,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SimpleDialog: React.FC<SimpleDialogProps> = ({ open, onClose, text, titleText }) => {
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
            <DialogTitle>{titleText}</DialogTitle>
            <DialogContent>
                <DialogContentText id="simple-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained">OK</Button>
                <Button onClick={handleClose} variant="outlined">Start Again</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SimpleDialog;
