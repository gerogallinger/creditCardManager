import CircularProgress from '@mui/material/CircularProgress';

function SimpleSpinner(name) {
    return (
        <div className='flex items-center justify-center min-h-screen pr-6'>
            <CircularProgress color="inherit" />

        </div>
    );
}

export default SimpleSpinner;