import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";


interface Question {
  id: number;
  question: string;
  answerType: number; // 0: Single, 1: Multiple, 2: Text
  correctAnswer: string;
  options: string[];
}

interface QuizData {
  title: string;
  questions: Question[];
}

interface QuizDialogProps {
  open: boolean;
  onClose: () => void;
  onSaveQuiz: (quiz: QuizData) => void; // 
}

const QuizDialog: React.FC<QuizDialogProps> = ({ open, onClose, onSaveQuiz }) => {
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, question: "", answerType: 0, correctAnswer: "", options: ["", "", "", ""] },
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, question: "", answerType: 0, correctAnswer: "", options: ["", "", "", ""] }]);
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: string | number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };
  const handleSave = () => {
    console.log("Handle save in quiz dialoge")
    if (!quizTitle.trim() || questions.some(q => !q.question.trim())) {
      alert("Please fill all fields before saving.");
      return;
    }
  
    const quizData: QuizData = {
      title: quizTitle,
      questions: questions.map(q => ({
        id: 0, 
        question: q.question,
        answerType: q.answerType,
        correctAnswer: q.correctAnswer,
        options: q.options,
      })),
    };
  
    onSaveQuiz(quizData); 
    onClose();
  };
  

  console.log("quiz",questions)
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create Quiz</DialogTitle>
      <DialogContent>
        <TextField 
          label="Quiz Title" 
          fullWidth 
          variant="outlined" 
          margin="normal" 
          value={quizTitle} 
          onChange={(e) => setQuizTitle(e.target.value)} 
        />
        {questions.map((q, index) => (
          <Box key={q.id} mt={2}>
            <Typography variant="h6">Question {index + 1}</Typography>
            <TextField 
              label="Question" 
              fullWidth 
              variant="outlined" 
              value={q.question} 
              onChange={(e) => handleQuestionChange(index, "question", e.target.value)} 
            />
            <Select 
              fullWidth 
              variant="outlined" 
              value={q.answerType} 
              onChange={(e) => handleQuestionChange(index, "answerType", Number(e.target.value))}
              sx={{ mt: 1 }}
            >
              <MenuItem value={0}>Single Option</MenuItem>
              <MenuItem value={1}>Multiple Option</MenuItem>
              <MenuItem value={2}>Text</MenuItem>
            </Select>

            {q.answerType !== 2 && (
              <Box mt={1}>
                {q.options.map((option, oIndex) => (
                  <TextField
                    key={oIndex}
                    label={`Option ${String.fromCharCode(65 + oIndex)}`}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={option}
                    onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                  />
                ))}
                <TextField
                  label="Correct Answer"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
                />
              </Box>
            )}
          </Box>
        ))}

        <Button onClick={handleAddQuestion} sx={{ mt: 2 }} variant="contained">
          Add Another Question
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save Quiz</Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizDialog;
