import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';

export const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#5e5b5d',
    fontWeight: 400,
  },
  '& .MuiInputBase-input': {
    borderColor: '#c8d0d4',
  },
  '& .MuiInput-underline:after': {
    border: 'none',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#d32f2f',
      },
    },
    '& fieldset': {
      borderColor: '#c8d0d4',
    },
    '&:hover fieldset': {
      border: '1px solid #c8d0d4',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #c8d0d4',
    },
  },
});

export const DropZoneStyle = styled(Box)(({ theme }) => ({
  border: `1px dashed gray`,
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  width: '100%',
  outline: 'none',
  margin: '0 auto',
  padding: '10px',
}));

export const DragDropText = styled.p`
  font-weight: bold;
  letter-spacing: 2.2px;
  margin-top: 0;
  text-align: center;
`;

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 2px solid rgb(28, 52, 140);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 6px;
  color: rgb(28, 52, 140);
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  font-family: 'Open Sans', sans-serif;
  width: 45%;
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;
  width: 100%;
  margin-top: 20px;

  &:after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: rgb(28, 52, 140);
    z-index: -1;
    transition: width 250ms ease-in-out;
  }
  i {
    font-size: 22px;
    margin-right: 5px;
    border-right: 2px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (max-width: 500px) {
    width: 70%;
  }
  @media only screen and (max-width: 350px) {
    width: 100%;
  }
  &:hover {
    color: #fff;
    outline: 0;
    background: transparent;
    &:after {
      width: 110%;
    }
  }
  &:focus {
    outline: 0;
    background: transparent;
  }
  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const PreviewList = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const RemoveFileIcon = styled.i`
  cursor: pointer;
  &:hover {
    transform: scale(1.3);
  }
`;

export const ImagePreview = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;
