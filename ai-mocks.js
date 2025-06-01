const aiMocks = {
  elijah: (question, level) => {
    if (level === 'primary') {
      return "That's a great question! Let me think...";
    } else {
      return "Here's a detailed answer for you...";
    }
  },
  wanga: (goal, level) => {
    return ["Step 1: Study hard", "Step 2: Join clubs"];
  },
  emma: (talent, level) => {
    return ["Task 1: Practice daily", "Task 2: Share with friends"];
  }
};
