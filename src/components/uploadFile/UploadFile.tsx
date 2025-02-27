import * as React from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";

interface UploadFileProps {
  onClose?: () => void; 
}

const UploadFile: React.FC<UploadFileProps> = ({onClose}) => {
  const [lessonName, setLessonName] = React.useState("");
  const [learningActivity, setLearningActivity] = React.useState("Pdf");
  const [files, setFiles] = React.useState<File[]>([]);

  const handleLessonNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLessonName(event.target.value);
  };

  const handleLearningActivityChange = (event: SelectChangeEvent<string>) => {
    setLearningActivity(event.target.value as string);
  };
  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.filter(
        (file) => !prevFiles.some((f) => f.name === file.name)
      ),
    ]);
  };

  const handleRemoveFile = (name: string) => {
    setFiles((prevMedia) => prevMedia.filter((file) => file.name !== name));
  };

  const handleCancel = () => {
    setFiles([]);
  };
  const handleFileUpload = () => {
    // Handle file upload logic here
    if (onClose) {
      onClose(); // Close dialog if function is provided
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles([event.target.files[0]]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <Box className="upload-modal">
      {" "}
      {/* Added padding for margins */}
      <Typography variant="body2" color="textSecondary" gutterBottom sx={{mb: "24px"}}>
        Lorem ipsum dolor sit amet consectetur. Sit enim platea faucibus elit
        laoreet sed id. Commodo ornare in a et.
      </Typography>
      <Box className="upload-box">
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <FormControl fullWidth sx={{ mr: 2 }}>
          <InputLabel htmlFor="lesson-name">Enter Lesson Name</InputLabel>
          <TextField
            id="lesson-name"
            value={lessonName}
            onChange={handleLessonNameChange}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="learning-activity-label">
            Add Learning Activity
          </InputLabel>
          <Select
            labelId="learning-activity-label"
            id="learning-activity"
            value={learningActivity}
            label="Add Learning Activity"
            onChange={handleLearningActivityChange}
          >
            <MenuItem value="Pdf">Pdf</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
      </Box>
      <Box
        className="upload-file"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box
        className="upload-file-content"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        
            {/* <Button variant="contained" component="label">
              Upload Pdf File
              <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
            </Button> */}
          
          <Typography variant="caption" color="textSecondary">
            Upload a File
          </Typography>
          <Typography variant="caption" color="textSecondary" className="error">
            Max file size is 5 mb
          </Typography>
        </Box>
      </Box>
      </Box>
      {files.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2">Selected files:</Typography>
          {files.map((file) => (
            <div>
              <Typography key={file.name} variant="body2" color="textSecondary">
                {file.name}
              </Typography>
              <IconButton
                color="error"
                onClick={() => file.name && handleRemoveFile(file.name)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: "16px" }}>
        <Button variant="contained" onClick={handleFileUpload}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default UploadFile;
