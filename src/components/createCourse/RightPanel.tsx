import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent } from "@mui/lab";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EditIcon from "@mui/icons-material/Edit";

interface LessonMedia {
  id: number;
  type: string;
  url: string;
  lessonId: number;
  lesson: string;
}

interface LessonData {
  id: number;
  title: string;
  body: string;
  lessonMedia: LessonMedia[];
}

interface RightPanelProps {
  lessons: LessonData[];
}

// Function to truncate lesson body
const truncateText = (htmlString: string, maxLength: number = 100) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString; 
  const textContent = tempDiv.textContent || tempDiv.innerText || ""; 

  return textContent.length > maxLength
    ? textContent.substring(0, maxLength) + "..."
    : textContent;
};

const RightPanel: React.FC<RightPanelProps> = ({ lessons = [] }) => {
  if (!lessons || lessons.length === 0) {
    return (
      <Box sx={{ maxWidth: 600, margin: "auto" }}>
        <Typography variant="h6" align="center">No lessons added yet.</Typography>
      </Box>
    );
  }
  
  return (
    <Box>
      <Card elevation={3} sx={{ borderRadius: 3, padding: 3, boxShadow: "none" }}>
        <CardContent sx={{ padding: 0 }}>
          <Timeline sx={{ margin: 0, padding: 0 }}>
            {lessons.map((lesson, index) => (
              <TimelineItem key={lesson.title}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index !== lessons.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography fontWeight={600}>{lesson.title}</Typography>
                      <Typography variant="body2" color="textSecondary" pb={4}>
                        {truncateText(lesson.body, 100)}
                      </Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {lesson.lessonMedia.length > 0 && (
                        <IconButton size="small" component="a" href={lesson.lessonMedia[0].url} target="_blank">
                          <AttachFileIcon fontSize="small" />
                        </IconButton>
                      )}
                      <Typography variant="body2" fontWeight={600} color="primary">
                        {lesson.lessonMedia.length}
                      </Typography>
                      <IconButton size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RightPanel;
