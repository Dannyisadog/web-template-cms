import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <>
      <CircularProgress
        size={80}
        style={{'color': '#3187f6'}}
      />
    </>
  );
}

export default Loader;